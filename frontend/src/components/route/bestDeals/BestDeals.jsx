import React, { useEffect, useState } from "react";
import { productData } from "../../../static/data";
import styles from "../../../styles/style";
import ProductCard from "../productCard/ProductCard";

const BestDeals = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const bestSales =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    const firstFive = bestSales.slice(0, 5);
    setData(firstFive);
  }, []);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1> Best Deals</h1>
        </div>
        <div
          className={`${styles.gridCol}`}
        >
          {data?.map((i, index) => (
            <ProductCard data={i} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
