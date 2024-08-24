import React from "react";
import styles from "../../../styles/style";
import EventCard from '../eventCard/EventCard'

const Events = () => {
  return (
    <div className="">
      <div className={`${styles.section}`}>
        <div className={`${styles.heading} mt-10`}>
          <h1>Popular Events</h1>
        </div>
        <div className="w-full bg-white">
             <EventCard />
        </div>
      </div>
    </div>
  );
};

export default Events;
