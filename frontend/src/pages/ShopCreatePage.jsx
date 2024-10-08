import React, { useEffect } from "react";
import ShopCreate from "../components/shop/ShopCreate";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ShopCreatePage = () => {
  const navigate = useNavigate()
  const { isSeller, seller } = useSelector((state) => state.seller);
  useEffect(() => {
   if(isSeller){
    navigate(`/shop/${seller._id}`)
   }
  }, [isSeller, seller, navigate])

  window.scrollTo(0,0)
  return (
    <div>
      <ShopCreate />
    </div>
  );
};

export default ShopCreatePage;
