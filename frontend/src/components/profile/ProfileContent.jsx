import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/style";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { updateUserInformation } from "../../redux/actions/user";
import { toast } from "react-toastify";
import { clearErrors } from "../../redux/actions/user";
import axios from "axios";

const ProfileContent = ({ active }) => {
  const { user, error } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState(null)
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
      const response = await axios.put(`${server}/user/update-avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
  
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
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-semibold text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white md:h-[70px] rounded-[4px] items-center md:flex block px-3 shadow justify-between md:pr-10 py-4">
        <div className="flex items-center">
          <h5 className="pl-5 font-semibold">Default</h5>
        </div>
        <div className="flex items-center pl-8">
          <h6 className="">123 Olabisi Ogudana Avenue, Aguda</h6>
        </div>
        <div className="flex items-center pl-8 mb-4 md:mb-0 ">
          <h6 className="">0801 234 5678</h6>
        </div>
        <div className="min-w-[5%] flex pr-8 justify-end">
          <MdOutlineDeleteSweep
            size={25}
            className="cursor-pointer text-red-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
