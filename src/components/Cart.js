import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import { getCart } from '../api';
import {Order} from './index'


const Cart = (props) => {
    const {orderId} = useParams();

    const [orders, setOrders] = useState([]);

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
      console.log('orders', orders.products)

    //   const productsList = orders.products

    return <div style={{display: 'flex', flexWrap: 'wrap'}}>
    <h1>My Cart</h1>
    <div>
    
    {/* {productsList.map((product) => {
        return (
            <div>
                <h3>{product.name}</h3>
            </div>
        )
    })} */}

    </div>
                
    </div>
}

export default Cart;