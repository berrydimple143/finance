import { message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from '../components/forms/AuthForm';
import "../resources/authentication.css";
import axios from "axios";
import Spinner from "../components/Spinner";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post("/api/register", values);   
      setLoading(false);
      message.success("User registered successfully.");
      navigate("/");
    } catch(err) {
      message.error("User registration failed.");
      setLoading(false);
    }
  };

  return (
    <div className="register">
      {loading && <Spinner />}      
      <div className="row justify-content-center align-items-center w-100 h-100">   
        <div className="col-md-12">
          <h2 className="text-center animate-this">BMBC Finance System</h2>
        </div>
        <div className="col-md-5">
          <div className="lottie">          
            <lottie-player
              src="https://assets7.lottiefiles.com/packages/lf20_uonpv3qg.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
        <div className="col-md-4">
          <AuthForm
            onFinish={onFinish}                     
            page={"Register"}
           />          
        </div>        
      </div>
    </div>
  );
}

export default Register;
