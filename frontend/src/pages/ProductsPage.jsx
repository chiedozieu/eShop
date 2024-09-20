import React, { useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import styles from '../styles/style'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/route/productCard/ProductCard'
import Footer from '../components/layout/Footer.jsx'
import { useSelector } from 'react-redux'
import { scrollTop } from '../utils/scrollTop.js'
import Loader from '../components/layout/Loader.jsx'

const ProductsPage = () => {
  const { allProducts, isLoading } = useSelector((state) => state.product)
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get('category');
  const [data, setData] = useState([]);


  useEffect(() => {

    if (!isLoading) {
      if (categoryData === null) {
        const d = allProducts && allProducts
        setData(d);
      } else {
        const d = allProducts?.filter((i) => i.category === categoryData);
        setData(d);
      }
    }
  }, [categoryData, allProducts, isLoading]);
  scrollTop()

  return (
    <>
       {
          isLoading ? (
            <Loader />
          ) : (
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
                data?.length === 0 ? (
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
    </> 
)}

export default ProductsPage

// import Header from "../components/layout/Header";
// import styles from "../styles/style";
// import ProductCard from "../components/route/productCard/ProductCard";
// import Footer from "../components/layout/Footer.jsx";
// import { useSelector } from "react-redux";

// const ProductsPage = () => {
//   const { allProducts } = useSelector((state) => state.product);
//   //
//   return (
//     <div>
//       <Header activeHeading={3} />
//       <br />
//       <br />
//       <div className={`${styles.section} mt-10 md:mt-0`}>
//         <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap[30px] mb-12">
//           {allProducts &&
//             allProducts.map((i, index) => <ProductCard data={i} key={index} />)}
//         </div>
//         {allProducts && allProducts.length === 0 ? (
//           <div className="w-full pb-[100px] text-[20px] justify-center text-center">
//             <h1 className="">No Product Found</h1>
//           </div>
//         ) : null}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ProductsPage;
