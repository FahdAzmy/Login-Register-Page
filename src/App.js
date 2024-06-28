import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SingUp";
import "./style.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import "./dashboard.css";
import Users from "./Usess";
import Home from "./home";
import UpdateUser from "./UpdateUser";
import CreateUser from "./pages/CreateUser";
function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UpdateUser />} />
          <Route path="users/create" element={<CreateUser />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
