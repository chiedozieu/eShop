import React from "react";
import { SlClose } from "react-icons/sl";

const PopUp = ({ setOpen, children }) => {
  return (
    <>
      <div className="w-full fixed top-0 left-0 bg-[#0000004b] h-screen z-50 flex items-center justify-center">
        <div className=" w-[80%] md:w-[50%] bg-[#fff] h-[80vh] shadow rounded-md p-3">
          <div className="w-full flex justify-end p-3">
            <SlClose
              size={25}
              className="cursor-pointer hover:text-red-700"
              onClick={() => setOpen(false)}
            />
          </div>
          <div className="content-area">{children}</div>
        </div>
      </div>
    </>
  );
};

export default PopUp;
