import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';

import {callApi} from '../api'

import {
    Link
  } from 'react-router-dom';

const LoginComponent = (props) => {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const {token, setToken, user, setUser} = props;

    
    const loginHandler = async (event) => {
        try {
            event.preventDefault();

            const response = await axios.post(`/api/users/login`, {username, password})

            const {data} = response;
            console.log("here is the response:", response)
            
            console.log("Here is the data:", data.token);
            setUsername('');
            setPassword('');

            console.log(`Welcome ${username}`)
            console.log(`Welcome ${password}`)
            localStorage.setItem('token', data.token);
            console.log("check out the token:",localStorage.getItem('token'))
            console.log(data.token);

            setToken(data.token);
            const user = await callApi(
                {token: data.token, url:'/api/users/me'}
            )
            if(user && user.username) {
                console.log("We have successfully logged in!!!");
            }


        } catch(error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if(token) {
        setUser(user);
        }
    }, []);

    return <> 
       <Image src="https://cdn.shopify.com/s/files/1/1298/4787/files/Web_Banner-2_1400x.progressive.png.jpg?v=1588688871" fluid />
       <Form onSubmit={loginHandler}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} onChange={(event) => {setUsername(event.target.value)}} placeholder="Enter Username" />
                <Form.Text className="text-muted">
                Please Enter Your Username
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(event) => {setPassword(event.target.value)}}placeholder="Password" />
                <Form.Text className="text-muted">
                Please Enter Your Password
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>

        {/* THIS IS FOR THE FOOTER - needs to be styled*/}

        <div className="footer-container">
            <div className="bottom-container-inner">
                <span className="bottom-link-items">C 2020</span>
                <span className="bottom-link-items">Privacy</span>
                <span className="bottom-link-items">Terms</span>
                <span className="bottom-link-items">Accessibility</span>
                <span className="bottom-link-items">Sitemap</span>
                <span className="bottom-link-items">Do Not Sell My Personal Information</span>
            </div>
        </div>



    </>

}

export default LoginComponent;