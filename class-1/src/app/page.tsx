"use client";

import { UseAuthContext } from "@/Context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
 const router = useRouter()
 const {user} = UseAuthContext()

 useEffect(() => {
  if(!user){
    router.push("./signin")
  }
 }, [router, user])
  return (
    <>
      <h1>Home Page</h1>
    </>
  );
}
