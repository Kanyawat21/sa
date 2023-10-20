import React from "react";
import { AccountTab2 } from "../../components/AccountTab";
import { BackgoundWhite2} from "../../components/BackgoundWhite";
import { Buttonn } from "../../components/Button";
import { IconEdit } from "../../components/IconEdit";
import { IconHome } from "../../components/IconHome";
import "./style.css";
import { UsersInterface } from "../../interfaces/IData";
import { GetMemberById } from "../../services/http";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
   
export const ProfilePage2 = (): JSX.Element => {
  const location = useLocation();
  const id = location.state?.id;
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
  return (
    <div className="profile-page2">
      <div className="div-2">
        <div className="overlap-2">
          <BackgoundWhite2 className="design-component-instance-node"/>
          <AccountTab2 className="design-component-instance-node" property1="default" />
      
          <div className="text-wrapper-8">Address</div>
          <div className="boxaddress">
            <textarea readOnly value={member.map((member) => member.Address)}></textarea>
          </div>

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
