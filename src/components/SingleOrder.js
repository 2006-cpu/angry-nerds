import React, { useState, useEffect } from 'react';

import {useParams} from 'react-router-dom'
import {getAllOrders} from '../api'

import {Prod} from './index'

const Order = (props) => {
    const {orderId} = useParams();
    const [orders, setOrders] = useState([]);
    const {products, setProducts} = props

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
      console.log("ORDER ID PARAM", orderId)

    return <div >
        <h1>Single Order</h1>
        {orders?.map((order) => {
            if(orderId === order.id){
                return (
                    <div>
                        <p>{order.id}</p>
                        <p>{order.status}</p>
                        <p>{order.datePlaced}</p>
                    </div>
                )
            } else {
                return (
                    <div>
                    <p>{order.id}</p>
                    <p>{order.status}</p>
                    <p>{order.datePlaced}</p>
                </div>
                )
            }
            
        })
        }
           
        
    </div>
}

export default Order;