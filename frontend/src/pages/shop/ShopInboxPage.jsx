import React from 'react'
import DashboardHeader from '../../components/shop/layout/DashboardHeader'
import DashboardSidebar from '../../components/shop/layout/DashboardSidebar'
import DashboardMessages from '../../components/shop/DashboardMessages'

const  ShopInboxPage = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex items-start justify-between w-full">
            <div className="w-[80px] md:w-[330px]">
                <DashboardSidebar active={6}/>
            </div>
            <DashboardMessages />
        </div>
    </div>
  )
}

export default ShopInboxPage