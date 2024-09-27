import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/style";
import { stateCategory } from "../../static/statesCategories";
import axios from "axios";
import { toast } from "react-toastify";
import { loadSeller } from "../../redux/actions/user";

//Parent:ShopSettingsPage
const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState(seller?.name);
  const [description, setDescription] = useState(seller?.description);
  const [selectedState, setSelectedState] = useState(seller?.selectedState);
  const [selectedCity, setSelectedCity] = useState(seller?.selectedCity);
  const [address, setAddress] = useState(seller?.address);
  const [phoneNumber, setPhoneNumber] = useState(seller?.phoneNumber);
  const [availableCities, setAvailableCities] = useState([]);
  const dispatch = useDispatch();

  //Parent:ShopSettingsPage

  useEffect(() => {
    if (selectedState) {
      const cities =
        stateCategory.states.find((state) => state.name === selectedState)
          ?.cities || [];
      setAvailableCities(cities);
    }
  }, [selectedState]);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.put(
        `${server}/shop/update-shop-avatar`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(loadSeller());
        toast.success("Avatar updated successfully");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `${server}/shop/update-seller-info`,
        {
          name,
          description,
          selectedState,
          selectedCity,
          address,
          phoneNumber,
          avatar: seller.avatar, // Include the existing avatar data
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Shop info updated successfully");
        dispatch(loadSeller());
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Handle state selection and update cities accordingly
  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);

    // Find the selected state's cities from the JSON
    const cities =
      stateCategory.states.find((state) => state.name === stateName)?.cities ||
      [];

    setAvailableCities(cities);
  };

  return (
    <div className="w-full h-[90vh] overflow-y-scroll flex items-center flex-col">
      <div className="flex w-full md:w-[80% ] flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative profile-image">
            <img
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : `${backend_url}/${seller?.avatar.url}`
              }
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
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className={`${styles.input}w-[95%] mb-4 md:mb-0`}
            />
          </div>
          <div className="w-[90%] flex flex-col md:w-[50%] items-center mt-5">
            <div className="w-full pl-[1%] md:pl-0">
              <label className="block pb-2">Shop Description</label>
            </div>
            <textarea
              cols={40}
              rows={4}
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${styles.input}w-[95%] mb-4 md:mb-0`}
            />
          </div>
          {/*  */}
          <div className="w-[90%] flex flex-col md:w-[50%] items-center mt-5">
            <div className="w-full pl-[1%] md:pl-0">
              <label className="block pb-2 ">State</label>
            </div>
            <select
              name=""
              id="state"
              value={selectedState}
              onChange={handleStateChange}
              className={`${styles.input}w-[95%] mb-4 md:mb-0`}
            >
              <option value="" className="block pb-2 border">
                -- Select a state --
              </option>
              {stateCategory &&
                stateCategory.states.map((state) => (
                  <option
                    value={state.name}
                    key={state.name}
                    className="block pb-2"
                  >
                    {state.name}
                  </option>
                ))}
            </select>
          </div>
          {/* City Dropdown */}
          {selectedState && (
            <div className="w-[90%] flex flex-col md:w-[50%] items-center mt-5">
              <div className="w-full pl-[1%] md:pl-0">
                <label className="block pb-2 ">City</label>
              </div>
              <select
                name=""
                id="city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className={`${styles.input}w-[95%] mb-4 md:mb-0`}
              >
                <option value="" className="block pb-2 border">
                  -- Select a city --
                </option>
                {availableCities &&
                  availableCities.map((city) => (
                    <option value={city} key={city} className="block pb-2">
                      {city}
                    </option>
                  ))}
              </select>
            </div>
          )}
          {/*  */}
          <div className="w-[90%] flex flex-col md:w-[50%] items-center mt-5">
            <div className="w-full pl-[1%] md:pl-0">
              <label className="block pb-2">Shop Address</label>
            </div>
            <input
              type="text"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
              className={`${styles.input}w-[95%] mb-4 md:mb-0`}
            />
          </div>
          <div className="w-[90%] flex flex-col md:w-[50%] items-center mt-5">
            <div className="w-full pl-[1%] md:pl-0">
              <label className="block pb-2">Shop Phone Number</label>
            </div>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
              className={`${styles.input}w-[95%] mb-4 md:mb-0 hover:border-red-600 hover:text-red-600 cursor-pointer`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
