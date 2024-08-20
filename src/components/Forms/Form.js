import { useContext, useEffect, useState } from "react";
import axios from "axios";
// import "./form.css";
import { user } from "../../Context/Context";
export default function Form(props) {
  let page = `${props.page}`;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordr, setPasswordr] = useState("");
  // const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState("");
  const userNow = useContext(user);
  console.log(userNow);
  // To Save State Of Email
  function emialHandler(e) {
    setEmail(e.target.value);
  }
  // To Site Email and Password In Update User Page
  useEffect(() => {
    setName(props.name);
    setEmail(props.email);
  }, [props.name, props.email]);
  // On Submit Handle Error and Send Data
  async function Submit(e) {
    // Send Data After First Submit
    e.preventDefault();
    // setAccept(true);
    // Make Sure Data Will Be True to Send To Data Base
    // if (name === "" || password.length < 8 || passwordr !== password) {
    //   flag = false;
    // } else {
    //   flag = true;
    // }
    try {
      //IF True Send The Data
      // Send data
      let res = await axios.post(
        `http://127.0.0.1:8000/api/${props.endpoint}`,
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordr,
        }
      );
      const token = res.data.data.token;
      const userData = res.data.data.user;
      console.log(userData);
      userNow.setAuth([token, userData]);
      // Save Email In Local Storage To be Login and Go to Home Page
      // if (res.status === 200) {
      //   props.hasLocalStorage && window.localStorage.setItem("email", email);
      //   window.location.pathname = `/${props.navigate}`;
      // }
    } catch (error) {
      // Catch Error Of Email
      if (page === "Sign up") {
        setEmailError(error.response.status);
      }
    }
  }
  return (
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
        {/* {name === "" && accept && <p>Usernam is Required</p>} */}
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          value={email}
          onChange={emialHandler}
          type="email"
          placeholder="Email... "
          required
        />
        {/* If Email Taken Or Not */}
        {/* {accept && emailError === 422 && <p>Email already exist</p>} */}
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
        {/* {password.length < 8 && accept && (
          <p>Paswrod must be more than 8 Char</p>
        )} */}
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
          <button type="submit">{props.button}</button>
        </div>
      </form>
    </div>
  );
}
