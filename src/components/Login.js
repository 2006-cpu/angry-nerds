import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import {callApi} from '../api'


/* HITTING ROUTE, BUT REQUEST NOT PROPERLY FULFILLED */
const LoginComponent = (props) => {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const {token, setToken, user, setUser} = props;
    
    const loginHandler = async (event) => {
        try {
            event.preventDefault();
            const response = await axios.post(`/login`, {username, password})

            const {data} = response;

            setUsername('');
            setPassword('');
            localStorage.setItem('token', data.token);

            const user = await callApi(
                {token: data.token, url:'/api/users/me'}
            )
            if(user && user,username) {
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
    </>
}

export default LoginComponent;