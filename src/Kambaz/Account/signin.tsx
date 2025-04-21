import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import { FormControl, Button } from "react-bootstrap";
import * as client from "./client";
export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const signin = async () => {
  //   const user =  await client.signin(credentials);
  //   if (!user) return;
  //   dispatch(setCurrentUser(user));
  //   navigate("/Kambaz/Dashboard");
  // };

  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      if (!user) {
        // Display error message to user
        alert("Invalid username or password");
        return;
      }
      dispatch(setCurrentUser(user));
      navigate("/Kambaz/Dashboard");
    } catch (error) {
      console.error("Error during signin:", error);
      alert("An error occurred during sign in");
    }
  };
  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      <FormControl defaultValue={credentials.username}
             onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
             className="mb-2" placeholder="username" id="wd-username" />
      <FormControl defaultValue={credentials.password}
             onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
             className="mb-2" placeholder="password" type="password" id="wd-password" />
      <Button onClick={signin} id="wd-signin-btn" className="w-100" > Sign in </Button>
      <Link id="wd-signup-link" to="/Kambaz/Account/Signup"> Sign up </Link>
    </div>
);}
