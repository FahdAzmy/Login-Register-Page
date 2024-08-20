// import axios

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { user } from "./Context/Context";

export default function Users() {
  //  Create Use State
  const [users, setUsers] = useState([]);
  const [runUseEffect, setRun] = useState(0);
  // Create Use Effect to Fetch Data
  const context = useContext(user);
  const token = context.auth.token;
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/show", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer" + token,
        },
      })
      .then((data) => setUsers(data.data));
  }, [runUseEffect]);
  // Creacte Function to Delete USer
  async function deleteUser(id) {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/user/delete/${id}`
      );
      if (res.status === 200) {
        setRun((prev) => prev + 1);
      }
    } catch {
      console.log("none");
    }
  }
  // Create show user function
  const showUsers = users.map((user, idx) => (
    <tr key={idx}>
      <td>{idx + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <Link to={`${user.id}`}>
          <i
            className="fa-solid fa-pen-to-square"
            style={{ color: "#74afb9", cursor: "pointer" }}
          ></i>
        </Link>
        <i
          onClick={() => {
            deleteUser(user.id);
          }}
          className="fa-solid fa-trash"
          style={{ color: "red", cursor: "pointer" }}
        ></i>
      </td>
    </tr>
  ));

  return (
    <div style={{ width: "100%" }}>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>User</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showUsers}</tbody>
      </table>
    </div>
  );
}
