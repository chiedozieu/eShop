import React from 'react'
import DashboardHeader from '../../components/shop/layout/DashboardHeader'
import DashboardSidebar from '../../components/shop/layout/DashboardSidebar'
import DashboardHero  from '../../components/shop/layout/DashboardHero'

const ShopDashboardPage = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex items-start justify-between w-full">
            <div className="w-[80px] md:w-[330px]">
                <DashboardSidebar active={1}/>
            </div>
            <DashboardHero />
        </div>
    </div>
  )
}

export default ShopDashboardPage