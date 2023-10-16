import React, { useEffect, useState } from "react";
import { BackgoundWhite } from "../../components/BackgoundWhite";
import { IconHome } from "../../components/IconHome";
import "./style.css";
import Table, { ColumnsType } from "antd/es/table";
import {Card }from 'antd';
import { ServiceInterface } from "../../interfaces/IData";
import { useLocation } from "react-router-dom";
import { ListServices } from "../../services/http";
const columns: ColumnsType<ServiceInterface> = [
  {
      title: "เมด",
      dataIndex: "Maid",
      key: "1",
      render: (item) => Object.values(item.FirstName),
  },
  {
      title: "วันที่",
      dataIndex: "PickDate",
      key: "2",
      // render: (item) => Object.values(item.PickDate),
  },
  {
      title: "เวลา",
      dataIndex: "PickTime",
      key: "3",
      // render: (item) => Object.values(item.PickTime),
  },
  {
    title: "ราคา",
    dataIndex:"Price",
    key:"4",
    
  }
  ];   

export const HistoryPage = (): JSX.Element => {
  const location = useLocation();
  const id = location.state?.id;;
  const params = new URLSearchParams(location.search);
  const userId = params.get('id');
  const idAsString = userId ? userId.toString() : "";
  console.log(userId);
  const [history, setHistory] = useState<ServiceInterface[]>([]);
  const listHistory = async () => {
      let res = await ListServices(userId);
      if (res) {
          setHistory(res);
          }
      };
      useEffect(() => {
          listHistory();
      },[]);
  return (
    <div className="history-page">
      <div className="div-4">
        <div className="overlap-2">
        <div  className="backgound-white-default"/>
            <Card className='show'>
                <Table columns={columns} dataSource={history} pagination={{ pageSize: 5 }}/>
              </Card>
     
            
            <div className="text-wrapper-9">Booking history</div>
            <IconHome className="icon-home-2" />
        </div>
      </div>
    </div>
  );
};
