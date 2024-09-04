import React, { useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import styles from '../styles/style'
import { useSearchParams } from 'react-router-dom'
import { productData } from '../static/data.js'
import ProductCard from '../components/route/productCard/ProductCard'


const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const categoryData = searchParams.get('category')
    const [data, setData] = useState([])

    
    useEffect(() => {
      if(categoryData === null) {
        const d = productData && productData.sort((a, b) => a.total_sell - b.total_sell);
        setData(d);
      }else{
        const d = productData && productData.filter((i) => i.category === categoryData)
        setData(d);
      }
      window.scrollTo(0,0)
    },[categoryData])
    




  return (
    <div>
        <Header activeHeading={3}/>
        <br />
        <br />
        <div className={`${styles.section} mt-10 md:mt-0`}>
         <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap[30px] mb-12">
            {
                data && data.map((i, index) => (<ProductCard data={i} key={index}/>))
            }
         </div>
            {
                data && data.length === 0 ? (
                    <div className="w-full pb-[100px] text-[20px] justify-center text-center">
                        <h1 className=''>No Product Found</h1>
                    </div>
                ) : (
                    null
                )
            }
        </div>
    
    </div>
  )
}

export default ProductsPage