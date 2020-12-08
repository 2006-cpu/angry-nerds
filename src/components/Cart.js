import React, { useState, useEffect } from 'react';
import { getCart } from '../api';


const Cart = (props) => {

    const [orders, setOrders] = useState([]);

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

    return <div >
    <h1>My Cart</h1>
    <div>
    
    {orders.map((product) => {
        return (
            <div>
                <h3>{product.name}</h3>
                <h4>${product.price}</h4>
            </div>
        )
    })}

    </div>

    {/* <h3>Total: $#</h3>  
    <button>Checkout</button> */}

    </div>
}

export default Cart;