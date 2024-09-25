import React, { useState } from "react";
import { TbEyeCheck } from "react-icons/tb";
import { TbEyeClosed } from "react-icons/tb";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";
import { stateCategory } from "../../static/statesCategories";

const ShopCreate = () => {
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  //*** */
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [availableCities, setAvailableCities] = useState([]);
  //*** */

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { Headers: { "content-type": "multipart/form-data" } };

    const newForm = new FormData();

    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email.trim());
    newForm.append("password", password);
    newForm.append("address", address);
    newForm.append("phoneNumber", phoneNumber);

    //*** */
    newForm.append("selectedState", selectedState);
    newForm.append("selectedCity", selectedCity);
    //*** */

    await axios
      .post(`${server}/shop/create-shop`, newForm, config)
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar();
        setAddress("");
        setPhoneNumber();
        //*** */
        setSelectedState("");
        setSelectedCity("");

        //*** */
      })
      .catch((error) => {
        toast.error(error?.response?.data.message);
      });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  //*** */
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
  //*** */

  return (
    <div className="min-h-screen bg-gray-50 flex items-center flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a seller
        </h2>
      </div>
      <div className="mt-8 sm :mx-auto sm:w-full sm:max-w-xl ">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* form starts */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="name">
              <label
                htmlFor="name"
                className="block text-sm text-gray-700 font-medium"
              >
                Shop Name
              </label>
              <div className="mt-2 p-2 ">
                <input
                  type="name"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="phone-number">
              <label
                htmlFor="phone-number"
                className="block text-sm text-gray-700 font-medium"
              >
                Phone Number
              </label>
              <div className="mt-2 p-2 ">
                <input
                  type="number"
                  name="phone-number"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="email">
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 font-medium"
              >
                Email Address
              </label>
              <div className="mt-2 p-2 ">
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/*  */}
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
                      <label className="block pb-2 ">City</label>
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
            {/*  */}

           

            <div className="address">
              <label
                htmlFor="address"
                className="block text-sm text-gray-700 font-medium"
              >
                Address
              </label>
              <div className="mt-2 p-2 ">
                <input
                  type="address"
                  name="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="password">
              <label
                htmlFor="password"
                className="block text-sm text-gray-700 font-medium mt-4"
              >
                Password
              </label>
              <div className="mt-2 relative p-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm "
                />
                {showPassword ? (
                  <TbEyeClosed
                    className="absolute right-4 top-4"
                    size={25}
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <TbEyeCheck
                    className="absolute right-4 top-4"
                    size={25}
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>

            <div className="avatar">
              <label
                htmlFor="avatar"
                className="text-sm block font-medium text-gray-700"
              ></label>
              <div className="flex items-center mt-2 p-2">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload File</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div className="">
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-md rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full flex`}>
              <h4 className="text-gray-700">Already have account</h4>
              <Link
                to="/shop-login"
                className="text-blue-600 pl-2 hover:underline"
              >
                Login
              </Link>
            </div>
          </form>
          {/* form ends */}
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
