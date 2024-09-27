import React from "react";

const DashboardMessages = () => {
  // parent: ShopInboxPage
  return (
    <div className="w-[90%] bg-white m-5 h-[calc(100vh-100px)] overflow-y-scroll rounded ">
      <h1 className="text-center text-[30px] font-Poppins py-3 text-[#011c229a]">
        All messages
      </h1>

      {/* All messages list */}
      <MessageList />
    
    
    </div>
  );
};

const MessageList = () => {
  return (
    <div>
      <div className="flex w-full cursor-pointer p-3 bg-[#011c2224]">
        <div className="relative">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt=""
              className="w-12 h-12 rounded-full"
            />
            <div className="w-4 h-4 bg-green-500 rounded-full absolute bottom-0 right-0" /> 
        </div>
        <div className="pl-3 ">
            <h1 className=" text-[18px]">John Doe</h1>
            <p className="text-[16px] text-[#011c229a]">You:  Lorem ipsum dolor sit  </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardMessages;
