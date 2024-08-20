import Header from "./Header";
import "../signup.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./form.css";
import { user } from "../Context/Context";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [passwordr, setPasswordr] = useState("");
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
      let res = await axios.post(`http://127.0.0.1:8000/api/register`, {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordr,
      });
      const token = res.data.data.token;
      const userData = res.data.data.user;
      console.log(userData);
      userNow.setAuth({ token, userData });
      nav("/dashboard");
    } catch (error) {
      // Catch Error Of Email
      if (error.response.status === 422) {
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
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Name... "
          />
          {name.length < 2 && accept && (
            <p>Usernam is Required and must be More than 2 Char</p>
          )}
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
          {accept && emailError && <p>Email already exist</p>}
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
          <label htmlFor="rpassword">Repeat Password </label>
          <input
            id="rpasswrod"
            type="password"
            placeholder="Reabet Passwrod... "
            value={passwordr}
            onChange={(e) => setPasswordr(e.target.value)}
          />
          {/* {passwordr !== password && accept && <p>Pasword doesn't Match</p>} */}
          <div style={{ textAlign: "center" }}>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}
