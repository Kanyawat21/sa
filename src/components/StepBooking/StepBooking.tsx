/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  className: any;
  overlapClassName: any;
  divClassName: any;
  overlapClassNameOverride: any;
  divClassNameOverride: any;
  overlapGroupClassName: any;
  divClassName1: any;
  lineClassName: any;
  line: string;
  lineClassNameOverride: any;
  img: string;
}

export const StepBooking = ({
  className,
  overlapClassName,
  divClassName,
  overlapClassNameOverride,
  divClassNameOverride,
  overlapGroupClassName,
  divClassName1,
  lineClassName,
  line = "https://c.animaapp.com/1cGgrXG8/img/line-34-1@2x.png",
  lineClassNameOverride,
  img = "https://c.animaapp.com/1cGgrXG8/img/line-34-1@2x.png",
}: Props): JSX.Element => {
  return (
    <div className={`step-booking ${className}`}>
      <div className={`overlap ${overlapClassName}`}>
        <div className={`textstep ${divClassName}`}>1</div>
      </div>
      <div className={`overlap-group ${overlapClassNameOverride}`}>
        <div className={`textstep ${divClassNameOverride}`}>2</div>
      </div>
      <div className={`div-wrapper ${overlapGroupClassName}`}>
        <div className={`textstep ${divClassName1}`}>3</div>
      </div>
      <img className={`line ${lineClassName}`} alt="Line" src={line} />
      <img className={`img ${lineClassNameOverride}`} alt="Line" src={img} />
    </div>
  );
};

StepBooking.propTypes = {
  line: PropTypes.string,
  img: PropTypes.string,
};
