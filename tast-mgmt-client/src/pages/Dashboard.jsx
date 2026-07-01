import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
  
          <main className="p-4 w-100 bg-light" style={{ minHeight: "100vh" }}>
          <Outlet />
        </main>
        
  );
};

export default Dashboard;