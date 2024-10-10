import React from 'react'
import AdminSidebar from '../components/admin/layout/AdminSidebar'
import AdminHeader from '../components/admin/layout/AdminHeader'
import AllUsers  from '../components/admin/AllUsers'

const AdminDashboardUsersPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[20%]">
            <AdminSidebar active={3}/>
          </div>
          <AllUsers />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardUsersPage