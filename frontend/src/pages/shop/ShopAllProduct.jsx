import React from 'react'
import DashboardHeader from '../../components/shop/layout/DashboardHeader'
import DashboardSidebar from '../../components/shop/layout/DashboardSidebar'
import AllProducts from '../../components/shop/AllProducts'

const ShopAllProduct = () => {
  return (
    <div>
    <DashboardHeader /> 
    <div className="flex justify-between w-full">
       <div className="w-[80px] md:w-[330px]">
           <DashboardSidebar active={2}/>
       </div>
       <div className="w-full justify-center flex">
         <AllProducts />
       </div>
   </div>
</div>
  )
}

export default ShopAllProduct