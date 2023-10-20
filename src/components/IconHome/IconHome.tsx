/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface Props {
  className: any;
}
export const IconHome = ({ className }: Props): JSX.Element => {
  const location = useLocation();
  const id = location.state?.id;
  const params = new URLSearchParams(location.search);
  const userId = params.get('id');
  // console.log(id);
  const handleClick = () => {
    // Reset scrolling to the top of the page
    window.scrollTo(0, 0);
  }
  return (
    <Link to={`/HomePage2?id=${userId}`}>
      <img
      className={`icon-home ${className}` }
      alt="Icon home"
      src="https://c.animaapp.com/1cGgrXG8/img/---icon--home-2--1@2x.png"
      onClick={handleClick}
    />
    </Link>
  );
};
