import React from "react";
import styles from "../../../styles/style";
// import { productData } from "../../../static/data";
import ProductSectionCard from "../productSectionCard/ProductSectionCard";
import { useSelector } from "react-redux";

const ProductSection = () => {
  const { allProduct } = useSelector((state) => state.product)
  return (
    <div className="">
      <div className={`${styles.section}`}>
        <div className={`${styles.heading} mt-10`}>
          <h1>Product Section</h1>
        </div>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-5 xl:grid-cols-3 xl:gap-[30px]'>
          {allProduct &&
            allProduct.map((i, index) => (
              <ProductSectionCard data={i} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
