import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions/user";
import Loader from "../layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { formatDate } from "../../utils/dateFormat";
import { Button } from "@mui/material";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { IoIosCloseCircleOutline } from "react-icons/io";

const AllUsers = () => {
  const { users, userLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(getAllUsers()); // Fetch users when the component mounts
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${server}/user/delete-user/${id}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      dispatch(getAllUsers());
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };
  const columns = [
    {
      field: "id",
      headerName: "User Id",
      maxWidth: 100,
      flex: 0.7,
    },
    {
      field: "name",
      headerName: "Name",
      type: "text",
      maxWidth: 150,
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      maxWidth: 180,
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      type: "text",
      maxWidth: 100,
      flex: 0.5,
    },
    {
      field: "joined",
      headerName: "Date joined",
      type: "text",
      maxWidth: 130,
      flex: 0.5,
    },
    {
      field: "phoneNumber",
      headerName: "phoneNumber",
      type: "phone",
      maxWidth: 130,
      flex: 0.5,
    },
    {
      field: "location",
      headerName: "Location",
      type: "text",
      maxWidth: 130,
      flex: 0.5,
    },

    {
      field: "delete",
      flex: 1,
      maxWidth: 100,
      headerName: "Delete User",
      type: "number",
      sortable: false,

      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setUserId(params.id) || setOpen(true)}>
              <MdDeleteOutline size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  users &&
    users.forEach((eachUser) => {
      row.push({
        id: eachUser._id,
        name: eachUser.name,
        email: eachUser.email,
        role: eachUser.role,
        joined: formatDate(eachUser.createdAt),
        phoneNumber: eachUser.phoneNumber,
        location: eachUser.addresses?.map((address) => address.selectedState),
      });
    });

  return (
    <div className="w-full justify-center overflow-scroll mx-auto py-4">
      {userLoading ? (
        <Loader />
      ) : (
        <div className="w-[95%] mx-auto">
          <h3 className="text-[22px] font-Poppins pb-2 text-center">
            All Users
          </h3>
          <div className="w-full max-h-[45vh] bg-[#fff] rounded">
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          </div>
          {open && (
            <div className="w-full fixed top-0 left-0 bg-[#0000004b] z-[999] flex items-center justify-center h-screen">
              <div className="w-[40%] h-max bg-[#fff] shadow rounded-md p-2 pb-5">
                <div
                  className="flex justify-end cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  <IoIosCloseCircleOutline size={25} className="text-[#e70f0fc3] hover:text-[#e70f0f] "/>
                </div>
               
                <h3 className="text-center text-[22px] font-Poppins py-5 text-[#000000c3]">
                  Are you sure you want to delete this user?
                </h3>
                <div className="w-full flex items-center justify-center gap-4">
                  <button
                    onClick={() => setOpen(false) || handleDelete(userId)}
                    className="bg-[#9c0a07] hover:bg-[#9c0a07c5] w-16 text-white px-4 py-2 rounded"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="bg-[#07929c] hover:bg-[#07929cc7] text-white px-4 py-2 rounded w-16"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllUsers;
