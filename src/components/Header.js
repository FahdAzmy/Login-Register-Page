import { Link } from "react-router-dom";
export default function Header() {
  // function handleLogoOut() {
  //   window.localStorage.removeItem("email");
  //   window.location.pathname = "/";
  // }
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <h3>Home</h3>
        <h3>About</h3>
        <Link
          to="/dashboard"
          style={{ textDecoration: "none", color: "black" }}
        >
          <h3>Dashboard</h3>
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          width: "300px",
        }}
      >
        <Link
          to="/register"
          style={{ textAlign: "center" }}
          className="res-btn"
        >
          Register
        </Link>
        <Link to="/login" style={{ textAlign: "center" }} className="res-btn">
          Login
        </Link>
        : (<div className="res-btn">Log out</div>)
      </div>
    </nav>
  );
}
