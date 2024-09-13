import React, { useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import styles from '../styles/style'
import { useSearchParams } from 'react-router-dom'
// import { productData } from '../static/data.js'
import ProductCard from '../components/route/productCard/ProductCard'
import Footer from '../components/layout/Footer.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/actions/product.js'


const ProductsPage = () => {
  const { allProducts, isLoading } = useSelector((state) => state.product)
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get('category');
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());  // Fetch products when the component mounts
  }, [dispatch])

  useEffect(() => {
    console.log("allProducts:", allProducts);
    if (!isLoading) {
      if (categoryData === null) {
        const d =
        allProducts && allProducts.sort((a,b) => a.originalPrice - b.originalPrice)
        setData(d);
      } else {
       
        const d = allProducts?.filter((i) => i.category === categoryData);
        setData(d);
      }
    }
    window.scrollTo(0, 0);
  }, [categoryData, allProducts, isLoading]);
    
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
        <Footer />
    
    </div>
  )
}

export default ProductsPage

