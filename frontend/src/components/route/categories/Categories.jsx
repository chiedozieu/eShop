import React from "react";
import styles from "../../../styles/style.js";
import { brandingData, categoriesData } from "../../../static/data.js";
import { useNavigate } from "react-router-dom";


const Categories = () => {
  const navigate = useNavigate();
  return (
    <div>
      <>
        {/* First Segment */}
        <div className={`${styles.section} hidden sm:block`}>
          <div className="branding my-12 flex justify-between w-full shadow-md bg-white rounded-md p-5">
            {brandingData &&
              brandingData.map((i, index) => (
                <div className="flex items-start" key={index}>
                  {i.icon}
                  <div className="px-3">
                    <h3 className="font-bold text-sm md:text-base">
                      {i.title}
                    </h3>
                    <p className="text-xs md:text-sm">{i.Description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* First Segment */}
        <div
          className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
          id="categories"
        >
          <div className="grid grid-cols-1 gap-[4px] md:grid-cols-2 md:gap-2.5 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 xl:gap-[30px]">
            {categoriesData &&
              categoriesData.map((i, index) => {
                const handleSubmit = (i) => {
                  navigate(`/products?category=${i.title}`);
                };
                return (
                  <div
                    className="w-full h-[100px] flex items-center justify-between overflow-hidden cursor-pointer"
                    key={i.id}
                    onClick={() => handleSubmit(i)}
                  >
                    <h5 className={`text-lg leading-[1.3]`}>
                        {i?.title}
                    </h5>
                    <img src={i?.image_Url} alt="" className="w-[120px] object-cover"/>
                  </div>
                );
              })}
          </div>
        </div>
      </>
    </div>
  );
};

export default Categories;
