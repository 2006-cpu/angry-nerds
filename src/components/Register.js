import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert';

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
    const [ loginMessage, setLoginMessage ] = useState('');
    const [ alertShow, setAlertShow ] = useState(false);

    const {token, setToken, user, setUser} = props;

    const history = useHistory();

    
    const registerHandler = async (event) => {
        try {
            event.preventDefault();

            const response = await axios.post(`/api/users/register`, {firstName, lastName, email: emailFirstHalf+'@'+emailSecHalf+'.com', username, password, isAdmin: false, imageURL: null})

            const {data} = response;

            setLoginMessage(data.message);
            setAlertShow(true);
            
            if(data.token) {
              
                setFirstName('');
                setLastName('');
                setUsername('');
                setPassword('');
                localStorage.setItem('token', data.token);
                setToken(data.token);

                if(user && user.username) {
                    setUser(user);
                }

            }
        } catch(error) {
            console.log(error);
        }
    }

    const messageHandler = () => {
        return <Alert variant="danger" show={alertShow}><Alert.Heading>{loginMessage}</Alert.Heading></Alert>
    }

    useEffect(() => {
        if(token) {
        setUser(user);
        history.push('/home');
        }
    }, [token]);

    return <> 

        <h1 className="messageAlert">{messageHandler()}</h1>
       
       <Form onSubmit={registerHandler}>
            <Form.Group style={{margin: '1rem'}}>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" value={firstName} onChange={(event) => {setFirstName(event.target.value)}} placeholder="First Name" required/>
                <Form.Text className="text-muted">
                Please Input your First Name
                </Form.Text>
            </Form.Group>

            <Form.Group style={{margin: '1rem'}}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" value={lastName} onChange={(event) => {setLastName(event.target.value)}} placeholder="Last Name" required/>
                <Form.Text className="text-muted">
                Please Input your Last Name
                </Form.Text>
            </Form.Group>

            <Form.Group style={{margin: '1rem'}}>
                <Form.Label>Email</Form.Label>
                <div style={{display: 'flex'}}>
                <Form.Control type="text" value={emailFirstHalf} onChange={(event) => {setEmailFirstHalf(event.target.value)}} placeholder="example" required/>
                <Form.Text className="text-muted">@</Form.Text>
                <Form.Control type="text" value={emailSecHalf} onChange={(event) => {setEmailSecHalf(event.target.value)}} placeholder="handle" required/>
                <Form.Text className="text-muted">.com</Form.Text>
                </div>
                <Form.Text className="text-muted">
                Please Input your Email
                </Form.Text>
            </Form.Group>

            <Form.Group style={{margin: '1rem'}}>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} onChange={(event) => {setUsername(event.target.value)}} placeholder="Enter Username" required/>
                <Form.Text className="text-muted">
                Please Create Your Username
                </Form.Text>
            </Form.Group>

            <Form.Group style={{margin: '1rem'}}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} minLength="8" maxLength="15" onChange={(event) => {setPassword(event.target.value)}}placeholder="Password" required/>
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