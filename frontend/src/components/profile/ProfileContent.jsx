import React, { useState } from "react";
import { backend_url } from "../../server";
import { useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/style";
import { MdOutlineDeleteSweep } from "react-icons/md";

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState();
  const [state, setState] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const handleSubmit = (e) => {
    e.prevent.Default();
  };
  return (
    <div className="w-full ">
      {/*  profile content view */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${backend_url}${user?.avatar.url}`}
                alt=""
                className="profile-pic h-36 w-36 flex border-[3px] rounded-full object-cover border-[#3ad132]"
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] flex rounded-full items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <AiOutlineCamera />
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
                <div className="w-[100%] md:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-2  md:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  <label className="block pb-2">State</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
              </div>
              {/* row 3 */}
              <div className="md:flex block w-full pb-3">
                <div className="w-[100%] md:w-[50%]">
                  <label className="block pb-2">Address 1</label>
                  <input
                    type="address"
                    className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
                <div className="w-[100%] md:w-[50%]">
                  <label className="block pb-2">Address 2</label>
                  <input
                    type="address"
                    className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                    required
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
                {/* button update*/}
              </div>
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
        <div className="">
          <Address />
        </div>
      )}
    </div>
  );
};

const Address = () => {
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
        <div className="min-w-[5%] flex pl-8 justify-end">
          <MdOutlineDeleteSweep size={25} className="cursor-pointer text-red-500"/>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
