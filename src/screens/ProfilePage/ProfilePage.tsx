import React from "react";
import { AccountTab } from "../../components/AccountTab";
import { Buttonn } from "../../components/Button";
import { IconHome } from "../../components/IconHome";
import "./style.css";
import { BackgoundWhite2 } from "../../components/BackgoundWhite/BackgoundWhite";
import { useState, useEffect } from "react";
import { UsersInterface } from "../../interfaces/IData";
import { GetMemberById } from "../../services/http";
import { Link, useLocation } from "react-router-dom";

export const ProfilePage = (): JSX.Element => {
  const location = useLocation();
  const id = location.state?.id;
  console.log(id)
  const params = new URLSearchParams(location.search);
  const userId = params.get('id');
  const [member,setmember] = useState<UsersInterface[]>([]);
  const getMember = async () => {
    let res = await GetMemberById(Number(userId));
    if (res) {
      setmember(res);
    }

  };
  useEffect(() => {
    getMember();
  }, []);
  console.log(member.map((member) => member.FirstName))
  return (
    <div className="profile-page">
      <div className="div-2">
        <div className="overlap-2">
          <BackgoundWhite2 className="design-component-instance-node"/>
          <AccountTab className="design-component-instance-node" property1="default"></AccountTab>
          <div className="text-wrapper-3">Email</div>
          <div className="boxemail">
            <textarea value={member.map((member) => member.Email)}></textarea>
          </div>
          <div className="text-wrapper-4">Username</div>
          <div className="boxusername">
            <textarea value={member.map((member) => member.UserName)}></textarea>
          </div>
          <div className="text-wrapper-5">Phone number</div>
          <div className="boxphonenumber">
            <textarea value={member.map((member) => member.Tel)}></textarea>   
          </div>
          <div className="text-wrapper-6">First Name</div>
          <div className="boxfirstname">
            <textarea value={member.map((member) => member.FirstName)}></textarea>
          </div>
          <div className="text-wrapper-7">Last Name</div>
          <div className="boxlastname">
            <textarea value={member.map((member) => member.LastName)}></textarea> 
          </div>
          <div className="text-wrapper-8">Profile</div>
         
          <div className="text-wrapper-9">Edit profile picture</div>
          <img
            className="icon-profile-circle"
            alt="Icon profile circle"
            src="https://c.animaapp.com/p8A4OecU/img/---icon--profile-circle-@2x.png"
          />
        </div>
        <div className="text-wrapper-10">My account</div>
        <IconHome className="icon-home-2" />
      </div>
    </div>
  );
};
