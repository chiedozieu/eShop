import React from "react";
import styles from "../../../styles/style";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className={`${styles.normalFlex} relative min-h-[70vh] md:min-h-[calc(100vh-200px)] w-full bg-no-repeat `}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className={`max-w-4xl mx-auto`}>
        <h1
          className={`text-2xl md:text-6xl text-[#3a5a3a] font-semibold capitalize`}
        >
          Best collection for <br /> home decoration
        </h1>
        <p className="pt-5 text-base font-Poppins font-normal text-[#000000ba]">
          Elevate your space with our curated collection of stylish and
          functional home decor pieces. From modern vases to statement wall art,
          our selection has everything you need to create a warm and inviting
          atmosphere. Transform your home into a reflection of your personal
          style with our unique and affordable decor solutions.
        </p>
        <Link to='/products' className="">
            <div className={`${styles.button} inline-block`}>
                <span className="text-[#fff] font-Poppins text-lg">
                    Shop Now
                </span>
            </div>
        </Link>
      </div> 
    </div>
  );
};

export default Hero;
