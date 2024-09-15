import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { displayNGNCurrency } from "../../utils/displayCurrency";
import { BsHeart } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { backend_url } from "../../server";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);

  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };
  

  return (
    <div className="fixed top-0 left-0 bg-[#0000004b] w-full h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[50%] bg-white flex flex-col shadow-lg overflow-scroll">
        <div className="bg-orange-100 h-[167px] flex flex-col shadow-sm">
          <div className="flex justify-end pt-5 pr-5 text-2xl ">
            <IoIosCloseCircleOutline
              onClick={() => setOpenWishlist(false)}
              className="cursor-pointer"
              color="red"
            />
          </div>
          <div className="my-8 flex items-center justify-center">
            <div className="flex gap-2 items-center">
              <BsHeart
                size={25}
                className={`wishlist?.length > 0 ? text-red-600 : '' `}
              />

              <div className="flex gap-1 text-xl font-semibold">
                <h6>
                  {wishlist?.length === 0 ? (
                    <p>You do not have any items in your wishlist</p>
                  ) : (
                    <p>
                      {wishlist.length}{" "}
                      {wishlist.length === 1 ? "item" : "items"}
                    </p>
                  )}
                </h6>
              </div>
            </div>
          </div>
        </div>

        <div className={`h-[calc(100vh-200px)] overflow-scroll ${wishlist.length === 0 ? 'hidden' : null}`}>
          <div className="max-w-[600px] mx-auto border-[1px] w-full mt-12 p-2 bg-slate-50">
            <div className="flex justify-between">
              <h3 className="">Product</h3>
              <h3 className="mr-16">Price</h3>
            </div>
          </div>
          {/* mapped */}
          <div className="">
            {wishlist &&
              wishlist.map((i, index) => (
                <WishlistSingleItem data={i} key={index} removeFromWishlistHandler={removeFromWishlistHandler} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const WishlistSingleItem = ({ data, removeFromWishlistHandler }) => {
  return (
    <div className="max-w-[600px] mx-auto border-[1px] border-t-0 p-2 flex justify-between items-center">
      <Link to={`/product/${data.name}`}>
        <div className="flex items-center gap-4">
          <img src={`${backend_url}${data.images[0]}`} alt="" className="h-20 w-20 object-cover" />
          <h6>
            {data.name.length > 20
              ? data.name.slice(0, 20) + "..."
              : data.name}
          </h6>
        </div>
      </Link>
      <div className="flex gap-2 items-center">
        <h6>{displayNGNCurrency(data.discountPrice)}</h6>
        <IoIosCloseCircleOutline onClick={() => removeFromWishlistHandler(data)}
          className="cursor-pointer"
          color="red"
        
        />
      </div>
    </div>
  );
};

export default Wishlist;
