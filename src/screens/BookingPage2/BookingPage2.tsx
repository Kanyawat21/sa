import React, { useEffect, useState } from "react";
import { BackgoundWhite } from "../../components/BackgoundWhite";
import { Buttonn } from "../../components/Button";
import { StepBooking } from "../../components/StepBooking";
import "./style.css";

import { Link, useLocation } from "react-router-dom";
import { Service1Interface } from "../../interfaces/IData";
import { GetService } from "../../services/http";
import { RealServiceInterface } from "../../interfaces/ball/IBP3";
import { GetServiceID } from "../../services/http/ball";


export const BookingPage2 = (): JSX.Element => {
  const location = useLocation();
  // const id = location.state?.id;
  const params = new URLSearchParams(location.search);
  const userId = params.get('id');
  const idAsString = userId ? userId.toString() : "";

  const [userData, setUserData] = useState(null);
  
  const [sid, setSid] = useState<RealServiceInterface>();
 
  const getServiceID = async () => {
    let res = await GetServiceID();
    if (res) {
      setSid(res);
    }
  };


  useEffect(() => {
    getServiceID();
  },[]);
  
  useEffect(() => {
    if (userId) {
      fetchUserData(idAsString);
    } }, [userId]);

  const fetchUserData = async (idAsString: string) => {
    try {
      const response = await GetService(idAsString);
      if (response) {
        setUserData(response);
      
        
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Error:', error);
      setUserData(null);
    }
  };
  return (
    
    <div className="booking-page2">
      <div className="div-4">
        <div className="overlap-2">
            <BackgoundWhite className="backgound-white-default" />
        
            <StepBooking
              className="step-booking-instance"
              divClassName="step-booking-2"
              divClassName1="step-booking-2"
              divClassNameOverride="step-booking-2"
              img="https://c.animaapp.com/1cGgrXG8/img/line-35@2x.png"
              line="https://c.animaapp.com/Pw7fZ7QT/img/line-34@2x.png"
              lineClassName="step-booking-5"
              lineClassNameOverride="step-booking-6"
              overlapClassName="design-component-instance-node"
              overlapClassNameOverride="step-booking-3"
              overlapGroupClassName="step-booking-4"/>
            {/*==============================================================*/}
            <img className="rectangle-2" alt="Rectangle" src="https://c.animaapp.com/XOd3Hw33/img/rectangle-50.png" />
            <div className="service-charge-xxxx">
              Service
              Charge:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="text-wrapper-12">{userData ? `${(userData as Service1Interface).Price}` : 'N/A'}</div>
              Baht
            </div>
            <div className="text-wrapper-20">Accommodation Type :</div>
            <div className="text-wrapper-3">Schedule :</div>
            <div className="text-wrapper-4">Duration :</div>
            <p className="p">Dose your place have pets? (if yes,please specify)</p>
            <div className="text-wrapper-5">Service Location </div>
            <div className="text-wrapper-6">{userData ? `${(userData as Service1Interface).Have_pet}` : 'N/A'}</div>
            <div className="text-wrapper-7">{userData ? `${(userData as Service1Interface).Accom_type}` : 'N/A'}</div>
            <div className="text-wrapper-8">{userData ? `${(userData as Service1Interface).HHour}` : 'N/A'}</div>
            <div className="text-wrapper-9">{userData ? `${((userData as Service1Interface).Date || 'N/A').substring(0, 10)}` : 'N/A'}</div>
            <div className="text-wrapper-10">{userData ? `${(userData as Service1Interface).Location}` : 'N/A'}</div>
            <div className="text-wrapper-13">Maid:</div>
            <div className="text-wrapper-14">{userData ? `${(userData as Service1Interface).M_firstname} ${(userData as Service1Interface).M_lastname}`: 'N/A'}</div>
            <div className="text-wrapper-15">Maid's tel:</div>
            <div className="text-wrapper-16">{userData ? `${(userData as Service1Interface).M_Tel}` : 'N/A'}</div>
            <div className="text-wrapper-17">;{userData ? `${(userData as Service1Interface).Time}` : 'N/A'}</div>
            <div className="text-wrapper-18">
                {userData && (userData as Service1Interface).Detail 
                !== '-' ? `${(userData as Service1Interface).Detail}` : ''}
            </div>
            <div className="contact">if you would like to edit your booking, please contact us
            </div>
            <div className="mail">koratmaid@gmail.com | 088-557-6188 | @line:maidkorat</div>
            

            
            <Link to={`/BookingPage3?id=${sid?.ID}`}>
                <Buttonn buttonTextClassName="button-2" className="button-instance" text="Next" />
            </Link>
            <div className="text-wrapper-11">Booking a service</div>
            
        </div>
      </div>
    </div>
  );
};



