import React, { useState } from "react";
import styles from "../../styles/style";
import PopUp from "../popUp/PopUp";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { backend_url, server } from "../../server";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// Important! Important!! Important!!!
// Just putting this in shop/layout/ShopProfileData for testing
const Review = () => {
  const { user } = useSelector((state) => state.user);
  const { seller } = useSelector((state) => state.seller);

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

 
  const reviewHandler = async () => {
    await axios
      .put(
        `${server}/shop/create-new-review`,
        { user, rating, comment, shopId: seller?._id },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setComment("");
        setRating(null);
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="">
      <div
        className={`${styles.button} text-[#fff]`}
        onClick={() => setOpen(true)}
      >
        Give a review
      </div>

      {open && (
        <PopUp setOpen={setOpen}>
          <div className="mx-2">
            <h2 className="text-[30px] text-center font-Poppins font-medium">
              Write a Review
            </h2>
            <br />

            <div className="flex flex-col items-center ">
              <img
                src={`${backend_url}${seller?.avatar?.url}`}
                alt=""
                className="w-12 h-12 object-cover rounded-full"
              />
              <h4 className="text-sm">{seller.name}</h4>
              <h4 className="text-xs">0{seller.phoneNumber}</h4>
            </div>
            <br />
            {/* ratings */}
            <h5 className="pl-2 text-[20] font-medium">
              Give a rating <span className="text-red-500">*</span>
            </h5>
            <div className="flex w-full pt-1">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>
            <br />
            <div className="w-full">
              <label className="block text-[20] font-medium">
                Write a comment
              </label>
              <textarea
                onChange={(e) => setComment(e.target.value)}
                name="comment"
                value={comment}
                rows="5"
                placeholder="What was your experience with the seller?"
                className="mt-2 w-full border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm placeholder:text-[15px] placeholder:p-1 p-1"
              ></textarea>
            </div>
            <div
              className={`${styles.button} !text-white !text-[20px]`}
              onClick={rating >= 1 ? reviewHandler : null}
            >
              Submit
            </div>
          </div> 
        </PopUp>
      )}
    </div>
  );
};

export default Review;
