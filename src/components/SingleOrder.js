import React, { useState, useEffect } from 'react';

import {useParams} from 'react-router-dom'

import {Prod} from './index'

const Order = (props) => {
    // const {orderId} = useParams();
    // const [orders, setOrders] = useState('');
    const {products, setProducts} = props

    return <div style={{display: 'flex', flexWrap: 'wrap'}}>
        <h1>Single Order</h1>
            {products?.map((product) => {
                return <Prod product={product}/>
            })}
    </div>
}

export default Order;