import React, { useState, useEffect } from 'react';

import {getAllProducts} from '../api'

import {Prod, SelectedProd} from './index'

const SelectedBoard = () => {
    const [initialRender, setInitialRender] = useState([])
    const [selected, setSelected] = useState([])

    useEffect(() => {
        async function fetchProducts(){
          try{
        const data = await getAllProducts()
        console.log('data array ', data)
        setInitialRender(data)
          }catch(error){
            console.log(error)
          }
        }
    fetchProducts()
      },[]);
      console.log('set render ',initialRender)

    return<div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
    <div>
        empty for moment
        </div> 
    <div style={{display: 'flex', borderLeft: '1px solid grey', 
     backgroundColor: 'lightgrey', float: 'right', flexDirection: 'column'}}>
{initialRender.map((product) => {
    return <Prod key={product.id} product={product} />
})}
    </div>
    </div>
}

export default SelectedBoard;