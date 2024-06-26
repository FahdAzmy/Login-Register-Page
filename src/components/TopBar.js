import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <div className="d-flex top-bar">
      <h1> Store</h1>
      <Link to="/" className="res-btn">
        Go to Wepsite
      </Link>
    </div>
  );
}
