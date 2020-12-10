import React, { useState, useEffect } from 'react';
import { getCart, deleteOrderProduct } from '../api';


const Cart = (props) => {

    const [orders, setOrders] = useState([]);
    const [orderId, setOrderId] = useState(0)
    const [total, setTotal] = useState(0);

    const fetchOrders = () => {
        getCart().then(
            orders => {
            setOrders(orders.products)
            setOrderId(orders.id)
            console.log('orderId', orderId)
            // .then(
            //     product => {
            //         // let totalP = 0;
            //         // totalP = product.price + total
            //         setTotal(product.price)
            //     }
            // )
        })
        .catch(error => {
            console.error(error);
        });
      }
    useEffect(() => {
        fetchOrders()
      },[]);
    
    // const fetchPrices = () => {
    //     orders.map((product) => {
    //         let totalP = 0;
    //         totalP = product.price + total
    //         setTotal(totalP)
    //     })
    // }

    const deleteOP = async (event) => {
        event.preventDefault();
        // activities.map(activity => {
        //     setActivityId(activity.id)
        // })
        try {
            const deleteOP = await deleteOrderProduct(orderId)
            console.log("deleteOP", deleteOP)
           
        } catch (error) {
            console.error(error)
        }
    }

    return <div >
    <h1>My Cart</h1>
    <div>
    
    {orders.map((product) => {
        return (
            <div>
                <h3>{product.name}</h3>
                <h4>${product.price}</h4>
                <button onClick={deleteOP}>Remove</button>
            </div>
        )
    })}

    </div>

    <h3>Total: ${total}</h3>  
    <button>Checkout</button>

    </div>
}

export default Cart;