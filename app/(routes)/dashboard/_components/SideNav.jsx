"use client";
import { UserButton } from "@clerk/nextjs";
import {
  Key,
  LayoutDashboardIcon,
  PiggyBankIcon,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutDashboardIcon,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBankIcon,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
    },
  ];

  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <div className="h-screen p-5 shadow-sm border">
    
      <Image src={"/logo.svg"} alt="logo" width={50} height={100} />
      <div className=" mt-5">
        {menuList.map((menu) => (
          <Link href={menu.path} key={menu.id}>
            <h2
              className={`flex gap-2 items-center text-black font-medium p-5 cursor-pointer rounded-md hover:bg-[#FFB4B4] hover:text-black ${
                pathname == menu.path && "text-white bg-[#ED3500] "
              }`}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 p-5 flex gap-2 items-center rounded-md font-medium">
        <UserButton /> Profile
      </div>
    </div>
  );
}

export default SideNav;
