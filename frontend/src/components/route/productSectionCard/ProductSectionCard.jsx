import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/style";

import {
  displayCurrencyOnly,
  displayNGNCurrency,
} from "../../../utils/displayCurrency";

const ProductSectionCard = ({ data }) => {
  const productName = data.name;
  const product_name = productName.replace(/\s+/g, "-");

  const originalPrice = data.price;
  const discountPrice = data.discount_price;
  const discountAmount = originalPrice - discountPrice;
  const discountPercentage = (discountAmount / originalPrice) * 100;

  return (
    <>
      <div className="w-full h-[150px] rounded-lg shadow-sm bg-white cursor-pointer">
        <div className="flex justify-between px-4 ">
          <Link to={`/product/${product_name}`}>
            <img
              src={data.image_Url[0].url}
              alt={data.id}
              className="w-[85px] h-[85px] object-contain mt-2"
            />           
          </Link>

          <Link to={`/product/${product_name}`} className="flex flex-col ml-3 mt-2">
            <h4 className="font-medium">
              {data?.name.length > 27
                ? data?.name.slice(0, 27) + " ..."
                : data?.name}
            </h4>

            <div className="">
                <div className="py-1 flex items-center justify-between">
                  <div className="flex">
                    <p className={`${styles.productDiscountPrice}`}>
                      {displayNGNCurrency(
                        data.price === 0 ? data.price : data.discount_price
                      )}
                    </p>
                    <p className={`${styles.price} ${data.discount_price}`}>
                      {data.price !== data.discount_price
                        ? displayCurrencyOnly(data.price)
                        : null}
                    </p>
                  </div>
                  <span className="text-base  text-[#68d284] font-normal ml-3">
                    {discountPercentage > 0
                      ? `${discountPercentage.toFixed(0)}% off`
                      : null}
                  </span>
            </div>
            <span className={`${styles.shop_name} flex justify-end`}>{data.shop.name}</span>
             
            </div>
          </Link>
        </div>

       
      </div>
    </>
  );
};

export default ProductSectionCard;
