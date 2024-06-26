import { useState } from "react";
import axios from "axios";
import Header from "./components/Header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState("");
  function emialHandler(e) {
    setEmail(e.target.value);
  }
  async function Submit(e) {
    let flag = true;
    e.preventDefault();
    setAccept(true);
    if (password.length < 8) {
      flag = false;
    } else {
      flag = true;
    }
    try {
      if (flag) {
        // Send data
        let res = await axios.post("http://127.0.0.1:8000/api/login", {
          email: email,
          password: password,
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
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            value={email}
            onChange={emialHandler}
            type="email"
            placeholder="Email... "
            required
          />
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
          <div style={{ textAlign: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
