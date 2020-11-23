import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import { getAllOrders } from '../api';
import {Order} from './index'


const Cart = (props) => {
    const {orderId} = useParams();

    const [orders, setOrders] = useState('')

    const fetchOrders = () => {
        getAllOrders().then(
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
    <h1>fill this in after finishing singleOrder</h1>
        </div>
}

export default Cart;