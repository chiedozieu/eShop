import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import styles from "../../styles/style";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import Review from "../review/Review";
import {
  setShopReviews,
  setReviewsLoading,
  setReviewsError,
} from "../../redux/reducers/reviewSlice";
import Ratings from "../review/Ratings";
import { formatDate } from "../../utils/dateFormat";

//parent:ShopHomePage ShopInfo || ShopProfileData

const ShopInfo = ({ isOwner }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { seller } = useSelector((state) => state.seller);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  const { products } = useSelector((state) => state.product);
  const { id } = useParams();

  

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    setIsLoading(true);
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching shop info:", error);
        setIsLoading(false);
      });
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(setReviewsLoading());
    if (data && data.reviews) {
      dispatch(setShopReviews(data.reviews));
      dispatch(setReviewsLoading(false));
    } else {
      dispatch(setReviewsError("Failed to fetch shop info"));
    }
  }, [data, dispatch]);
  const handleLogout = async () => {
    axios.get(`${server}/shop/logout`, { withCredentials: true });
    window.location.reload();
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="">
          <div className="w-full py-3">
            <div className="w-full flex items-center justify-center">
              <img
                src={`${backend_url}${data?.avatar?.url}`}
                alt=""
                className="w-[150px] h-[150px] rounded-full object-cover"
              />
            </div>
            <h3 className="text-center py-2 text-[20px] capitalize">
              {data?.name}
            </h3>
            <p className="text-[16px] p-[10px] flex text-[#000000a6] items-center">
              {data?.description}
            </p>
          </div>
          <div className="p-2">
            <h5 className="font-semibold">Address</h5>
            <h4 className="text-[#000000a6]">{data?.address}</h4>
          </div>
          <div className="p-2">
            <h5 className="font-semibold">Phone Number</h5>
            <h4 className="text-[#000000a6]">{data?.phoneNumber}</h4>
          </div>
          <div className="p-2">
            <h5 className="font-semibold">Total Products</h5>
            <h4 className="text-[#000000a6]">{products?.length}</h4>
          </div>
          <div className="p-2">
            <h5 className="font-semibold">Shop Rating</h5>
            {/* <h4 className="text-[#000000a6]">{data?.ratings}</h4> */}
            <Ratings rating={data?.ratings} />
          </div>
          <div className="p-2">
            <h5 className="font-semibold">Total Reviews</h5>
            <h4 className="text-[#000000a6]">{data?.reviews?.length}</h4>
          </div>
          <div className="p-2">
            <h5 className="font-semibold">Joined On</h5>
            <h4 className="text-[#000000a6]">
              {formatDate(data?.createdAt)}
            </h4>
          </div>
          <div className="">
          <Review data={data} id={id} user={user} seller={seller} />
          </div>
          {isOwner && (
            <div className="py-3 px-4 ">
              <Link to="/settings">
                <div
                  className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                >
                  <span className="text-white">Edit Shop </span>
                </div>
              </Link>
              <div
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                onClick={handleLogout}
              >
                <span className="text-white">Logout</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
