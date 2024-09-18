import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from "../../styles/style";
import { MdOutlineDeleteSweep } from "react-icons/md";
import {
  clearMessages,
  clearErrors,
  deleteUserAddress,
  updateUserAddress,
  updateUserInformation,
} from "../../redux/actions/user";
import { toast } from "react-toastify";
import axios from "axios";
import { stateCategory } from "../../static/statesCategories";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (successMessage) {
      toast.success(successMessage);
      clearMessages();
    }
  }, [error, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, phoneNumber, password));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.put(
        `${server}/user/update-avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        // Update the local state with the new avatar URL
        const updatedUser = response.data.user;
        setAvatar(updatedUser.avatar.url); // Update with the new avatar URL
        window.location.reload(); // Reload to reflect the changes
      }
    } catch (error) {
      toast.error("Failed to update avatar!");
    }
  };

  return (
    <div className="w-full ">
      {/*  profile content view */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative md:mt-0 mt-10">
              <img
                src={`${backend_url}${user?.avatar.url}`}
                alt=""
                className="profile-pic h-36 w-36 flex border-[3px] rounded-full object-cover border-[#3ad132]"
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] flex rounded-full items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
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
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit}>
              {/* Row 1 */}
              <div className="md:flex block w-full pb-3">
                <div className="w-[100%] md:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-[100%] md:w-[50%] ">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-2 md:mb-0`}
                    required
                    value={email}
                    disabled
                    title="Email cannot be updated"
                  />
                </div>
              </div>
              {/* Row 2 */}
              <div className="md:flex block w-full pb-3">
                <div className="w-[100%] md:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="w-[100%] md:w-[50%]">
                  <label className="block pb-2">Password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* button update*/}
              <input
                type="submit"
                className="w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer hover:border-[red] hover:text-[red] font-semibold"
                value="Update"
                required
              />
            </form>
          </div>
        </>
      )}
      {/*  address view */}
      {active === 3 && (
        <div className="md:mt-0 mt-10">
          <Address />
        </div>
      )}

      {/*  Change password view */}
      {active === 4 && (
        <div className="md:mt-0 mt-10">
          <ChangePassword />
        </div>
      )}
    </div>
  );
};

const Address = () => {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [availableCities, setAvailableCities] = useState([]);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addressTypeData === "" || selectedState === "" || selectedCity === "") {
      toast.error("Please fill all fields!");
    } else {
      dispatch(
        updateUserAddress(
          selectedState,
          selectedCity,
          address1,
          address2,
          addressType
        )
      );

      setOpen(false);
      setSelectedState("");
      setSelectedCity("");
      setAddress1("");
      setAddress2("");
      setAddressType("");
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

  const handleDelete = (i) => {
    dispatch(deleteUserAddress(i._id));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="h-screen fixed w-full bg-[#0000004b] top-0 left-0 flex items-center justify-center">
          <div className="w-[35%] bg-white h-[80vh] relative rounded shadow overflow-y-scroll">
            <div className="flex justify-end w-full p-3">
              <IoIosCloseCircleOutline
                size={25}
                className="cursor-pointer "
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-[25px] font-Poppins text-[#000000ba] text-center">
              Add Address
            </h1>
            <div className="w-full">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="block w-full p-4">
                  <div className="w-full p-2">
                    <label className="block pb-2 ">State</label>
                    <select
                      name=""
                      id="state"
                      value={selectedState}
                      onChange={handleStateChange}
                      className="w-full border h-[40px] rounded-[4px]"
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
                    <div className="w-full p-2">
                      <label className="block pb-2 ">Select City</label>
                      <select
                        name=""
                        id="city"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full border h-[40px] rounded-[4px]"
                      >
                        <option value="" className="block pb-2 border">
                          -- Select a city --
                        </option>
                        {availableCities &&
                          availableCities.map((city) => (
                            <option
                              value={city}
                              key={city}
                              className="block pb-2"
                            >
                              {city}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}

                  <div className="w-full p-2">
                    <label className="block pb-2 ">Address 1</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className="w-full p-2">
                    <label className="block pb-2 ">Address 2</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>
                  <div className="w-full p-2">
                    <label className="block pb-2 ">Address Type</label>
                    <select
                      name="addressType"
                      id="addressType"
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-full border h-[40px] rounded-[4px]"
                    >
                      <option value="" className="block pb-2 border">
                        -- Select Address Type --
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((type) => (
                          <option
                            value={type.name}
                            key={type.name}
                            className="block pb-2"
                          >
                            {type.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <input
                    type="submit"
                    className={`${styles.input} !mt-5 !cursor-pointer hover:border-red-500 hover:text-red-700 hover:font-semibold`}
                    required
                    value="Submit"
                    readOnly
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-semibold text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      {user &&
        user.addresses.map((i, index) => (
          <div
            key={index}
            className="w-full bg-white md:h-[70px] rounded-[4px] items-center md:flex block px-3 shadow justify-between md:pr-10 py-4 mb-5"
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-semibold">{i.addressType}</h5>
            </div>
            <div className="flex items-center pl-8 ">
              <h6 className="md:h-[70px] md:overflow-scroll flex items-center">
                {i.address1} {i.address2} {i.selectedCity}{" "}
                {`${i.selectedState} State`}
              </h6>
            </div>
            <div className="flex items-center pl-8 mb-4 md:mb-0 ">
              <h6 className="">{user?.phoneNumber}</h6>
            </div>
            <div className="min-w-[15%] flex pr-2 justify-end">
              <MdOutlineDeleteSweep
                size={25}
                className="cursor-pointer text-red-500"
                onClick={() => handleDelete(i)}
              />
            </div>
          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You do not have any saved address
        </h5>
      )}
    </div>
  );
};

const ChangePassword = () => {
  const { user } = useSelector((state) => state.user);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  console.log("user-profileContent", user);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        {
          withCredentials: true,
        }
      );
        toast.success(response.data.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      
      console.log(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {user && (
        <div className="w-full px-5">
          <h1 className="text-[25px] font-semibold text-[#000000ba] pb-2 text-center">
            Change Password
          </h1>
          <div className="w-full">
            <form
              onSubmit={handlePasswordSubmit}
              className="flex flex-col items-center"
            >
              <div className="w-[100%] md:w-[50%] mt-5">
                <label className="block pb-2">Old Password</label>
                <input
                  type="password"
                  className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="w-[100%] md:w-[50%] mt-2">
                <label className="block pb-2">New Password</label>
                <input
                  type="password"
                  className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="w-[100%] md:w-[50%] mt-2">
                <label className="block pb-2">Confirm new password</label>
                <input
                  type="password"
                  className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <input
                  type="submit"
                  className="w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer hover:border-[red] hover:text-[red] font-semibold"
                  value="Change Password"
                  required
                />
              </div>
            </form>
          </div>

          <br />
        </div>
      )}
    </>
  );
};

export default ProfileContent;
