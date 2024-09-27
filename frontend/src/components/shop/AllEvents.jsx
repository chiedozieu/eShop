

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent } from "../../redux/actions/event";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { displayNGNCurrency } from "../../utils/displayCurrency";
import Loader from "../layout/Loader";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { backend_url } from "../../server";
import { getAllEventsShop } from "../../redux/actions/event";

const AllEvents = () => {
  const { events, isLoading } = useSelector((state) => state.event);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllEventsShop(seller._id));
    }
  }, [dispatch, seller]);

  const handleDelete = (id) => {
    dispatch(deleteEvent (id));
    window.location.reload();
  };


  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 100, flex: 0.6, type: "number"},
    { field: "stock", headerName: "Stock", type: "number", minWidth: 80, flex: 0.5 },
    {
      field: "image",
      headerName: "Product Image",
      minWidth: 150,
      flex: 0.6,
      renderCell: (params) => {
        const imageUrl = params.value && params.value.length > 0 
          && `${backend_url}${params.value[0]}` 
        return (
          <img
            src={imageUrl}
          alt=""
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      )},
    },
    {
      field: "preview",
      headerName: "Preview",
      flex: 0.8,
      minWidth: 100,
      sortable: false,
      renderCell: (params) => {
        const d = params.row.name;
        const product_name = d.replace(/\s+/g, "-");
        return (
          <Link to={`/product/${product_name}`}>
            <Button>
              <AiOutlineEye size={20} />
            </Button>
          </Link>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "Delete",
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Button onClick={() => handleDelete(params.id)}>
          <AiOutlineDelete size={20}/>
        </Button>
      ),
    },
  ];

  const row = [];

  events &&
    events.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: displayNGNCurrency(item.discountPrice),
        stock: item.stock,
        image: item.images, 
      });
    });

 
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllEvents;