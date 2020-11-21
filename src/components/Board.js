import React, { useState, useEffect } from 'react';

import {getAllProducts} from '../api'

import {Prod} from './index'

const MainBoard = () => {
    const [initialRender, setInitialRender] = useState([])

    useEffect(() => {
        async function getDat(){
          try{
        const data = await getAllProducts()
        console.log('data array ', data)
        setInitialRender(data)
          }catch(error){
            console.log(error)
          }
        }
    getDat()
      },[]);
      console.log('set render ',initialRender)

    return <div style={{display: 'flex', flexWrap: 'wrap'}}>
{initialRender.map((product, idx) => {
    return <Prod key={idx} id={product.id} name={product.name} 
    description={product.description} price={product.price} imageURL={product.imageurl}
    inStock={product.instock} category={product.category} />
})}

    </div>
}

export default MainBoard;