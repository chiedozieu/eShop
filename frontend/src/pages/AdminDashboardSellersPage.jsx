import React from 'react'
import AdminHeader from '../components/admin/layout/AdminHeader'
import AdminSidebar from '../components/admin/layout/AdminSidebar'
import AllSellers  from '../components/admin/AllSellers'

const AdminDashboardSellersPage = () => {
  return (
    <div>
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[20%]">
          <AdminSidebar active={2}/>
        </div>
        <AllSellers />
      </div>
    </div>
  </div>
  )
}

export default AdminDashboardSellersPage