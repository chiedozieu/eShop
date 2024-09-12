import React, { useEffect } from "react";
import styles from "../../../styles/style";
// import { productData } from "../../../static/data";
import ProductCard from "../productCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../redux/actions/product";

// START HERE TOMORROW, TRY TO REMOVE DATA AND USE ONLY ALLPRODUCTS
// TRY THE ONE DOWN

const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.product);
  // const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());  // Fetch products when the component mounts
  }, [dispatch]);

  // useEffect(() => {
  //   if (allProducts && allProducts.length > 0) {
  //     setData(allProducts);  // Set data only when allProducts is populated
  //   }
  // }, [allProducts]);  // Trigger this effect when allProducts changes


console.log('productsFeatured-allProducts', allProducts)
// console.log('productsFeaturedProductsData', data)

  return (
    <div className="">
      <div className={`${styles.section}`}>
        <div className={`${styles.heading} mt-10`}>
          <h1>Featured Product</h1>
        </div>
          <div className={`${styles.gridCol2}`}>
            {allProducts && allProducts.length > 0 &&
              allProducts.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;





// const FeaturedProduct = () => {
//   const [data, setData] = useState(null);
  
//   const { allProducts } = useSelector((state) => state.product);
//   // const [data, setData] = useState(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAllProducts());  // Fetch products when the component mounts
//   }, [dispatch]);

//   useEffect(() => {
//     if (allProducts && allProducts.length > 0) {
//       setData(allProducts);  // Set data only when allProducts is populated
//     }
//   }, [allProducts]);  // Trigger this effect when allProducts changes


// console.log('productsFeatured-allProducts', allProducts)
// // console.log('productsFeaturedProductsData', data)

//   return (
//     <div className="">
//       <div className={`${styles.section}`}>
//         <div className={`${styles.heading} mt-10`}>
//           <h1>Featured Product</h1>
//         </div>
//           <div className={`${styles.gridCol2}`}>
//             {data && 
//               data.map((i, index) => <ProductCard data={i} key={index} />)}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturedProduct;
