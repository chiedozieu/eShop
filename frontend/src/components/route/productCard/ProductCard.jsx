import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/style";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { PiHeartStraightThin } from "react-icons/pi";
import { PiHeartStraightFill } from "react-icons/pi";
import { IoIosExpand } from "react-icons/io";
import {
  displayCurrencyOnly,
  displayNGNCurrency,
} from "../../../utils/displayCurrency";
import ProductDetailsCard from '../productDetailsCard/ProductDetailsCard.jsx';
import { backend_url } from "../../../server.js";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllProducts } from "../../../redux/actions/product.js";



const  ProductCard = ({ data }) => {
  // const {allProducts, isLoading, error} = useSelector((state) => state.product)

  // const dispatch = useDispatch();

  // useEffect(() => {
  //     dispatch(getAllProducts());  
  // },[dispatch]);

  
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  console.log('ProductCard-data', data)
 
  const productName = data.name;
  const product_name = productName.replace(/\s+/g, "-");

  const originalPrice = data.originalPrice;
  const discountPrice = data.discountPrice;
  const discountAmount = originalPrice - discountPrice;
  const discountPercentage = (discountAmount / originalPrice) * 100;

  return (
    <>
      <div
        className="w-full h-[370px] rounded-lg p-3 shadow-sm bg-white cursor-pointer relative "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex justify-end"></div> 
        <Link to={`/product/${product_name}`}>
          <img
            src={`${backend_url}${data.images && data.images[0]}`}
            alt={data.id}
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to={`/`}>
          <h2 className={`${styles.shop_name}`}>{data.shop.name}</h2>
        </Link>
        <Link to={`/product/${product_name}`}>
          <h4 className="pb-3 font-medium">
            {data?.name.length > 40
              ? data?.name.slice(0, 40) + " ..."
              : data?.name}
          </h4>
          <div className="flex ratings">
            <AiFillStar
              size={20}
              className="mr-2 cursor-pointer text-[#F6BA00]"
            />
            <AiFillStar
              size={20}
              className="mr-2 cursor-pointer text-[#F6BA00]"
            />
            <AiFillStar
              size={20}
              className="mr-2 cursor-pointer text-[#F6BA00]"
            />
            <AiFillStar
              size={20}
              className="mr-2 cursor-pointer text-[#F6BA00]"
            />
            <AiOutlineStar
              size={20}
              className="mr-2 cursor-pointer text-[#F6BA00]"
            />
          </div>
          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {displayNGNCurrency(
                  data.originalPrice === 0 ? data.originalPrice : data.discountPrice
                )}
              </h5>
              <h4 className={`${styles.price} ${data.discount_price}`}>
                {data.OriginalPrice !== data.discountPrice
                  ? displayCurrencyOnly(data.originalPrice)
                  : null}
              </h4>
              {/* <h6></h6> */}
            </div>
            <span className="text-base  text-[#68d284] font-normal">
              {discountPercentage > 0
                ? `${discountPercentage.toFixed(0)}% off`
                : null}
            </span>
          </div>
        </Link>

        {/* Side options */}
        {
            isHovered && (
        <div className="">      
          {click ? (
            <div className="cursor-pointer absolute top-5 right-2 bg-blue-50 w-10 h-10 flex justify-center items-center opacity-90">
              <PiHeartStraightFill
                size={22}
                className=""
                onClick={() => setClick(!click)}
                color={click ? "red" : "#333"}
                title="Remove from wishlist"
              />
            </div>
          ) : (
            <div className="cursor-pointer absolute top-5 right-2 bg-blue-50 w-10 h-10 flex justify-center items-center opacity-90">
              <PiHeartStraightThin
                size={22}
                className=""
                onClick={() => setClick(!click)}
                color={click ? "red" : "#333"}
                title="Add to wishlist"
              />
            </div>
          )}
          <div className={`cursor-pointer absolute top-20 right-2 bg-blue-50 w-10 h-10 flex justify-center items-center opacity-90`}>
            <IoIosExpand
              size={22}
              className=""
              onClick={() => setOpen(!open)}
              color="#333"
              title="Quick View"
            />
          </div>
          {
            open ? (
                <ProductDetailsCard setOpen={setOpen} data={data}/>
            ) : (null)
          }
        </div>
        )
        }
      </div>
    </>
  );
};

