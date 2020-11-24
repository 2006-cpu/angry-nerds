import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react"

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
        
        












    </>

}

export default LoginComponent;