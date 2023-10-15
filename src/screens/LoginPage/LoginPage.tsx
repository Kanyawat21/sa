import React, { useState } from "react";
import {Link, NavigateOptions, useNavigate,} from "react-router-dom";
import { Buttonn } from "../../components/Button";
import { MaidLogoWhite } from "../../components/MaidLogoWhite";
import "./style.css";
import { BackButton2 } from "../../components/BackButton/BackButton";
import { UserOutlined } from '@ant-design/icons';
import { Form, Input, Space, message,Button } from 'antd';
import { UsersInterface } from "../../interfaces/IData";
import { ListUsers } from "../../services/http";
import GetId from "../../services/userid";

export const LoginPage = (): JSX.Element => {
  const navigate = useNavigate();
  const onFinish = async (values: UsersInterface) => {
    let res = await ListUsers(values);
    if (res.message==="User Not found") {
        message.error("User not found. Please check your credentials.");
    } else if (res.message==="invalid password") {
        message.error("Invalid password. Please try again.");
    } else {
        if (res.status) {
            message.success("Welcome!");
            setTimeout(function () {
              navigate(`/HomePage2?id=${res.message.ID}`, { state: { id: res.message.ID } });
          }, 2000);
        } else {
            // message.error("An error occurred. Please try again.");
            message.error(`error, Status: ${res.status}`);
        }
    }
};
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="login-page">
      <div className="div">
        <MaidLogoWhite className="maid-logo-white-instance" />
        <div className="overlap">
        <div className="flexcontainer">
        <p className="text">
        <span className="text-wrapper-welcome">Welcome</span>
        </p>
        <p className="text">
        <span className="span">Login your account to continue</span>
        </p>
        </div>
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="UserName"
            className="username-textbox"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input style={{ fontSize: '18px' }} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="Password"
            className="password-textbox"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password  style={{ fontSize: '18px' }}/>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" className="login-button" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className="text-wrapper-signup">Don't have an account?</div>

        <Link to="/SignUpPage">
          <div className="text-wrapper-3">Sign Up</div>
        </Link>

        <Link to="/">
          <BackButton2 className="back-button-instance" />
        </Link>
        </div>
      </div>
    </div>
  );
};
 