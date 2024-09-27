import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/style";
import { PiHeartStraightThin } from "react-icons/pi";
import { PiHeartStraightFill } from "react-icons/pi";
import { IoIosExpand } from "react-icons/io";
import {
  displayNGNCurrency,
} from "../../../utils/displayCurrency";
import ProductDetailsCard from "../productDetailsCard/ProductDetailsCard.jsx";
import { backend_url } from "../../../server.js";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist.js";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data._id]);


  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };
  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  return (
    <>
      <div
        className="w-full h-[370px] rounded-lg p-3 shadow-sm bg-white cursor-pointer relative "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex justify-end"></div>
        <Link to={`${isEvent === true ? `/product/${data._id}/?isEvent=true` : `/product/${data._id}`}`}>
          <img
            src={`${backend_url}${data.images && data.images[0]}`}
            alt={data.id}
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to={`/`}>
          <h2 className={`${styles.shop_name}`}>{data.shop.name}</h2>
        </Link>
        <Link to={`/product/${data._id}`}>
          <h4 className="pb-3 font-medium">
            {data?.name.length > 40
              ? data?.name.slice(0, 40) + " ..."
              : data?.name}
          </h4>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {displayNGNCurrency(data.discountPrice)}
              </h5>

              {/* <h6></h6> */}
            </div>
          </div>
        </Link>

        {/* Side options */}
        {isHovered && (
          <div className="">
            {/* wishlist remove/add */}
            {click ? (
              <div className="cursor-pointer absolute top-5 right-2 bg-blue-50 w-10 h-10 flex justify-center items-center opacity-90">
                <PiHeartStraightFill
                  size={22}
                  className=""
                  onClick={() => removeFromWishlistHandler(data)}
                  color={click ? "red" : "#333"}
                  title="Remove from wishlist"
                />
              </div>
            ) : (
              <div className="cursor-pointer absolute top-5 right-2 bg-blue-50 w-10 h-10 flex justify-center items-center opacity-90">
                <PiHeartStraightThin
                  size={22}
                  className=""
                  onClick={() => addToWishlistHandler(data)}
                  color={click ? "red" : "#333"}
                  title="Add to wishlist"
                />
              </div>
            )}
            <div
              className={`cursor-pointer absolute top-20 right-2 bg-blue-50 w-10 h-10 flex justify-center items-center opacity-90`}
            >
              <IoIosExpand
                size={22}
                className=""
                onClick={() => setOpen(!open)}
                color="#333"
                title="Quick View"
              />
            </div>
            {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCard;
