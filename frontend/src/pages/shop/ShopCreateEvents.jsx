import React from 'react'
import DashboardHeader from '../../components/shop/layout/DashboardHeader'
import DashboardSidebar from '../../components/shop/layout/DashboardSidebar'
import CreateEvent from '../../components/shop/CreateEvent.jsx'

const ShopCreateEvents = () => {
  return (
    <div>
         <DashboardHeader /> 
         <div className="flex items-center justify-between w-full">
            <div className="w-[80px] md:w-[330px]">
                <DashboardSidebar active={5}/>
            </div>
            <div className="w-full justify-center flex">
                <CreateEvent />
            </div>
        </div>
    </div>
  )
}

export default ShopCreateEvents