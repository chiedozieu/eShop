import React from 'react'
import DashboardHeader from '../../components/shop/layout/DashboardHeader'
import DashboardSidebar from '../../components/shop/layout/DashboardSidebar'
import CreateProduct from '../../components/shop/CreateProduct'

const ShopCreateProduct = () => {
  return (
    <div>
         <DashboardHeader /> 
         <div className="flex items-center justify-between w-full">
            <div className="w-[80px] md:w-[330px]">
                <DashboardSidebar active={3}/>
            </div>
            <div className="w-full justify-center flex">
                <CreateProduct />
            </div>
        </div>
    </div>
  )
}

export default ShopCreateProduct