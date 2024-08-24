import React from "react";
import styles from "../../../styles/style";
import { productData } from "../../../static/data";
import ProductCard from "../productCard/ProductCard";

const FeaturedProduct = () => {
  return (
    <div className="">
      <div className={`${styles.section}`}>
        <div className={`${styles.heading} mt-10`}>
          <h1>Featured Product</h1>
        </div>
          <div className={`${styles.gridCol2}`}>
            {productData &&
              productData.map((i, index) => (
                <ProductCard data={i} key={index} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
