import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

const Ratings = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <AiFillStar
          key={`filled-${i}`}
          size={20}
          color="#f6ba00"
          className="cursor-pointer mr-2"
        />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <BsStarHalf
          size={17}
          color="#f6ba00"
          className="cursor-pointer mr-2"
          key={`half-${i}`}
        />
      );
    } else {
      stars.push(
        <AiOutlineStar
          key={`outline-${i}`}
          size={20}
          color="#f6ba00"
          className="cursor-pointer mr-2"
        />
      );
    }
  }
  return <div className="flex">{stars}</div>;
};

export default Ratings;
