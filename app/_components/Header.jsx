import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {

  const {user, isSignedIn} = useUser
  return (
    <div className="p-5 flex justify-between items-center bg-amber-300 border shadow-2xl">
      <Image src={"./logo.svg"} alt="Logo" width={40} height={40} />

      {isSignedIn ? 
        <useUser/> :
        <Link href={'/sign-in'}>
        <Button className= "">Sign In</Button>
        </Link> 
      }
      
    </div>
  );
}

export default Header;
