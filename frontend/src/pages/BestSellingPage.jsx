import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import styles from "../styles/style";
// import { productData } from "../static/data.js";
import ProductCard from "../components/route/productCard/ProductCard";
import Footer from "../components/layout/Footer.jsx";
import { useSelector } from "react-redux";

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.product);
 
  useEffect(() => {
    const firstFive = allProducts && allProducts.slice(0, 20);
    setData(firstFive);
  }, [allProducts]);

  window.scrollTo(0,0)

  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section} mt-10 md:mt-0`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap[30px] mb-12">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BestSellingPage;
