'use client'
import React, { useEffect } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";


function DashboardLauout({ children }) {
  // const {userId, user} = useUser()
  // const router = useRouter()

  // const checkUserBudgets = async () => {
  //   const result = await Budget.find({clerkId: userId})
    
  //   if(result?.length === 0) {
  //     router.replace('/dashboard/budgets')
  //   }
  // }

  // useEffect(() => {
  //   user && checkUserBudgets
  // }, [user])

  return (
    <div>
      <div className="fixed hidden md:w-64 md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
      <DashboardHeader />
      {children}
      </div>

    </div>
  );
}

export default DashboardLauout;
