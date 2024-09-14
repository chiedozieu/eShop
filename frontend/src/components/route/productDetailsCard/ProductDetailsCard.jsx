import React, { useState, useRef, useEffect } from "react";
import { RxCrossCircled } from "react-icons/rx";
import styles from "../../../styles/style";
import { AiOutlineMessage } from "react-icons/ai";
import { PiHeartStraightFill, PiHeartStraightThin } from "react-icons/pi";
import {
  displayCurrencyOnly,
  displayNGNCurrency,
} from "../../../utils/displayCurrency";
import { backend_url } from "../../../server";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { wishlist } = useSelector((state) => state.wishlist)
  const [click, setClick] = useState(false);
  const modalRef = useRef(null);

  const dispatch = useDispatch()




  //ˆ Close the modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);
//ˆ


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


  const handleMessageSubmit = () => {};

  return (
    <div className="bg-[#fff]">
      {data && (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div
            className="w-[90%] md:w-[60%] h-[90vh] overflow-y-scroll md:h-[75vh] bg-white rounded-md shadow-sm relative p-4"
            ref={modalRef} // Attach ref to the modal container
          >
            <RxCrossCircled
              size={30}
              className="absolute z-50 top-3 right-3 p-1 text-red-600 cursor-pointer"
              onClick={() => setOpen(false)}
              title="close"
            />
            <div className="block w-full md:flex">
              <div className="w-full md:w-1/2">
                <img src={`${backend_url}${data.images && data.images[0]}`}alt="" />
                <Link to={`/shop/${data?.shop?._id}`} className="flex items-center">
                  <img
                    src={`${backend_url}${data.shop && data.shop.avatar.url}`}
                    alt=""
                    className="w-12 h-12 rounded-full mr-2 mt-2 "
                  />
                  <div className="">
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                    <h5 className="pb-3 text-[15px]">
                      ({data.shop.ratings}) Ratings
                    </h5>
                  </div>
                </Link>
                <div
                  className={`${styles.button} mt-4 rounded-[4px] h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1 " />
                  </span>
                </div>
                <h5 className="text-[16px] text-cyan-700 mt-5">
                  ({data.stock}) Available
                </h5>
              </div>
              {/* Right */}
              <div className="w-full md:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="">
                  <div className="flex pt-3">
                    <h4 className={`${styles.productDiscountPrice}`}>
                      {displayNGNCurrency(data.discountPrice)}
                    </h4>
                    <h3 className={`${styles.price}`}>
                      {data.originalPrice ? displayCurrencyOnly(data.originalPrice) : null}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="">
                      <h4 className={`${styles.productDiscountPrice}`}>
                        Location
                      </h4>
                    </div>
                    {/*Remember to add dynamic location here */}
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
                </div>
              </div>
              {/* right end*/}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsCard;
