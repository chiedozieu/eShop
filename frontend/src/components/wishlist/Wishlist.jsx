import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { displayNGNCurrency } from "../../utils/displayCurrency";
import { BsHeart } from "react-icons/bs";
import { Link } from "react-router-dom";

const Wishlist = ({ setOpenWishlist }) => {
  const wishListData = [
    {
      id: 1,
      title: "Computers and Laptops",
      price: 1859000,
      image_Url:
        "https://cdn.shopify.com/s/files/1/1706/9177/products/NEWAppleMacbookProwithM1ProChip14InchLaptop2021ModelMKGQ3LL_A_16GB_1TBSSD_custommacbd.jpg?v=1659592838",
    },
    {
      id: 2,
      title: "cosmetics and body care",
      price: 239090,
      image_Url:
        "https://static.vecteezy.com/system/resources/previews/035/197/725/non_2x/cosmetics-products-transparent-background-fashion-outfit-profucts-png.png",
    },
    {
      id: 3,
      title: "Accesories",
      price: 50000,
      image_Url:
        "https://motorolaus.vtexassets.com/arquivos/power-category-image.png",
    },
    {
      id: 4,
      title: "Computers and Laptops",
      price: 1859000,
      image_Url:
        "https://cdn.shopify.com/s/files/1/1706/9177/products/NEWAppleMacbookProwithM1ProChip14InchLaptop2021ModelMKGQ3LL_A_16GB_1TBSSD_custommacbd.jpg?v=1659592838",
    },
    {
      id: 5,
      title: "cosmetics and body care",
      price: 239090,
      image_Url:
        "https://static.vecteezy.com/system/resources/previews/035/197/725/non_2x/cosmetics-products-transparent-background-fashion-outfit-profucts-png.png",
    },
    {
      id: 6,
      title: "Accesories",
      price: 50000,
      image_Url:
        "https://motorolaus.vtexassets.com/arquivos/power-category-image.png",
    },
    {
      id: 7,
      title: "Computers and Laptops",
      price: 1859000,
      image_Url:
        "https://cdn.shopify.com/s/files/1/1706/9177/products/NEWAppleMacbookProwithM1ProChip14InchLaptop2021ModelMKGQ3LL_A_16GB_1TBSSD_custommacbd.jpg?v=1659592838",
    },
    {
      id: 8,
      title: "cosmetics and body care",
      price: 239090,
      image_Url:
        "https://static.vecteezy.com/system/resources/previews/035/197/725/non_2x/cosmetics-products-transparent-background-fashion-outfit-profucts-png.png",
    },
    {
      id: 9,
      title: "Accesories",
      price: 50000,
      image_Url:
        "https://motorolaus.vtexassets.com/arquivos/power-category-image.png",
    },
    {
      id: 10,
      title: "Computers and Laptops",
      price: 1859000,
      image_Url:
        "https://cdn.shopify.com/s/files/1/1706/9177/products/NEWAppleMacbookProwithM1ProChip14InchLaptop2021ModelMKGQ3LL_A_16GB_1TBSSD_custommacbd.jpg?v=1659592838",
    },
    {
      id: 11,
      title: "cosmetics and body care",
      price: 239090,
      image_Url:
        "https://static.vecteezy.com/system/resources/previews/035/197/725/non_2x/cosmetics-products-transparent-background-fashion-outfit-profucts-png.png",
    },
    {
      id: 12,
      title: "Accesories",
      price: 50000,
      image_Url:
        "https://motorolaus.vtexassets.com/arquivos/power-category-image.png",
    },
  ];

  return (
    <div className="fixed top-0 left-0 bg-[#0000004b] w-full h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[50%] bg-white flex flex-col shadow-lg overflow-scroll">
        <div className="bg-orange-100 h-[167px] flex flex-col shadow-sm">
          <div className="flex justify-end pt-5 pr-5 text-2xl ">
            <IoIosCloseCircleOutline
              onClick={() => setOpenWishlist(false)}
              className="cursor-pointer"
              color="red"
            />
          </div>
          <div className="my-8 flex items-center justify-center">
            <div className="flex gap-2 items-center">
              <BsHeart size={25} className="" />

              <div className="flex gap-1 text-xl font-semibold">
                <h6>{wishListData.length}</h6>
                <p>items</p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[calc(100vh-200px)] overflow-scroll">
          <div className="max-w-[600px] mx-auto border-[1px] w-full mt-12 p-2 bg-slate-50">
            <div className="flex justify-between">
              <h3 className="">Product</h3>
              <h3 className="mr-16">Price</h3>
            </div>
          </div>
          {/* mapped */}
          <div className="">
            {wishListData &&
              wishListData.map((i, index) => (
                <WishlistSingleItem data={i} key={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const WishlistSingleItem = ({ data }) => {
  return (
    <div className="max-w-[600px] mx-auto border-[1px] border-t-0 p-2 flex justify-between items-center">
      <Link to={`/product/${data.title}`}>
        <div className="flex items-center gap-4">
          <img src={data.image_Url} alt="" className="h-20 w-20 object-cover" />
          <h6>
            {data.title.length > 20
              ? data.title.slice(0, 20) + "..."
              : data.title}
          </h6>
        </div>
      </Link>
      <div className="flex gap-2 items-center">
        <h6>{displayNGNCurrency(data.price)}</h6>
        <IoIosCloseCircleOutline
          // onClick={}
          className="cursor-pointer"
          color="red"
        />
      </div>
    </div>
  );
};

export default Wishlist;
