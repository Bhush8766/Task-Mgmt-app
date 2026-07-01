import React, { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../api/api";

const Navbar = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await getUserInfo();

      console.log(res);

      setUser(res.loggedUser);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-dark px-3"
      style={{
        background: "#2f6fed",
        height: "60px",
      }}
    >
      <span
        className="navbar-brand fw-bold text-white m-0"
        style={{ fontSize: "20px" }}
      >
        TaskMGMT
      </span>

      <div className="d-flex align-items-center ms-auto">

        <img
          src={
            user?.imgPath
              ? user.imgPath.startsWith("http")
                ? user.imgPath
                : `http://localhost:7005${user.imgPath}`
              : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="Profile"
          width="40"
          height="40"
          className="rounded-circle border border-white me-2"
          style={{
            objectFit: "cover",
          }}
        />

        <span
          className="text-white me-3"
          style={{
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          {user?.name || "User"}
        </span>

        <button
          className="btn btn-light btn-sm"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="me-1" />
          Logout
        </button>

      </div>
    </nav>
  );
};

export default Navbar;