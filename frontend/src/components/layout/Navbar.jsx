import React from "react";
import styles from "../../styles/style";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";

const Navbar = ({ active }) => {
  return (
    <div className={`${styles.normalFlex}`} >
      {navItems &&
        navItems.map((i, index) => (
          <div className="flex" key={index}>
            <Link
              to={i.url}
              className={`${
                active === index + 1 ? " text-red-700 hover:cursor-default" : "text-black p-1 hover:underline"
              } font-semibold px-6 cursor-pointer`}
            >
                {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
