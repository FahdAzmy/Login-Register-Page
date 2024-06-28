import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./components/Forms/Form";

export default function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const id = window.location.pathname.split("/").slice(-1)[0];
  //Get Data From Api
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data[0].name);
        setEmail(data[0].email);
      });
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Update User</h1>
      <div className="father">
        <Form
          button="Update"
          name={name}
          email={email}
          endpoint={`user/update/${id}`}
          navigate="dashboard/users"
          HasLocalStorage={false}
        />
      </div>
    </>
  );
}
