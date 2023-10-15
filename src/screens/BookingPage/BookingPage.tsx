import React, { useState, useEffect } from "react";
import dayjs from 'dayjs';
import { BackgoundWhite } from "../../components/BackgoundWhite";
import { Buttonn } from "../../components/Button";
import { IconHome } from "../../components/IconHome";
import { StepBooking } from "../../components/StepBooking";
import "./style.css";
import { BackButton4 } from "../../components/BackButton/BackButton";
import { message, TimePicker, Select, DatePicker, DatePickerProps, Radio, Form, Card } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { AccommodationInterface, Hour_of_workInterface,ServiceInterface, MemberInterface } from "../../interfaces/IData";
import { GetAccommodations, GetHour_of_works, CreateService, GetMemberById} from "../../services/http";
import { Link,useLocation,useNavigate, useParams } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";


export const BookingPage = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id;
  const params = new URLSearchParams(location.search);
  const userId = params.get('id');

  const [yesno, setYesno] = useState('');
  const YesnoChange = (e: RadioChangeEvent) => { console.log('radio checked', e.target.value); setYesno(e.target.value); };
  const { Option } = Select
  const [messageApi, contextHolder] = message.useMessage();
  const [member,setMember] = useState<MemberInterface[]>([]);
  const [Accommodations, setAccommodations] = useState<AccommodationInterface[]>([]);
  const [Hour_of_works, setHour_of_works] = useState<Hour_of_workInterface[]>([]);

  const [selectedAccommodationPrice, setSelectedAccommodationPrice] = useState<number>(0.0);
  const [selectedHour_of_workPrice, setSelectedHour_of_workPrice] = useState<number>(0.0);



  const onFinish = async (values: ServiceInterface) => {
  
    const formatValues: ServiceInterface = {
      ID: values.ID,
      MemberID:Number(userId),
      Has_pet: values.Has_pet||'',
      Pet_detail: values.Pet_detail || '-',
      PickDate: formatDate(`${values.PickDate}`),
      PickTime: formatTime(`${values.PickTime}`),
      AccomodationID: values.AccomodationID,
      Accomodation: values.Accomodation, 
      Hour_of_workID: values.Hour_of_workID,
      Hour_of_work: values.Hour_of_work
    }
    console.log(`${formatValues.PickTime}`);
    console.log(`${formatValues.PickDate}`);
    if (
      formatValues.PickDate === null || formatValues.PickDate === '' ||
      formatValues.PickTime === null || formatValues.PickTime === '' ||
      formatValues.AccomodationID === null ||formatValues.Has_pet===''||
      formatValues.Hour_of_workID === null 
  ) {
      messageApi.error('Please fill in complete information');}
    else{
    let res = await CreateService(formatValues);
    if (res.status) {
      //console.log(values);
      messageApi.open({
        type: "success",
        content: "Booking Successful",
      });
      setTimeout(function () {
        navigate(`/BookingPage2?id=${userId}`);
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: "Sorry",
      });
    } }
    console.log(values);
  };

  const getMemberById = async () => {
    let res = await GetMemberById(Number(userId));
    console.log(res)
    if (res) {
      setMember(res);

    } console.log(res.Address);
  }

  const getAccommodation = async () => {
    let res = await GetAccommodations();
    if (res) {
      setAccommodations(res);
    }
  };
  const getHourOfWork = async () => {
    let res = await GetHour_of_works();
    if (res) {
      setHour_of_works(res);
    }
  };

  useEffect(() => {
    getAccommodation();
    getHourOfWork();
    getMemberById();
  }, []);
  const disabledDate: DatePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().subtract(1, 'day').endOf('day');
  };

 
  return (
    <div className="booking-page">
      {contextHolder}
      <div className="div-4">
        <div className="overlap-2">
          <BackgoundWhite className="backgound-white-default" />
          <div className="rectangle-2" />
          <div className="rectangle-3" />
          <div className="rectangle-4" />
          <div className="card" />
          
          <StepBooking
            className="step-booking-instance"
            divClassName="step-booking-2"
            divClassName1="step-booking-2"
            divClassNameOverride="step-booking-2"
            img="https://c.animaapp.com/1cGgrXG8/img/line-35@2x.png"
            line="https://c.animaapp.com/1cGgrXG8/img/line-34@2x.png"
            lineClassName="step-booking-5"
            lineClassNameOverride="step-booking-6"
            overlapClassName="design-component-instance-node"
            overlapClassNameOverride="step-booking-3"
            overlapGroupClassName="step-booking-4" />
          {/*==============================================================*/}
          {/*Add your code here nakaaaaaa */}
          <Form
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            labelCol={{span:24}}
            wrapperCol={{span:24}}
          >
            <Form.Item
              label={<span className="text1">Please select accommodation type.
                <br />We will estimate the cleaning time and the price.
              </span>}
              name="AccomodationID" 
              >
              <Select allowClear
                className="custom-selectAccommodation"
                placeholder="Please select accommodation type."
                onSelect={(value, option) => {
                  if (option) {
                    const price = option['data-price'];
                    setSelectedAccommodationPrice(price); // อัปเดตค่า data-price ที่ถูกเลือกใน selectedAccommodationPrice
                    console.log('Accommodation',price); // แสดงค่า data-price ในคอนโซล
                  }
                }}
              >
                {Accommodations.map((item) => (
                  <Option value={item.ID} key={item.ID} data-price={item.Price} >{item.Name_type}</Option>

                ))}
              </Select>
            </Form.Item>
            <Form.Item name="Hour_of_workID" /*rules={[{ required: true, message: "Please select hour!", },]}*/>
              <Select allowClear
                placeholder=" Please select the desired number of hours."
                className="custom-selectAccommodation"
                onSelect={(value, option) => {
                  if (option) {
                    const price = option['data-price'];
                    setSelectedHour_of_workPrice(price); // อัปเดตค่า data-price ที่ถูกเลือกใน selectedAccommodationPrice
                    console.log('Hour of work: ',price); // แสดงค่า data-price ในคอนโซล
                  }
                }}
              >
                {Hour_of_works.map((item) => (
                  <Option value={item.ID} key={item.ID} data-price={item.Price}>{item.Hour}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label={<span className="text3">Date and Time of use</span>} style={{ marginBottom: 0,marginTop:40 }}>
              <Form.Item name="PickDate" /*rules={[{ required: true, message: "Please select date!", },]}*/
                style={{ display: 'inline-block' }} >
                <DatePicker className="custom-DatePicker" disabledDate={disabledDate}
                ></DatePicker>
              </Form.Item>
              <Form.Item name="PickTime" /*rules={[{ required: true, message: "Please select time!", },]}*/
                style={{ display: 'inline-block', margin: '0 8px' }}>
                <TimePicker className="custom-TimePicker" format="HH:mm" ></TimePicker>
              </Form.Item >
            </Form.Item>
            <Form.Item label={<span className="text4">Dose your place have pets? (if yes, please specify)</span>} name="Has_pet"
              labelCol={{ span: 25 }} style={{marginTop:10}}>
              <Radio.Group onChange={YesnoChange} value={yesno} >
                <Radio className="yes" value={'yes'} >YES {yesno === 'yes' ?
                  <Form.Item
                    name="Pet_detail">
                    <div className="rectangle-1" />
                    <TextArea
                      showCount
                      maxLength={100}
                      className="Pet_detail_TextBox"
                    />
                  </Form.Item> : null}
                </Radio>
                <Radio className="no" value={'no'}>NO</Radio>
              </Radio.Group>
            </Form.Item>     
            {/* {yesno === 'yes' && (
                <Form.Item name="Pet_detail">
                  <div className="rectangle-1" />
                  <TextArea showCount maxLength={100} className="Pet_detail_TextBox" />
                </Form.Item>
              )} */}

            <Form.Item>
             <Buttonn buttonTextClassName="button-2" className="button-instance" text="OK" />
            </Form.Item>   
          </Form>
            <Form className="textLocation"
              name="b"
              layout="vertical"
              // form={form}
              // onFinish={onFinish1}
              autoComplete="off">
                <span style={{fontFamily:"Inter, Helvetica",marginTop:-5,fontSize:18}}> Service Location</span>
                <br/><br/>
              <span style={{ fontSize: 18,fontFamily:"Inter, Helvetica" }}>Address</span><br/>
              <textarea className="textaddress" disabled value={member.map((member) => member.Address)}></textarea><br/>
              <span style={{ fontSize: 18 ,fontFamily:"Inter, Helvetica"}}> Tel.</span><br/>
              <textarea  disabled value={member.map((member) => member.Tel)}></textarea>
            </Form>
          <span className="textService">Service Charge : </span>  
          <span className="textService1">{selectedAccommodationPrice + selectedHour_of_workPrice} Baht</span>
          {/*==============================================================*/}
          <div className="text-wrapper-9">Booking a service</div>
          <IconHome className="icon-home-2" /> {/*Return to homepage2 */}
        </div>
      </div>
    </div>
  );
};

function formatTime(inputDateString: string): string {
  const inputDate = new Date(inputDateString);
  
  if (isNaN(inputDate.getTime())) {
    console.error('Invalid Time');
    return '';
}

  // แปลงเวลาไปยังโซนเวลา '+07:00'
  const utcHours = inputDate.getUTCHours();
  const localHours = utcHours + 7; // +07:00

  const formattedHours = (localHours < 24 ? localHours : localHours - 24).toString().padStart(2, '0');
  const formattedMinutes = inputDate.getUTCMinutes().toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:00`;
}



function formatDate(inputDateString: string): string {
  const inputDate = new Date(inputDateString);

  if (isNaN(inputDate.getTime())) {
    // throw new Error('Invalid date');
    console.error('Invalid Date');
    return '';
  }

  const year = inputDate.getUTCFullYear().toString().padStart(4, '0');
  const month = (inputDate.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = inputDate.getUTCDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}
