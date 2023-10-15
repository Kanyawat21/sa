import './style.css';
import {Link, useLocation} from 'react-router-dom'
import { Input, Button, Form, message } from 'antd';
import React, { useState, useEffect } from "react";
import { Table , Select} from 'antd';
import type { ColumnsType } from "antd/es/table";
import { ReviewInterface } from '../../interfaces/IData';
import { CreateReview, ListReview } from '../../services/http'
import { IconHome } from "../../components/IconHome";
import { Buttonn } from '../../components/Button';

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
const { TextArea } = Input;
const columns: ColumnsType<ReviewInterface> = [
  {
      title: "เวลา",
      dataIndex: "CreatedAt",
      key: "1",
  },
  {
      title: "คะแนน",
      dataIndex: "Rate",
      key: "2",
  },
  {
      title: "ข้อความ",
      dataIndex: "Detail",
      key: "3",
  }
  ];   

export const ReviewPage = (): JSX.Element => {
  const location = useLocation();
  const id = location.state?.id;;
  const params = new URLSearchParams(location.search);
  const userId = params.get('id');
  const [reviews, setReview] = useState<ReviewInterface[]>([]);
  const listReview = async () => {
      let res = await ListReview();
      if (res) {
          setReview(res);
          }
      };
      useEffect(() => {
          listReview();
      },[]);
      const [messageApi] = message.useMessage();
      const onFinish = async (values: ReviewInterface) => {
        let res = await CreateReview(values);
        if (res.status) {
        messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
        });
      }
      console.log(values);
    }
  return (
    <div className='web'>
      <div className='home'>
        <IconHome className="icon-home-2" />
      </div>
        <div className='head'>
          <div className='text'>
            REVIEW
          </div>
        </div>
        <div className='back'>
          <div className='body'>
            <div className='reviewpage'>
              <div className='show'>
                <Table columns={columns} dataSource={reviews} pagination={{ pageSize: 5 }}/>
              </div>
            </div>
            <Form onFinish={onFinish}>
            <div className='rate'>
              <Form.Item name="Rate" rules={[{required: true, message: "กรุณาใส่คะแนน",}]}>
              <Select
                defaultValue="RATE"
                status="warning"
                style={{ width: 200 }}
                onChange={handleChange}
                options={[
                  { value: 1, label: 'BAD' },
                  { value: 2, label: 'NOTGOOD' },
                  { value: 3, label: 'OK' },
                  { value: 4, label: 'GOOD'},
                  { value: 5, label: 'BEST' },
                ]}
              />
              </Form.Item>
            </div>
            <div className='box1'>
              <div className='text'>How about our service?</div>
            </div>
            <div className='textarea'>
            <Form.Item name="Detail">
            <TextArea style={{ height: 200, resize: 'none' }}placeholder="Comment Here" defaultValue={"-"} />
            </Form.Item>
            </div>
            <div className='buttonlayout'>
            <Form.Item>
              <Button className="styled" htmlType="submit">SEND</Button>
            </Form.Item>
            </div>
            </Form>
          </div>
        </div>
      </div> 
  );
}

