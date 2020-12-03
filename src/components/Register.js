import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import {callApi} from '../api'
import {
    useHistory
} from 'react-router-dom';


const RegisterComponent = (props) => {

    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ emailFirstHalf, setEmailFirstHalf ] = useState('');
    const [ emailSecHalf, setEmailSecHalf ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const {token, setToken, user, setUser} = props;

    const history = useHistory();

    
    const registerHandler = async (event) => {
        try {
            event.preventDefault();
            console.log(emailFirstHalf+'@'+emailSecHalf+'.com')

            const response = await axios.post(`/api/users/register`, {firstName, lastName, email: emailFirstHalf+'@'+emailSecHalf+'.com', username, password, isAdmin: false, imageURL: null})

            const {data} = response;
            
            if(data) {
                console.log("Here is token from register:", data.token);
                setFirstName('');
                setLastName('');
                setUsername('');
                setPassword('');

                console.log(`Welcome ${username}`)
                console.log(`input password ${password}`)
                localStorage.setItem('token', data.token);
                setToken(data.token);

                //const user = await callApi(
                    //{token: data.token, url:'/api/users/me'}
                //)
                if(user && user.username) {
                    console.log("We have successfully created an account!!!");
                    setUser(user);
                    history.push('/');
                }
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
       
       <Form onSubmit={registerHandler}>
            <Form.Group style={{margin: '1rem'}}>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" value={firstName} onChange={(event) => {setFirstName(event.target.value)}} placeholder="First Name" />
                <Form.Text className="text-muted">
                Please Input your First Name
                </Form.Text>
            </Form.Group>

            <Form.Group style={{margin: '1rem'}}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" value={lastName} onChange={(event) => {setLastName(event.target.value)}} placeholder="Last Name" />
                <Form.Text className="text-muted">
                Please Input your Last Name
                </Form.Text>
            </Form.Group>

            <Form.Group style={{margin: '1rem'}}>
                <Form.Label>Email</Form.Label>
                <div style={{display: 'flex'}}>
                <Form.Control type="text" value={emailFirstHalf} onChange={(event) => {setEmailFirstHalf(event.target.value)}} placeholder="example" />
                <Form.Text className="text-muted">@</Form.Text>
                <Form.Control type="text" value={emailSecHalf} onChange={(event) => {setEmailSecHalf(event.target.value)}} placeholder="handle" />
                <Form.Text className="text-muted">.com</Form.Text>
                </div>
                <Form.Text className="text-muted">
                Please Input your Email
                </Form.Text>
            </Form.Group>

            <Form.Group style={{margin: '1rem'}}>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} onChange={(event) => {setUsername(event.target.value)}} placeholder="Enter Username" />
                <Form.Text className="text-muted">
                Please Create Your Username
                </Form.Text>
            </Form.Group>

            <Form.Group style={{margin: '1rem'}}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} minLength="8" maxLength="15" onChange={(event) => {setPassword(event.target.value)}}placeholder="Password" />
                <Form.Text className="text-muted">
                Please Create Your Password
                </Form.Text>
            </Form.Group>
            <Button style={{marginLeft: '1rem'}} variant="primary" type="submit">
                Create
            </Button>
        </Form>
    </>

}

export default RegisterComponent;