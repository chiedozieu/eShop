import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import ProductDetails from "../components/products/ProductDetails";
import SuggestedProduct from "../components/products/SuggestedProduct";
import Footer from "../components/layout/Footer";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";

const ProductDetailsPage = () => { 
  const { allProducts } = useSelector((state) => state.product);
  const { allEvents } = useSelector((state) => state.event)
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get('isEvent');

  useEffect(() => {
    if(eventData !== null){
      const data = allEvents && allEvents.find((i) => i._id === id);
      setData(data);
    }else{
      const data = allProducts && allProducts.find((i) => i._id === id);
      setData(data);
    }
  }, [id, allProducts, eventData, allEvents]);

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
