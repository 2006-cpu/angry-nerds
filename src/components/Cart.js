import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import { getCart } from '../api';
import {Order} from './index'


const Cart = (props) => {
    const {orderId} = useParams();

    const [orders, setOrders] = useState('')

    const fetchOrders = () => {
        getCart().then(
            orders => {
            setOrders(orders);
        })
        .catch(error => {
            console.error(error);
        });
      }
    useEffect(() => {
        fetchOrders()
      },[]);
      console.log('orders', orders)

    return <div style={{display: 'flex', flexWrap: 'wrap'}}>
    {/* {orders.map((order) => {
        return <Order />
    })} */}
    <h1>My Cart</h1>
                
    </div>
}

export default Cart;