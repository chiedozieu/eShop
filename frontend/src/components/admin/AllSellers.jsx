import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { formatDate } from "../../utils/dateFormat";
import { Button } from "@mui/material";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { getAllSellers } from "../../redux/actions/sellers";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { GrView } from "react-icons/gr";

const AllSellers = () => {
  const { sellers, isLoading } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(getAllSellers()); // Fetch users when the component mounts
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${server}/shop/delete-seller/${id}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      dispatch(getAllSellers());
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };
  const columns = [
    {
      field: "id",
      headerName: "Seller Id",
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
      maxWidth: 200,
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
      headerName: "Phone Number",
      type: "phone",
      maxWidth: 130,
      flex: 0.5,
    },
    {
      field: "location",
      headerName: "Location",
      type: "text",
      maxWidth: 100,
      flex: 0.5,
    },

    {
      field: "",
      flex: 1,
      maxWidth: 120,
      headerName: "Preview Shop",
      type: "text",
      sortable: false,

      renderCell: (params) => {
        return (
          <>
            <Link to={`/shop/${params.id}`}>
                <Button>
                  <GrView  size={20} className="text-[#153dab] hover:text-[#1f1a53]"/>
                </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "delete",
      flex: 1,
      maxWidth: 100,
      headerName: "Delete Seller",
      type: "number",
      sortable: false,

      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setUserId(params.id) || setOpen(true)}>
              <MdDeleteOutline size={20} className="text-[#ab1515] hover:text-[#ff0606]" />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  sellers &&
    sellers.forEach((eachSeller) => {
      row.push({
        id: eachSeller._id,
        name: eachSeller.name,
        email: eachSeller.email,
        role: eachSeller.role,
        joined: formatDate(eachSeller.createdAt),
        phoneNumber: eachSeller.phoneNumber,
        // location: eachSeller.addresses?.map((address) => address.selectedState),
        location: eachSeller.selectedState
      });
    });

  return (
    <div className="w-full justify-center overflow-scroll mx-auto py-4">
      {isLoading ? (
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
                  <IoIosCloseCircleOutline size={25} className="text-[#9c0a07] [&>path:nth-child(2)]:fill-black hover:animate-spin"/>
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

export default AllSellers;
