import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


/* NEEDS TO BE TESTED after routes created!!! */
const LoginComponent = (props) => {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    
    const loginHandler = async (event) => {
        try {
            event.preventDefault();
            const response = await axios.post(`/login`, {username, password})

            const {data} = response;

            setUsername('');
            setPassword('');
            localStorage.setItem('token', data.token);
        } catch(error) {
            console.log(error);
        }
    }

    return <> 
       
       <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="email" placeholder="Enter Username" />
                <Form.Text className="text-muted">
                Please Enter Your Username
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
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