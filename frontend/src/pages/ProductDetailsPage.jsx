import React, { useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import ProductDetails from '../components/products/ProductDetails'
import { useParams } from 'react-router-dom'
import {productData} from '../static/data'
import SuggestedProduct from '../components/products/SuggestedProduct' 

const ProductDetailsPage = () => {
    const {name} = useParams()
    const [data, setData] = useState(null)

    const productName = name.replace(/-/g, " ")

    useEffect(() => {
      const data = productData.find((i) => i.name === productName)
      setData(data)
    }, [])
    


  return (
    <div>
        <Header />
        <ProductDetails data={data}/>
        {
          data && <SuggestedProduct data={data}/>
        }
    </div>
  )
}

export default ProductDetailsPage