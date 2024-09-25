import React, { useState } from "react";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/style";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState('')

  console.log("seller", seller);
  const handleImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0]
    setAvatar(file)

    const formData = new FormData();
    formData.append("image", file);
  };
  const updateHandler = (e) => {
    e.preventDefault();
  }
  return (
    <div className="w-full min-h-screen flex items-center flex-col">
      <div className="flex w-full md:w-[80% ] flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative profile-image">
            <img
              src={ avatar ? URL.createObjectURL(avatar) : `${backend_url}${seller?.avatar.url} `}
              alt=""
              className="w-[200px] h-[200px] rounded-full cursor-pointer"
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] flex rounded-full items-center justify-center cursor-pointer absolute bottom-[15px] right-[15px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>
        {/* Shop Info */}

        <form className="flex flex-col items-center" onSubmit={updateHandler}>
          <div className="w-[90%] flex flex-col md:w-[50%] items-center mt-5">
            <div className="w-full pl-[1%] md:pl-0">
              <label className="block pb-2">Shop Name</label>
            </div>
            <input
              type="name"
              value={seller?.name}
              placeholder={`${seller?.name}`}
              required
              className={`${styles.input}w-[95%] mb-4 md:mb-0`}
            />
          </div>
          <div className="w-[90%] flex flex-col md:w-[50%] items-center mt-5">
            <div className="w-full pl-[1%] md:pl-0">
              <label className="block pb-2">Shop Description</label>
            </div>
            <input
              type="text"
              value={seller?.description ? seller?.description : null}
              placeholder={`${
                seller?.description ? seller?.description : "Enter description"
              }`}
              className={`${styles.input}w-[95%] mb-4 md:mb-0`}
            />
          </div>
          <div className="w-[90%] flex flex-col md:w-[50%] items-center mt-5">
            <div className="w-full pl-[1%] md:pl-0">
              <label className="block pb-2">Shop Address</label>
            </div>
            <input
              type="text"
              value={seller?.address}
              placeholder={`${seller?.address}`}
              required
              className={`${styles.input}w-[95%] mb-4 md:mb-0`}
            />
          </div>
          <div className="w-[90%] flex flex-col md:w-[50%] items-center mt-5">
            <div className="w-full pl-[1%] md:pl-0">
              <label className="block pb-2">Shop Phone Number</label>
            </div>
            <input
              type="tel"
              value={seller?.phoneNumber}
              placeholder={`${seller?.phoneNumber}`}
              required
              className={`${styles.input}w-[95%] mb-4 md:mb-0`}
            />
          </div>
          <div className="w-[90%] flex flex-col md:w-[50%] items-center mt-5">
            <input
              type="submit"
              value="Update"
              required
              readOnly
              className={`${styles.input}w-[95%] mb-4 md:mb-0`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
