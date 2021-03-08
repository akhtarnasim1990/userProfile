const express = require('express');
const User = require('../models/user');
const multer = require('multer');
const sharp = require('sharp');
const auth = require('../middleware/auth');
const router = new express.Router();
router.post('/users' , async (req ,res) => {
    const user = new User(req.body)

    try {
        await user.save();
        const token = await user.generateAuthToken()
        res.status(201).send({user , token})
        console.log(token)
    } catch(err){
        res.status(400).send(err);
    }
})

router.get('/users/me', auth , async (req , res) => {

    res.send(req.user)
    
 })

 router.patch('/users/me',auth, async (req , res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age' , 'skills']  
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error : 'Invali updates!'})
    }
    
    try {
        const user = await User.findByIdAndUpdate(req.params.id , req.body , {new: true , runValidators: true})

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
        // updates.forEach((update) => req.user[update] = req.body[update])
        // await req.user.save()
        // res.send(req.user)
    } catch (err) {
        res.status(400).send(err)
    }
})

const upload = multer({
    limits : {
        fileSize : 1000000
    } , 
    fileFilter(req , file ,cb){

        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('Please upload Images only'))
        }

        cb(undefined , true)
    }
})

router.post('/users/image' ,auth ,  upload.single('image') , async (req ,res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 1280 , height: 960 }).png().toBuffer()
    req.user.image = buffer
    await req.user.save()
    res.send()
} , (error , req ,res ,next) => {
    res.status(400).send({ error : error.message })
})

router.delete('/users/image' ,auth, async (req ,res) => {
    
        req.user.image = undefined
        await req.user.save()
        res.send()

})

router.get('/users/:id/image' , async (req ,res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.image) {
            throw new Error()
        }

        res.set('Content-Type' , 'image/png')
        res.send(user.image)
    } catch (err) {
        res.status(404).send()
    }

})

module.exports = router;