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
    useDisclosure,
    Button,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from "@chakra-ui/react"

/* NEEDS TO BE TESTED after routes created!!! */
const LoginComponent = (props) => {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef()
    const finalRef = React.useRef()
    
    
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
        <Button onClick={onOpen}>Open Modal</Button>

        <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Into Your Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input ref={initialRef} placeholder="Username" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input placeholder="Password" />
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>

        </ModalContent>
      </Modal>
    
    </>

}

export default LoginComponent;