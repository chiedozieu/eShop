import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import styles from "../../styles/style";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader";

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
 
  const { id } = useParams();
 console.log('ShopInfoData', data)
 
  
  useEffect(() => {
    setIsLoading(true);
    axios.get(`${server}/shop/get-shop-info/${id}`).then((res) => {
      setData(res.data.shop)
      setIsLoading(false)
    }).catch((error) => {
      console.log(error);
      setIsLoading(false)
    })
  }, []);



  const handleLogout = async () => {
     axios.get(`${server}/shop/logout`, {withCredentials: true})
     window.location.reload();
  }

  return (
    <>
    {
      isLoading ? (
        <Loader />
      ) : (
      
      <div className="">
        <div className="w-full py-5">
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
        <div className="p-3">
          <h5 className="font-semibold">Address</h5>
          <h4 className="text-[#000000a6]">{data?.address}</h4>
        </div>
        <div className="p-3">
          <h5 className="font-semibold">Phone Number</h5>
          <h4 className="text-[#000000a6]">{data?.phoneNumber}</h4>
        </div>
        <div className="p-3">
          <h5 className="font-semibold">Total Products</h5>
          <h4 className="text-[#000000a6]">{data?.stock}10</h4>
        </div>
        <div className="p-3">
          <h5 className="font-semibold">Shop Rating</h5>
          <h4 className="text-[#000000a6]">4.6</h4>
        </div>
        <div className="p-3">
          <h5 className="font-semibold">Joined On</h5>
          <h4 className="text-[#000000a6]">{data?.createdAt?.slice(0, 10)}</h4>
        </div>
        {
          isOwner && (
              <div className="py-3 px-4 ">
                  <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
                      <span className="text-white">Edit Shop </span>
                  </div>
                  <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`} onClick={handleLogout}>
                      <span className="text-white">Logout</span>
                  </div>
              </div>
          )
        }
      </div>
    )}
    </>
  );
};

export default ShopInfo;
