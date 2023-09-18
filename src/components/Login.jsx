import { Form, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faL } from "@fortawesome/free-solid-svg-icons";
import { loginAPI } from "../services/UserService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Missing email or password !!!");
      return;
    }

    const res = await loginAPI(email, password);
    if (res && res.token) {
      localStorage.setItem("token", res.token);
      navigate("/manage-user");
    } else {
      if (res && res.response && res.response.status === 400) {
        toast.error(res.response.data.error);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center flex-column align-items-center gap-2">
      <div className="login-container">
        <div className="login-title">
          <h1>Log in</h1>
        </div>
        <div className="login-content">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Form.Group>

            <Button
              className="w-100"
              variant="primary"
              type="submit"
              onClick={(event) => handleLogin(event)}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
      <div className="login-footer">
        <p className="d-flex align-items-center gap-1">
          <FontAwesomeIcon icon={faAnglesLeft} />
          <NavLink className="nav-link" to="/">
            Go back
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
