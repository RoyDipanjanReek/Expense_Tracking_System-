import { UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";
import React from "react";

function DashboardHeader() {
  return (
    <div className="p-5 border-b shadow-xl flex justify-between">
      <div>Search Bar</div>
      <div>
        <UserButton />
      </div>
    </div>
  );
}

export default DashboardHeader;
