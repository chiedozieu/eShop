import React, { useEffect } from "react";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop } from "../../../redux/actions/product";
import { MdOutlineRateReview } from "react-icons/md";
import { MdOutlineLocalOffer } from "react-icons/md";

//parent: ShopDashboardPage
const DashboardHero = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { events } = useSelector((state) => state.event);
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller._id])
 
  return (
    <div className="w-full p-8">
      <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
      <div className="w-full block md:flex items-center justify-between">
        <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdProductionQuantityLimits size={25} className="mr-2" fill="#00000085" />
            <h3 className="text-[18px] font-semibold pl-3">All Products</h3>
          </div>
          <h5 className="pt-2 pl-[36px] test-[22px] font-medium">{products?.length}</h5>
          <Link to="/dashboard-products">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
          </Link>
        </div>
        <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdOutlineRateReview size={25} className="mr-2" fill="#00000085" />
            <h3 className="text-[18px] font-semibold pl-3">All Reviews</h3>
          </div>
          <h5 className="pt-2 pl-[36px] test-[22px] font-medium">{seller?.reviews?.length}</h5>
          <Link to={`/shop/${seller._id}?active=3`}>
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Reviews</h5>
          </Link>
        </div>
        <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdOutlineLocalOffer size={30} className="mr-2" fill="#00000085" />
            <h3 className="text-[18px] font-semibold pl-3">All Events</h3>
          </div>
          <h5 className="pt-2 pl-[36px] test-[22px] font-medium">{events?.length}</h5>
          <Link to="/dashboard-events">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Events</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;
