"use client";

import { UseAuthContext } from "@/Context/AuthContext";
import { signOutAtHome } from "@/Firebase/firebaseauth";
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
      <button
        onClick={signOutAtHome}
        style={{
          color: "white",
          padding: "9px",
          backgroundColor: "blue",
          border: "none",
          borderRadius: "10px",
          width: "20vw",
          fontWeight: "700"
        }}
      >
        Sign Out
      </button>
    </>
  );
}
