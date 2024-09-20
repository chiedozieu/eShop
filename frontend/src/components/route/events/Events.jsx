// import React, { useEffect, useState } from "react";
import styles from "../../../styles/style";
import EventCard from '../eventCard/EventCard'
import { useSelector } from "react-redux";

const Events = () => {

  const { allEvents, isLoading } = useSelector((state) => state.event)

  
  return (
    <div className="">
      {
        !isLoading && (
          <div className={`${styles.section}`}>
        <div className={`${styles.heading} mt-10`}>
          <h1>Popular Events</h1>
        </div>
        <div className="w-full bg-white grid p-4">                       
                  <EventCard data={allEvents && allEvents[0]}/>                
        </div>
      </div>
        )
      }
    </div>
  );
};

export default Events;
