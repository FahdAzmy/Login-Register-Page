import Header from "./components/Header";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./components/form.css";
import { user } from "./Context/Context";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  // const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const userNow = useContext(user);
  console.log(userNow);
  const nav = useNavigate();
  // On Submit Handle Error and Send Data
  async function Submit(e) {
    // Send Data After First Submit
    e.preventDefault();
    try {
      //IF True Send The Data
      // Send data
      let res = await axios.post(`http://127.0.0.1:8000/api/login`, {
        email: email,
        password: password,
      });
      const token = res.data.data.token;
      const userData = res.data.data.user;
      console.log(userData);
      userNow.setAuth({ token, userData });
      nav("/dashboard");
    } catch (error) {
      // Catch Error Of Email
      if (error.response.status === 401) {
        setEmailError(true);
      }
      setAccept(true);
    }
  }
  return (
    <div>
      <Header />
      <div className="father">
        {" "}
        <form className="son" onSubmit={Submit}>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email... "
            required
          />
          {/* If Email Taken Or Not */}
          <label htmlFor="password">Password: </label>
          <input
            id="pasword"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password... "
          />
          {password.length < 8 && accept && (
            <p>Paswrod must be more than 8 Char</p>
          )}
          {accept && emailError && <p>Wrong Email Or Password</p>}

          <div style={{ textAlign: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
