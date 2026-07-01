import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaTasks,
  FaPlusCircle,
  FaUsers,
  FaUser,
} from "react-icons/fa";
import { getUserInfo } from "../api/api";

const Asidebar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const data = await getUserInfo();
      setUser(data.loggedUser);
    } catch (err) {
      console.log(err);
    }
  };

  const userMenus = [
  {
      title: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      title: "All Tasks",
      path: "/dashboard/all-tasks",
      icon: <FaTasks />,
    },
    {
      title: "Create Task",
      path: "/dashboard/create-task",
      icon: <FaPlusCircle />,
    },
    {
      title: "Users",
      path: "/dashboard/users",
      icon: <FaUsers />,
    },
    {
      title: "My Tasks",
      path: "/dashboard/my-tasks",
      icon: <FaTasks />,
    },
    {
      title: "Profile",
      path: "/dashboard/profile",
      icon: <FaUser />,
    },
  ];

  const adminMenus = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      title: "All Tasks",
      path: "/dashboard/all-tasks",
      icon: <FaTasks />,
    },
    {
      title: "Create Task",
      path: "/dashboard/create-task",
      icon: <FaPlusCircle />,
    },
    {
      title: "Users",
      path: "/dashboard/users",
      icon: <FaUsers />,
    },
    {
      title: "My Tasks",
      path: "/dashboard/my-tasks",
      icon: <FaTasks />,
    },
    {
      title: "Profile",
      path: "/dashboard/profile",
      icon: <FaUser />,
    },
  ];

  const menus = user?.role === "admin" ? adminMenus : userMenus;

  return (
    <aside
      style={{
        width: "230px",
        minHeight: "100vh",
        backgroundColor: "#1f2329",
        color: "#fff",
        borderRight: "1px solid #2f343d",
      }}
    >
      <div className="p-3">

        {/* Menu Heading */}
        <h6
          className="mb-4"
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#ffffff",
          }}
        >
          Menu
        </h6>

        {/* Menu Items */}
        {menus.map((menu, index) => (
          <NavLink
            key={index}
            to={menu.path}
            end={menu.path === "/dashboard"}
            className={({ isActive }) =>
              `d-flex align-items-center text-decoration-none px-3 py-2 mb-2 rounded ${
                isActive ? "active-menu" : "menu-item"
              }`
            }
          >
            <span
              style={{
                width: "22px",
                fontSize: "15px",
              }}
            >
              {menu.icon}
            </span>

            <span
              style={{
                fontSize: "14px",
              }}
            >
              {menu.title}
            </span>
          </NavLink>
        ))}
      </div>

      {/* CSS */}
      <style>{`
        .menu-item{
          color:#ffffff;
          transition:0.3s;
        }

        .menu-item:hover{
          background:#2d333b;
          color:#ffffff;
        }

        .active-menu{
          background:#0d6efd;
          color:#ffffff;
        }

        .active-menu:hover{
          color:#ffffff;
        }

        a{
          text-decoration:none;
        }
      `}</style>
    </aside>
  );
};

export default Asidebar;