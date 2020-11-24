import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import { getCart } from '../api';
import {Order} from './index'


const Cart = (props) => {
    const {orderId} = useParams();

    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

    const fetchOrders = () => {
        getCart().then(
            orders => {
            setOrders(orders.products);
        })
        .catch(error => {
            console.error(error);
        });
      }
    useEffect(() => {
        fetchOrders()
      },[]);
      console.log('orders', orders)

    //   const productsList = orders.products

    return <div >
    <h1>My Cart</h1>
    <div>
    
    {orders.map((product) => {
        return (
            <div>
                <h3>{product.name}</h3>
                <h3>{product.price}</h3>
            </div>
        )
    })}

    </div>
                
    </div>
}

export default Cart;