import React from "react";

import { FaRocket } from "react-icons/fa";
import classes from './header.module.css'

const Header = () => {
  return (
    <div>
      <h1 className={ classes.h1}>
        <FaRocket /> Todo
      </h1>
    </div>
  );
};

export default Header;
