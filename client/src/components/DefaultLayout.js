import React from "react";
import { Menu, Dropdown } from "antd";
import {useNavigate} from 'react-router-dom'
import "../resources/default-layout.css";

const DefaultLayout = (props) => {
  const ob = JSON.parse(localStorage.getItem("finance-user"));
  const user = ob.user;    
  const navigate = useNavigate()
  const menu = (
    <Menu
      items={[
        {
          label: (
            <li onClick={()=>{
              localStorage.removeItem('finance-user')
              navigate("/login");
            }}>Logout</li>
          ),
        }
      ]}
    />
  );
  return (
    <div className="layout">
      <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="logo">Bankas MBC Finance</h1>
        </div>
        <div>
          <Dropdown overlay={menu} placement="bottomLeft">
            <button className='primary'>Welcome, {user.firstname}</button>
          </Dropdown>
        </div>
      </div>

      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
