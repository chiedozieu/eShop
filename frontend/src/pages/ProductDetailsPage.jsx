import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import ProductDetails from "../components/products/ProductDetails";
import SuggestedProduct from "../components/products/SuggestedProduct";
import Footer from "../components/layout/Footer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.product);
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const productData = allProducts && allProducts.find((i) => i._id === id);
    setData(productData);
  }, [id, allProducts]);

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
