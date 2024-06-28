import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="side-bar">
      <NavLink to="/dashboard/users" className="item-link">
        <h3>Users</h3>
      </NavLink>
      <NavLink to="/dashboard/users/create" className="item-link">
        <h3>New Users</h3>
      </NavLink>
    </div>
  );
}
