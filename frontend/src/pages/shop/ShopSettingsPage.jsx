import React from "react";
import ShopSettings from "../../components/shop/ShopSettings";
import DashboardHeader from "../../components/shop/layout/DashboardHeader";
import DashboardSidebar from "../../components/shop/layout/DashboardSidebar";

const ShopSettingsPage = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex  w-full">
          <div className="w-[15%] md:w-[20%]">
            <DashboardSidebar active={8} />
          </div>
          <div className="w-[85%] md:w-[80%]">
            <ShopSettings />
          </div>
        </div>
    </div>
  );
};

export default ShopSettingsPage;
