import React ,{useEffect, useState} from "react";
import { Buttonn } from "../../components/Button";
import { IconProfileCircle } from "../../components/IconProfileCircle";
import { MaidLogoText } from "../../components/MaidLogoText";
import { MainTab } from "../../components/MainTab";
import "./style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UsersInterface } from "../../interfaces/IData";
import { GetMemberById } from "../../services/http";

export const HomePage2 = (): JSX.Element => {
  const navigate = useNavigate();
  const [isDropVisible, setIsDropVisible] = useState(false);
  const location = useLocation();
  const id = location.state?.id;;
  const params = new URLSearchParams(location.search);
  const userId = params.get('id');
  const handleIconClick = () => {
    setIsDropVisible(!isDropVisible);
  };

  const [member,setmember] = useState<UsersInterface[]>([]);
  const getMember = async () => {
    let res = await GetMemberById(Number(userId));
    if (res) {
      setmember(res);
    }
  };
  console.log(member.map((member) => member.UserName));
  useEffect(() => {
    getMember();
  }, []);
  return (
    <div className="home-page2">      
      <div className="div">
        <div className="overlap-group"> 
          <MainTab className="main-tab-instance" />
          <MaidLogoText className="maid-logo-text-instance" />
          <div className="price">Price</div>
          <div className="username"><textarea value={member.map((member) => member.UserName)}></textarea></div>
          <div className="aboutus">About Us</div>
          <div className="contactus">Contact Us</div>
          <IconProfileCircle className="icon-profile-circle-instance" onClick={handleIconClick}/>
          {isDropVisible && (
            <div className="drop">
                <Link to={`/ProfilePage?id=${userId}`}>
                  <div className="my-account">My account</div>
                </Link>
                <div className="line">
                  <hr />
                </div>
                <Link to="/">
                  <div className="logout">Logout</div>
                </Link>
            </div>
          )}
        </div>
        <div className="overlap">
          <img
            className="icon-calendar"
            alt="Icon calendar"
            src="https://c.animaapp.com/yoh2VfX4/img/---icon--calendar-@2x.png"
          />
          </div>
          <div className="overlap-2">
          <img
            className="icon-refresh"
            alt="Icon refresh"
            src="https://c.animaapp.com/yoh2VfX4/img/---icon--refresh-@2x.png"
          />
          <img
            className="icon-clock"
            alt="Icon clock"
            src="https://c.animaapp.com/yoh2VfX4/img/---icon--clock-@2x.png"
          />
          </div>
          <div className="icon-medal-star-wrapper">
          <img
            className="icon-medal-star"
            alt="Icon medal star"
            src="https://c.animaapp.com/yoh2VfX4/img/---icon--medal-star-@2x.png"
          />
          </div>
          <div className="icon-messages-wrapper">
          <img
            className="icon-messages"
            alt="Icon messages"
            src="https://c.animaapp.com/yoh2VfX4/img/---icon--messages-2-@2x.png"
          />
          </div>
          <Link to={`/BookingPage?id=${userId}`}>
            <Buttonn buttonTextClassName="button-instance" className="booking-button" text="Booking!" />
          </Link> 

          <Link to={`/HistoryPage?id=${userId}`}>
            <Buttonn buttonTextClassName="button-instance" className="myact-button" text="Booking history" />
          </Link>
          
          <Link to={`/ReviewPage?id=${userId}`}>
            <Buttonn buttonTextClassName="button-instance" className="review-button" text="Reveiw Us!" />
          </Link>
          <Link to={`/ReportPage?id=${userId}`}>
            <Buttonn buttonTextClassName="button-instance" className="report-button" text="Report an issue" />
          </Link>
      </div>
    </div>
  );
};
