import { useState } from "react";
import axios from "axios";
import Header from "./Header";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordr, setPasswordr] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState("");
  function emialHandler(e) {
    setEmail(e.target.value);
  }
  async function Submit(e) {
    let flag = true;
    e.preventDefault();
    setAccept(true);
    if (name === "" || password.length < 8 || passwordr !== password) {
      flag = false;
    } else {
      flag = true;
    }
    try {
      if (flag) {
        // Send data
        let res = await axios.post("http://127.0.0.1:8000/api/register", {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordr,
        });
        if (res.status === 200) {
          window.localStorage.setItem("email", email);
          window.location.pathname = "/";
        }
      }
    } catch (error) {
      setEmailError(error.response.status);
    }
  }

  return (
    <div>
      <Header />
      <div className="father">
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
          {name === "" && accept && <p>Usernam is Required</p>}
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            value={email}
            onChange={emialHandler}
            type="email"
            placeholder="Email... "
            required
          />
          {accept && emailError === 422 && <p>Email already exist</p>}
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
          {passwordr !== password && accept && <p>Pasword doesn't Match</p>}
          <div style={{ textAlign: "center" }}>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}
