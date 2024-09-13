// import React, { useEffect, useState } from "react";
// import Header from "../components/layout/Header";
// import ProductDetails from "../components/products/ProductDetails";
// import SuggestedProduct from "../components/products/SuggestedProduct";
// import Footer from "../components/layout/Footer";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getAllProducts } from "../redux/actions/product";


// const ProductDetailsPage = () => {

//   const { allProducts } = useSelector((state) => state.product);
//   const dispatch = useDispatch()

//   useEffect(() => {

//    dispatch(getAllProducts())
//   }, [])
  
//   console.log('ProductDetailsPage', allProducts);

//   const {name} = useParams()
  
//   const [data, setData] = useState(null);
//   const productName = name.replace(/-/g," ");
  

// useEffect(() => {
//   const data = allProducts && allProducts.find((i) => i.name === productName);
//   setData(data);

// }, [productName, allProducts]);



//   console.log("ProductDetailsPage-data", data);
  
  

//   return (
//     <div>
//       <Header />
//       <ProductDetails data={data} />
//       {data && <SuggestedProduct data={data} />}
//       <Footer />
//     </div>
//   );
// };

// export default ProductDetailsPage;


import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import ProductDetails from "../components/products/ProductDetails";
import SuggestedProduct from "../components/products/SuggestedProduct";
import Footer from "../components/layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../redux/actions/product";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { name } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  console.log("ProductDetailsPage-allProduct-redux", allProducts);
  useEffect(() => {
    const productName = name.replace(/-/g, " ");
    const productData = allProducts && allProducts.find((i) => i.name === productName);
    console.log("ProductDetailsPage-product-name", productName);
    setData(productData);
  }, [name, allProducts]);
  console.log("ProductDetailsPage-data", data);
  
  return (
    <div>
      <Header />
      {data && <ProductDetails data={data} />}
      {data && <SuggestedProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;