// import React, { useEffect, useState } from 'react'
// import Header from '../components/layout/Header'
// import ProductDetails from '../components/products/ProductDetails'
// import { useParams } from 'react-router-dom'
// // import {productData} from '../static/data'
// import SuggestedProduct from '../components/products/SuggestedProduct' 
// import Footer from '../components/layout/Footer'
// import { useDispatch, useSelector } from 'react-redux'
// import { getAllProducts } from '../redux/actions/product'

// const ProductDetailsPage = () => {
//   const {allProducts, isLoading, error} = useSelector((state) => state.product)
//   const [data, setData] = useState(null)

//   const dispatch = useDispatch();

//   useEffect(() => {
//     allProducts &&
//       dispatch(getAllProducts());  
//       setData(allProducts)
//   },[dispatch]);


//  console.log('ProductDetailsPage-allProducts', allProducts)
//  console.log('ProductDetailsPage-data', data)
 
//     // const {name} = useParams()
    

//     // const productName = name.replace(/-/g, " ")

//     // useEffect(() => {
//     //   const data = allProducts && allProducts.find((i) => i.name === productName)
//     //   setData(data)
//     // }, [productName])
    


//   return (
//     <div>
//         <Header />
//         <ProductDetails data={data}/>
//         {
//           data && <SuggestedProduct data={data}/>
//         }
//         <Footer />
//     </div>
//   )
// }

// export default ProductDetailsPage


import React, { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import ProductDetails from '../components/products/ProductDetails';
import SuggestedProduct from '../components/products/SuggestedProduct';
import Footer from '../components/layout/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/actions/product';

const ProductDetailsPage = () => {
  const { allProducts, isLoading, error } = useSelector((state) => state.product);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());  // Fetch products when the component mounts
  }, [dispatch]);

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      setData(allProducts);  // Set data only when allProducts is populated
    }
  }, [allProducts]);  // Trigger this effect when allProducts changes

  console.log('ProductDetailsPage-products', allProducts);
  console.log('ProductDetailsPage-data', data);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {data && <SuggestedProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
