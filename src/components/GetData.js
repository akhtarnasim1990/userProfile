import React, { Component } from 'react';
import axios from 'axios';


class GetData extends Component {

    componentDidMount () {
        console.log(this.props)
        let get_token =  JSON.parse(localStorage.getItem("token"));
        console.log(get_token)
        axios.get('/users/me' , {
            headers: {
                'authorization': get_token,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err)
        })
        
    }

    render () {
        return (
            <h1>...........</h1>
        );
    }
}

export default GetData;