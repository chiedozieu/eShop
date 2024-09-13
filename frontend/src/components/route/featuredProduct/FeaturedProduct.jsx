import React, { useEffect } from "react";
import styles from "../../../styles/style";
// import { productData } from "../../../static/data";
import ProductCard from "../productCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../redux/actions/product";

const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());  // Fetch products when the component mounts
  }, [dispatch]);

 
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


