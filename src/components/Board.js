import React, { useState, useEffect } from 'react';

import {getAllProducts} from '../api'

import {Prod} from './index'

const MainBoard = (props) => {
    const {setFetchId} = props
    const [initialRender, setInitialRender] = useState([])
    const [selectedId, setSelectedId] = useState('')

    useEffect(() => {
        async function fetchProducts(){
          try{
        const data = await getAllProducts()
        console.log('data array ', data)
        setInitialRender(data)
        setFetchId(selectedId)
          }catch(error){
            console.log(error)
          }
        }
    fetchProducts()
      },[selectedId]);
      console.log('set render ',initialRender)

    return <div style={{display: 'flex', flexWrap: 'wrap'}}>
{initialRender.map((product) => {
    return <Prod key={product.id} product={product} setSelectedId={setSelectedId} />
})}
    </div>
}

export default MainBoard;