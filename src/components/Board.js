import React, { useState, useEffect } from 'react';

import {getAllProducts} from '../api'

import {Prod} from './index'

const MainBoard = () => {
    const [initialRender, setInitialRender] = useState([])
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        async function fetchProducts(){
          try{
        const data = await getAllProducts()
        console.log('data array ', data)
        setInitialRender(data)
        setSelected(null)
          }catch(error){
            console.log(error)
          }
        }
    fetchProducts()
      },[]);
      console.log('set render ',initialRender)

    return <div style={{display: 'flex', flexWrap: 'wrap'}}>
{initialRender.map((product) => {
    return <Prod key={product.id} product={product} setSelected={setSelected} />
})}
    </div>
}

export default MainBoard;