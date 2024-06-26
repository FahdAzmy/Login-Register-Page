import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";

export default function Dashboard() {
  return (
    <div>
      <TopBar />
      <div className="content-flex">
        <SideBar />
        <div style={{ margin: "10px auto" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
