import React from "react";


import {Link,} from "react-router-dom";

import { Buttonn} from "../../components/Button";
import { MaidLogoText } from "../../components/MaidLogoText";
import { MainTab } from "../../components/MainTab";
import "./style.css";

export const HomePage = (): JSX.Element => {

  return (
 
      <div className="home-page">
        <div className="overlap-group-wrapper">
          <div className="overlap-group">
            
            <p className="cleaning-equipment">
              <span className="text-wrapper">
                Cleaning equipment available
                <br />
              </span>
              <span className="span">
                Convenient online platform for placing an order <br />
                Easy Scheduling
                <br />
                Convenient payment method
                <br />
                Quality &amp; Reliability
                <br />
                Professional &amp; Dedication
              </span>
            </p>

            <Link to="/LoginPage">
              <Buttonn buttonTextClassName="button-instance" className="booking-button" text="Get Start!" />
            </Link>
           
          
            <p className="we-make-your-home">
              <span className="text-wrapper-2">We Make Your H</span>
              <span className="text-wrapper-3">o</span>
              <span className="text-wrapper-2">me Better</span>
            </p>
            <MainTab className="main-tab-instance" />
            
            <Link to="/LoginPage"><div className="div-1">Login</div></Link>
            
            <div className="text-wrapper-4">Price</div>
            <div className="text-wrapper-5">About Us</div>
            <div className="text-wrapper-6">Contact Us</div>
            <MaidLogoText className="maid-logo-text-instance" />
          </div>
        </div>
      </div>

  );
};
