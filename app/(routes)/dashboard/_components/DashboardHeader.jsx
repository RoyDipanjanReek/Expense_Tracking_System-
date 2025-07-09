import { Button } from "@/components/ui/button";
import { SignedOut, useClerk } from "@clerk/nextjs";
import { LogOut, User } from "lucide-react";
import React from "react";

function DashboardHeader() {
  const {signOut} = useClerk()

  const handleLogout = async () => {
    await signOut()
  }
  return (
    <div className="p-5 border-b shadow-xl flex justify-between">
      <div></div>
      <div>
        <Button
        onClick = {handleLogout} 
        className="bg-destructive hover:bg-destructive/70 hover:cursor-pointer">
          <LogOut /> Logout
        </Button>
      </div>
    </div>
  );
}

export default DashboardHeader;
