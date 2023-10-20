import React from "react";


import {Link,} from "react-router-dom";

import { Buttonn} from "../../components/Button";
import { MaidLogoText } from "../../components/MaidLogoText";
import { MainTab } from "../../components/MainTab";
import "./style.css";

export const HomePage = (): JSX.Element => {

  return (
 
      <div className="home-page">
        <div className="overlap-group-wrapper1">
          <div className="overlap-group">
            
            <p className="cleaning-equipment">
              <span className="text-wrapper1">
                Cleaning equipment available
                <br />
              </span>
              <span className="span001">
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
              <span className="text2">We Make Your H</span>
              <span className="text3">o</span>
              <span className="text2">me Better</span>
            </p>
            <MainTab className="main-tab-instance" />
            
            <Link to="/LoginPage"><div className="div-1">Login</div></Link>
            
         
            <MaidLogoText className="maid-logo-text-instance" />
          </div>
        </div>
      </div>

  );
};
