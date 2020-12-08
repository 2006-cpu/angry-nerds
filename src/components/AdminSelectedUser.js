import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import {getUserById} from '../api'
import {getCurrentUser} from '../auth'
import {UserEdit} from './index'

const SelectedUser = (props) => {
    const {userId} = useParams()
    const [admin, setAdmin] = useState(getCurrentUser())
    const [selected, setSelected] = useState({})
    const [adminToggle, setAdminToggle] = useState(false)

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

    
    return <>
    <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
      {admin && admin.isadmin ? <Button onClick={() => {setAdminToggle(!adminToggle)}} style={{margin:'.4rem'}} variant="primary" size="lg" block>
        
  {adminToggle ? 'Cancel' : 'Edit User Info'}</Button> : null}

  {adminToggle ?  <UserEdit selected={selected} /> : null}

        </div>
  <div style={{border: '1px solid black', padding: '1rem',
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
        {selected.isadmin} Sample "isAdmin"
    </div>
  </div>
    </>
}

export default SelectedUser;
