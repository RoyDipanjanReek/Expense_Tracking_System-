'use client'
import React from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";


function DashboardLauout({ children }) {
 
{/**
  fixed hidden md:w-64 md:block
  */}
  return (
    <div>
      {/* Sidebar */}
      <div className="md:w-64 w-full md:fixed hidden md:block">
        <SideNav />
      </div>
       {/* Main Content */}
      <div className="md:ml-64">
      <DashboardHeader />
      {children}
      </div>

    </div>
  );
}

export default DashboardLauout;
