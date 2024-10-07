import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/style";
import {
  displayNGNCurrency,
} from "../../../utils/displayCurrency";
import { backend_url } from "../../../server";

const ProductSectionCard = ({ data }) => {


  return (
    <>
      <div className="w-full h-[150px] rounded-lg shadow-sm bg-white cursor-pointer">
        <div className="flex justify-between px-4 ">
          <Link to={`/product/${data?._id}`}>
            <img
              src={`${backend_url}${data.images && data.images[0]}`}
              alt={data.id}
              className="w-[85px] h-[85px] object-contain mt-2"
            />
          </Link>

          <div className="flex flex-col ml-3 mt-2 product-name">
            <Link
              to={`/product/${data._id}`}
              className="font-medium hover:underline"
            >
              {data?.name.length > 27
                ? data?.name.slice(0, 27) + " ..."
                : data?.name}
            </Link>

            <div className="">
              <div className="py-1 flex items-center justify-between">
                <div className="flex">
                  <p className={`${styles.productDiscountPrice}`}>
                    {displayNGNCurrency(data.discountPrice)}
                  </p>
                </div>
              </div>
              <Link
                to={`/shop/preview/${data?.shop._id}`}
                className={`${styles.shop_name} flex justify-end`}
              >
                {data.shop.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSectionCard;
