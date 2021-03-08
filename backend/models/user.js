const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true
    },
    age : {
        type : Number ,
        default : 0 ,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens : [{
        token : {
            type : String ,
            required : true
        }
    }] ,
    skills: [{
         
            type: String
        
    }],
    image : {
        type : Buffer
    }
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id : user._id.toString() } , 'thisismynewcourse')
    // localStorage.setItem('tokken' , JSON.stringify(token))
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}


const User = mongoose.model('User' , userSchema);

module.exports = User;  