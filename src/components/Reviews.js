import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import './Reviews.css';
import {
    useHistory
} from 'react-router-dom';

import {callApi, makeReview} from '../api'

/* import {storeCurrentUser, storeCurrentToken} from '../auth' */

const ReviewComponent = (props) => {

    const [ title, setFormTitle ] = useState('');
    const [ content, setFormContent ] = useState('');
    const [ userId, setUserId ] = useState('');
    const [ productId, setProductId ] = useState('');
    const [ reviewMessage, setReviewMessage ] = useState('');
    const [ alertShow, setAlertShow ] = useState(false);

    const {product} = props
    /* const {id, name, description, price, imageurl, instock, category} = props.product */

    /* const {token, setToken, user, setUser} = props; */
    const history = useHistory();

    
    const reviewHandler = async (event) => {
        try {
            event.preventDefault();

            const response = await makeReview( title, content, userId, productId)

            const {data} = response;
            
            setFormTitle('');
            setFormContent('');
            setReviewMessage(data.message);
            /* if(data.token) {
                storeCurrentToken(data.token)
                setToken(data.token);
            } */

            setAlertShow(true);

            /* const user = await callApi(
                {token: data.token, url:'/api/users/me'}
            )
            if(user && user.username) {
                setUser(user)
                storeCurrentUser(user)
            } */
        } catch(error) {
            console.log(error);
        }
    }

    const messageHandler = () => {
        return <Alert className="reviewAlerts" variant="danger" show={alertShow}><Alert.Heading>{reviewMessage}</Alert.Heading></Alert>
    }

 /*    useEffect(() => {
        if(token) {
        setUser(user);
        history.push('/home');
        }
    }, [token]); */

    return <> 
       {/* <Image className="reviewImg" src="https://learnenglish.britishcouncil.org/sites/podcasts/files/styles/article/public/RS7351_ThinkstockPhotos-492813404-hig.jpg?itok=cNrOuKt4" fluid /> */}

        
       <Form className="reviewForm" onSubmit={reviewHandler}>
            <h1>Create A Review</h1>
           <h1 className="messageAlert">{messageHandler()}</h1>
            
            <Form.Group controlId="reviewFormCreation">
                <Form.Label>Add A Headline</Form.Label>
                <Form.Control className="formInput" type="text" value={title} onChange={(event) => {setFormTitle(event.target.value)}} placeholder="Title Your Review" required/>
                <Form.Text className="text-muted">
                Please Give Your Review A Heading
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Add A Written Review</Form.Label>
                <Form.Control as="textarea" rows={3} className="formInput" type="text" value={content} onChange={(event) => {setFormContent(event.target.value)}}placeholder="What did you like or dislike?" required />
                {/* <Form.Text className="text-muted">
                Please Enter Your Password
                </Form.Text> */}
            </Form.Group>
            <Button className="submitBtn" variant="primary" type="submit">
                Submit
            </Button>
        </Form>

    </>

}

export default ReviewComponent;