export default ProductCard;




// import React, { useState } from "react";
// import {
//   AiFillHeart,
//   AiFillStar,
//   AiOutlineEye,
//   AiOutlineHeart,
//   AiOutlineShoppingCart,
//   AiOutlineStar,
// } from "react-icons/ai";
// import { Link } from "react-router-dom";
// import styles from "../../../styles/styles";
// import { useDispatch, useSelector } from "react-redux";
// import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
// import {
//   addToWishlist,
//   removeFromWishlist,
// } from "../../../redux/actions/wishlist";
// import { useEffect } from "react";
// import { addTocart } from "../../../redux/actions/cart";
// import { toast } from "react-toastify";
// import Ratings from "../../Products/Ratings";

// const ProductCard = ({ data,isEvent }) => {
//   const { wishlist } = useSelector((state) => state.wishlist);
//   const { cart } = useSelector((state) => state.cart);
//   const [click, setClick] = useState(false);
//   const [open, setOpen] = useState(false);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (wishlist && wishlist.find((i) => i._id === data._id)) {
//       setClick(true);
//     } else {
//       setClick(false);
//     }
//   }, [wishlist]);

//   const removeFromWishlistHandler = (data) => {
//     setClick(!click);
//     dispatch(removeFromWishlist(data));
//   };

//   const addToWishlistHandler = (data) => {
//     setClick(!click);
//     dispatch(addToWishlist(data));
//   };

//   const addToCartHandler = (id) => {
//     const isItemExists = cart && cart.find((i) => i._id === id);
//     if (isItemExists) {
//       toast.error("Item already in cart!");
//     } else {
//       if (data.stock < 1) {
//         toast.error("Product stock limited!");
//       } else {
//         const cartData = { ...data, qty: 1 };
//         dispatch(addTocart(cartData));
//         toast.success("Item added to cart successfully!");
//       }
//     }
//   };

//   return (
//     <>
//       <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
//         <div className="flex justify-end"></div>
//         <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
//           <img
//             src={`${data.images && data.images[0]?.url}`}
//             alt=""
//             className="w-full h-[170px] object-contain"
//           />
//         </Link>
//         <Link to={`/shop/preview/${data?.shop._id}`}>
//           <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
//         </Link>
//         <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
//           <h4 className="pb-3 font-[500]">
//             {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
//           </h4>

//           <div className="flex">
//           <Ratings rating={data?.ratings} />
//           </div>

//           <div className="py-2 flex items-center justify-between">
//             <div className="flex">
//               <h5 className={`${styles.productDiscountPrice}`}>
//                 {data.originalPrice === 0
//                   ? data.originalPrice
//                   : data.discountPrice}
//                 $
//               </h5>
//               <h4 className={`${styles.price}`}>
//                 {data.originalPrice ? data.originalPrice + " $" : null}
//               </h4>
//             </div>
//             <span className="font-[400] text-[17px] text-[#68d284]">
//               {data?.sold_out} sold
//             </span>
//           </div>
//         </Link>

//         {/* side options */}
//         <div>
//           {click ? (
//             <AiFillHeart
//               size={22}
//               className="cursor-pointer absolute right-2 top-5"
//               onClick={() => removeFromWishlistHandler(data)}
//               color={click ? "red" : "#333"}
//               title="Remove from wishlist"
//             />
//           ) : (
//             <AiOutlineHeart
//               size={22}
//               className="cursor-pointer absolute right-2 top-5"
//               onClick={() => addToWishlistHandler(data)}
//               color={click ? "red" : "#333"}
//               title="Add to wishlist"
//             />
//           )}
//           <AiOutlineEye
//             size={22}
//             className="cursor-pointer absolute right-2 top-14"
//             onClick={() => setOpen(!open)}
//             color="#333"
//             title="Quick view"
//           />
//           <AiOutlineShoppingCart
//             size={25}
//             className="cursor-pointer absolute right-2 top-24"
//             onClick={() => addToCartHandler(data._id)}
//             color="#444"
//             title="Add to cart"
//           />
//           {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductCard;
