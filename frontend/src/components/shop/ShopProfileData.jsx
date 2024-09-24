import React, { useEffect, useState } from "react";
import ProductCard from "../route/productCard/ProductCard";
// import { productData } from "../../static/data";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/style";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { TfiHome } from "react-icons/tfi";
import { backend_url } from "../../server";
import Ratings from "../review/Ratings";

//isOwner?
//ShopInfo || ShopProfileData
const ShopProfileData = ({ isOwner }) => {
  const { shopReviews } = useSelector((state) => state.review);
  const [active, setActive] = useState(1);
  const { products } = useSelector((state) => state.product);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
  }, [dispatch, id]);

  return (
    <div className="w-full">
      <div className="Home flex justify-end cursor-pointer items-center gap-2">
        <div className="">
          {isOwner && (
            <div className="">
              <Link to="/dashboard">
                <div className={`${styles.button} !rounded-[4px] !h-[42px]`}>
                  <span className="text-[#fff]">Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
        <Link to={"/"}>
          <TfiHome size={20} />
        </Link>
      </div>
      <div className="flex w-full items-center font-Poppins justify-between">
        <div className="mainWrapper w-full flex">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-semibold text-[20px] cursor-pointer ${
                active === 1 ? "text-red-500" : "text-[#333]"
              } pr-[20px]`}
            >
              Shop Products
            </h5>
          </div>
          <div
            className="flex items-center font-Poppins pr-[20px]"
            onClick={() => setActive(2)}
          >
            <h5
              className={`font-semibold text-[20px] cursor-pointer ${
                active === 2 ? "text-red-500" : "text-[#333]"
              }`}
            >
              Running Events
            </h5>
          </div>
          <div
            className="flex items-center font-Poppins"
            onClick={() => setActive(3)}
          >
            <h5
              className={`font-semibold text-[20px] cursor-pointer ${
                active === 3 ? "text-red-500" : "text-[#333]"
              }`}
            >
              Shop Reviews 
            </h5>
          </div>
        </div>
      </div>
      <br />
      {active === 1 && (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-3 xl:gap-[20px] mb-12 border-0">
          {products &&
            products.map((i, index) => (
              <ProductCard data={i} key={index} isShop={true} />
            ))}
        </div>
      )}

      {active === 3 ? (
        <div className="w-full p-5 min-h-[40vh] flex flex-col py-3 overflow-y-scroll">
          <h1 className="w-full text-[20px] font-semibold">Total Reviews: {shopReviews?.length}</h1>
          {
            shopReviews && shopReviews?.length > 0 ? (
            shopReviews.map((review, index) => (
              <div key={index} className="w-full flex my-2">
              <img src={`${backend_url}${review?.user?.avatar?.url}`} alt="" className="w-[50px] h-[50px] rounded-full"/>
              <div className="pl-3">
                <div className="flex items-center w-full ">
                  <h1 className="pr-2">
                    {review?.user?.name}
                  </h1>
                  <Ratings rating={review?.rating}/>
                </div>
                <p>
                  {review?.comment}
                </p>
              </div>
             
              </div>
            ))
          ) : (
            <div className="w-full flex justify-center ">
              <h5>No reviews yet.</h5>
            </div>
          )
          }
        </div>
      ) : null}
    </div>
  );
};

export default ShopProfileData;
