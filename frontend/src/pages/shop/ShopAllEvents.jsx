import React from 'react'
import DashboardHeader from '../../components/shop/layout/DashboardHeader'
import DashboardSidebar from '../../components/shop/layout/DashboardSidebar'
import AllEvents from '../../components/shop/AllEvents'

const ShopAllEvents = () => {
  return (
    <div>
         <DashboardHeader /> 
    <div className="flex justify-between w-full">
       <div className="w-[80px] md:w-[330px]">
           <DashboardSidebar active={4}/>
       </div>
       <div className="w-full justify-center flex">
         <AllEvents />
       </div>
   </div>
    </div>
  )
}

export default ShopAllEvents