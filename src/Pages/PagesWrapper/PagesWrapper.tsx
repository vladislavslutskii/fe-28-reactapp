import React, { useState } from "react";

import { Outlet, useLocation } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Blog from "../Blog";
import { PathNames } from "../Router";

const PagesWrapper = () => {
  const location = useLocation();
  return (
    <div>
      <Header></Header>
      {location.pathname === PathNames.Home ? <Blog></Blog> : <Outlet></Outlet>}
      <Footer></Footer>
    </div>
  );
};

export default PagesWrapper;
