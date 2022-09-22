import { Form } from "antd";
import Input from "antd/lib/input/Input";
import { Link } from "react-router-dom";

const AuthForm = ({
	onFinish,	
	page
}) => (
	<Form layout="vertical" onFinish={onFinish}>
        <h1>{page}</h1>   
        { page !== "Login" && ( 
	        <>
		        <Form.Item label="First Name" name="firstname" rules={[{ required: true }]}>
		          <Input />
		        </Form.Item>
		        <Form.Item label="Last Name" name="lastname" rules={[{ required: true }]}>
		          <Input />
		        </Form.Item>
	        </>
        )}
        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
          <Input type="password" />
        </Form.Item>
        { page === "Login" && ( 
	        <div className="d-flex justify-content-between align-items-center">
	          <em>Please login with your credentials.</em>
	          <button className="secondary" type="submit">
	            LOGIN
	          </button>
	        </div>
        )}
        { page !== "Login" && ( 
	        <div className="d-flex justify-content-between align-items-center">
              <Link to="/login">Already registered? Click here to login</Link>
              <button className="secondary" type="submit">
                REGISTER
              </button>
            </div>
        )}
    </Form>
);

export default AuthForm;
