import { BackButton } from "../../components/BackButton";
import { MaidLogoWhite } from "../../components/MaidLogoWhite";
import "./style.css";
import {  message } from 'antd';
import { useNavigate , Link } from 'react-router-dom';
import { UsersInterface } from "../../interfaces/IData";
import { CreateUser, GetUserName,GetEmail } from "../../services/http";
import { Button, Form, Input } from 'antd';
import React from "react";
export const SignUpPage = (): JSX.Element => {

    const navigate = useNavigate();
    const onFinish = async (values: UsersInterface) => {
      if(values.Password.length>3){
      let response = await GetUserName(values.UserName)
      let ress = await GetEmail(values.Email)
      if (response.status ) {
        message.error("usernameซ้ำ!")}
      else if(ress.status){
        message.error("emailซ้ำ!")
      }else{
        let res = await CreateUser(values);
    
        if (res.status) {
          message.success("success! Welcome!");
    
          setTimeout(function () {
            navigate("/LoginPage");
          }, 2000);
        } else {
          console.log(res);
        }}
      }
      else{
        message.error("รหัสผ่านต้องมีความยาวมากกว่า4ตัว")
      }
      
    };
    
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="sign-up-page">
    <div className="div-2">
    <MaidLogoWhite className="maid-logo-white-instance" />
    <div className="overlap">
    <div className="sign-up">Sign Up</div> 
    <Form
    name="basic"
    labelCol={{ span: 24 }} // ปรับความกว้างของคอลัมน์ป้ายชื่อตามต้องการ
    wrapperCol={{ span: 24 }} // ปรับความกว้างของคอลัมน์ช่องป้อนข้อมูลตามต้องการ
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      className = "username-textbox"
      label="Username"
      name="UserName"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
    <Input style={{ fontSize: '16px' }}/>
    </Form.Item>

    <Form.Item
      className = "firstname-textbox"
      label="Firstname"
      name="Firstname"
      rules={[{ required: true, message: 'Please input your firstname!' }]}
    >
    <Input style={{ fontSize: '16px' }}/>
    </Form.Item>

    <Form.Item
      className = "lastname-textbox"
      label="Lastname"
      name="Lastname"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input style={{ fontSize: '16px' }}/>
    </Form.Item>

    <Form.Item
        name="Password"
        label="Password"
        className="password-textbox "
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password style={{ fontSize: '16px' }}/>
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        className="confirm-textbox"
        dependencies={['Password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('Password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password style={{ fontSize: '16px' }}/>
      </Form.Item>

    <Form.Item
      className = "email-textbox"
      label="Email"
      name="Email"
      rules={[
        {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },
        {
          required: true,
          message: 'Please input your E-mail!',
        },
      ]}
    >
      <Input style={{ fontSize: '16px' }}/>
    </Form.Item>

    <Form.Item
      className = "phone-textbox"
      label="Telephone"
      name="Tel"
      rules={[{ required: true, message: 'Please input your telephone number!' }]}
    >
      <Input style={{ fontSize: '16px' }}/>
    </Form.Item>

    <Form.Item
      className = "address-textbox"
      label="Address"
      name="address"

      rules={[{ required: true, message: 'Please input your address!' }]}
    >
      <Input style={{ fontSize: '16px' }}/>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" className = "Create-button" htmlType="submit">
        Create
      </Button>
    </Form.Item>
  </Form>

  <Link to="/LoginPage">
    <BackButton className="back-button-instance" />
  </Link>
  </div>
  </div>
  </div> 
  );

};

