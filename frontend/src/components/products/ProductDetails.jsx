import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/style";
import {
  
  displayNGNCurrency
} from "../../utils/displayCurrency";
import { PiHeartStraightFill, PiHeartStraightThin } from "react-icons/pi";
import { AiOutlineMessage } from "react-icons/ai";
import { backend_url } from "../../server";
import { scrollTop } from "../../../src/utils/scrollTop";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { addToWishlist, removeFromWishlist } from "../../redux/actions/wishlist";

const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist)
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
// Getting data from ProductDetailsPage
scrollTop();

//* for getting the total product count of a shop
const { products } = useSelector((state) => state.product);
const dispatch = useDispatch();
useEffect(() => {
  dispatch(getAllProductsShop(data && data.shop._id));
}, [dispatch, data]);
//*

useEffect(() => {
  if(wishlist && wishlist.find((i) => i._id === data._id)){
    setClick(true);
  }else {
    setClick(false);
  }
}, [wishlist, data._id])

const removeFromWishlistHandler = (data) => {
  setClick(!click)
  dispatch(removeFromWishlist(data));
}
const addToWishlistHandler = (data) => {
  setClick(!click)
  dispatch(addToWishlist(data));
}

  const handleMessageSubmit = () => {
    navigate("/inbox?conversation=tryhrt53heghs");


  };

  return (
    <div className="bg-white ">
      {data ? (
        <div className={`${styles.section} w-[90%] md:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full md:flex">
              {/* Left */}
              <div className="w-full md:w-50%">
                <img
                  src={`${backend_url}${data.images && data.images[select]}`}
                  alt=""
                  className="w-[80%] h-[500px] object-contain"
                />

                <div className="flex w-full items-center gap-2 mt-5">
                  {
                    data && data.images.map((i, index) => (
                      <div
                      key={index}
                    className={`${
                      select === 0 ? "border" : "null"
                    } cursor-pointer `}
                  >
                    <img
                      src={`${backend_url}${i}`}
                      alt=""
                      className="h-[120px] w-[120px] object-contain p-1 mt-3 mr-[3px] overflow-x-scroll"
                      onClick={() => setSelect(index)}
                    />
                  </div>
                    ))
                  }
                </div>
              </div>

              {/* Right */}
              <div className="w-full md:w-[50%] pt-5 ">
                <h1 className={`${styles.productTitle}`}>{data?.name}</h1>
                <p className="">
                  {data?.description && data?.description.slice(0, 50) + "..."}
                </p>
                <div className="flex pt-3 justify-between">
                  <div className="flex">
                    <h4 className={`${styles.productDiscountPrice}`}>
                      {displayNGNCurrency(data?.discountPrice)}
                    </h4>
                   
                  </div>
                  <div className="mr-4">
                    {click ? (
                      <div className="cursor-pointer bg-black w-10 h-10 flex justify-center items-center opacity-90 rounded-full">
                        <PiHeartStraightFill
                          size={30}
                          onClick={() => removeFromWishlistHandler(data)}
                          color={click ? "red" : "white"}
                          title="Remove from wishlist"
                        />
                      </div>
                    ) : (
                      <div className="cursor-pointer bg-black w-10 h-10 flex justify-center items-center opacity-90 rounded-full">
                        <PiHeartStraightThin
                          size={30}
                          onClick={() => addToWishlistHandler(data)}
                          color={click ? "red" : "white"}
                          title="Add to wishlist"
                        />
                      </div>
                    )}
                  </div>
                </div>
                {/* shop name/message */}
                <div className="flex items-center pt-8 justify-between">             
                  <Link  className to={`/shop/${data?.shop?._id}`}>
                    <h3 className={`${styles.shop_name}`}>
                      {data?.shop?.name}
                    </h3>
                    <h5 className="pb-3 text-[15px]">Ratings {data?.shop?.ratings} </h5>
                  </Link>
                 
                </div>
                <h5 className="text-[16px] text-cyan-700 mt-5">
                  ({data.stock}) Available
                </h5>
                <div
                    className={`${styles.button} !rounded-[4px] !h-11 !bg-green-500 mt-6`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-[#fff] flex items-center">
                      Send Message <AiOutlineMessage className="ml-1 " />
                    </span>
                  </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} products={products}/>
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data, products }) => {
  const {seller} = useSelector((state) => state.seller)
  const [active, setActive] = useState(1);

 console.log('ProductDetailsInfo:seller', seller)
 console.log('ProductDetailsInfo:data?.shop', data?.shop)
  return (
    <div className="bg-[#f5f6fb] rounded md:px-10 py-2">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-semibold cursor-pointer md:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div
              className={`absolute bottom-[-27%] left-0 h-[3px] w-[50%] bg-[crimson]`}
            ></div>
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-semibold cursor-pointer md:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator50}`}></div>
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-semibold cursor-pointer md:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Seller Info
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator50}`}></div>
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <pre className="font-Poppins p-4 py-2 text-[18px] leading-8 pb-10 whitespace-pre-line overflow-scroll">
            {data?.description}
          </pre>
        </>
      ) : null}
      {/* active 2 */}
      {active === 2 ? (
        <div className="-full flex justify-center items-center h-[40vh]">
          <p>
            {
              data?.shop &&
              data?.shop?.reviews?.map((review) => (
               <div className="" key={review?._id}>
                  {review?.comment}
               </div>
              ))
            }
          </p>
        </div>
      ) : null}

      {/* active = 3 */}
      {active === 3 && (
        <div className="w-full block md:flex p-5">
          <div className="w-full md:w-[50%]">
            <Link to={`/shop/${data?.shop?._id}`} className="flex items-center gap-2">
              <img
                src={`${backend_url}${data?.shop?.avatar?.url}`}
                alt=""
                className="w-[60px] h-[60px]"
              />
              <div className="">
                <h3 className={`${styles.shop_name}`}>{data?.shop?.name}</h3>
                <h5 className="pb-3 text-[15px]">Ratings {data?.shop?.ratings} </h5>
              </div>
            </Link>
            <p className="pt-2">{data?.shop?.description || null}</p>
          </div>
          <div className="w-full md:w-[50%] mt-5 md:mt-0 md:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-bold">
                Joined:{" "}
                <span className="font-semibold">
                  {data.shop?.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-bold">
                <p>{data?.shop?.description}</p>
              </h5>
              <h5 className="font-bold mt-3">
                Total Products:{" "}
                <span className="font-semibold">
                  {products && products.length}
                </span>
              </h5>
              <h5 className="font-bold mt-3">
                Ratings: <span className="font-semibold">{data?.shop?.ratings}</span>
              </h5>
              <Link to={`/shop/${data?.shop?._id}`} >
                <div className={`${styles.button} !rounded-[4px] !h-10 mt-3`}>
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
