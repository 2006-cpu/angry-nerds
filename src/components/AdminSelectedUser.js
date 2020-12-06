import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

import {getUserById} from '../api'

const SelectedUser = (props) => {
    const {userId} = useParams()
    const [selected, setSelected] = useState({})

    async function fetchProducts(){
      try{
        console.log('param ', userId)
        const chosenOne = await getUserById(userId)
        console.log('chosen array ', chosenOne)
        setSelected(chosenOne)
      }catch(error){
        console.log(error)
      }
    }
    useEffect(() => {
    fetchProducts()
      },[userId]);

    
    return <div style={{border: '1px solid black', padding: '1rem',
    margin: '1rem', marginLeft: '3rem', marginRight: '3rem',
    backgroundColor: '#F0FFFF', boxShadow: '0 6px 10px -5px'}} >
    <div style={{ textAlign: 'center'}}>
        {selected.username} Sample Username
    </div>
    <div style={{ textAlign: 'center'}}>
        {selected.firstName} Sample First Name
    </div>
    <div style={{ textAlign: 'center'}}>
        {selected.lastName} Sample Last Name
    </div>
    <div style={{ textAlign: 'center'}}>
        {selected.email} Sample Email
    </div>
    <div style={{ textAlign: 'center'}}>
        {selected.imageURL} Sample imageURL
    </div>
    <div style={{ textAlign: 'center'}}>
        {selected.isAdmin} Sample "isAdmin"
    </div>
        <Button style={{margin: '1rem'}} onClick={() => 
            {console.log('editing user')}}>Edit User</Button>
    </div>
}

export default SelectedUser;
