import React, { useEffect } from "react";
import {
  MdOutlineLocalOffer,
  MdOutlineRateReview,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllSellers } from "../../redux/actions/sellers";

const AdminDashboardMain = () => {
    const { sellers } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSellers());
  }, []);


console.log('sellers', sellers)
  return (
    <div className="w-full p-4 ">
      <h1 className="text-[22px] text-[#393939] font-Poppins pb-2">Overview</h1>
      <div className="w-full block md:flex items-center justify-between">
        <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdProductionQuantityLimits
              size={25}
              className="mr-2"
              fill="#00000085"
            />
            <h3 className="text-[18px] font-semibold pl-3">All Products</h3>
          </div>
          <h5 className="pt-2 pl-[36px] test-[22px] font-medium">12</h5>
          <Link to="/dashboard-products">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
          </Link>
        </div>
        <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdOutlineRateReview size={25} className="mr-2" fill="#00000085" />
            <h3 className="text-[18px] font-semibold pl-3">All Reviews</h3>
          </div>
          <h5 className="pt-2 pl-[36px] test-[22px] font-medium">{10}</h5>
          <Link to="">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Reviews</h5>
          </Link>
        </div>
        <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdOutlineLocalOffer size={30} className="mr-2" fill="#00000085" />
            <h3 className="text-[18px] font-semibold pl-3">All Sellers</h3>
          </div>
          <h5 className="pt-2 pl-[36px] test-[22px] font-medium">{sellers?.length}</h5>
          <Link to="/admin-sellers">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Sellers</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardMain;
