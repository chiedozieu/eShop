import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/style";
import {
  displayCurrencyOnly,
  displayNGNCurrency,
} from "../../../utils/displayCurrency";
import { backend_url } from "../../../server";


const ProductSectionCard = ({ data }) => {

  const productName = data.name;
  const product_name = productName.replace(/\s+/g, "-");

  const originalPrice = data.originalPrice;
  const discountPrice = data.discountPrice;
  const discountAmount = originalPrice - discountPrice;
  const discountPercentage = (discountAmount / originalPrice) * 100;

  return (
    <>
      <div className="w-full h-[150px] rounded-lg shadow-sm bg-white cursor-pointer">
        <div className="flex justify-between px-4 ">
          <Link to={`/product/${product_name}`}>
            <img
              src={`${backend_url}${data.images && data.images[0]}`}
              alt={data.id}
              className="w-[85px] h-[85px] object-contain mt-2"
            />           
          </Link>

          <div className="flex flex-col ml-3 mt-2 product-name">
            <Link to={`/product/${product_name}`} className="font-medium hover:underline">
              {data?.name.length > 27
                ? data?.name.slice(0, 27) + " ..."
                : data?.name}
            </Link>

            <div className="">
                <div className="py-1 flex items-center justify-between">
                  <div className="flex">
                    <p className={`${styles.productDiscountPrice}`}>
                      {displayNGNCurrency(
                        data.originalPrice === 0 ? data.originalPrice : data.discountPrice
                      )}
                    </p>
                    <p className={`${styles.price} ${data.discountPrice}`}>
                      {data.originalPrice !== data.discountPrice
                        ? displayCurrencyOnly(data.originalPrice)
                        : null}
                    </p>
                  </div>
                  <span className="text-base  text-[#68d284] font-normal ml-3">
                    {discountPercentage > 0
                      ? `${discountPercentage.toFixed(0)}% off`
                      : null}
                  </span>
            </div>
            <Link to={`/shop/preview/${data?.shop._id}`} className={`${styles.shop_name} flex justify-end`}>{data.shop.name}</Link>
             
            </div>
          </div>
        </div>

       
      </div>
    </>
  );
};

export default ProductSectionCard;
