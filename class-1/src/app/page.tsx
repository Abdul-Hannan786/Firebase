"use client";

import { UseAuthContext } from "@/Context/AuthContext";
import { signOutAtHome } from "@/Firebase/firebaseauth";
import { saveTodo } from "@/Firebase/firebasefirestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { user } = UseAuthContext();
  const [todo, setTodo] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("./signin");
    }
  }, [router, user]);
  return (
    <>
      <h1>Home Page</h1>

      <input
        type="text"
        placeholder="Enter Your Todo"
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />

      <br />
      <br />

      <button
        onClick={() => {saveTodo(todo)}}
        style={{
          color: "white",
          padding: "9px",
          backgroundColor: "orange",
          border: "none",
          borderRadius: "10px",
          width: "30vw",
          fontWeight: "700",
        }}
      >
        Add New Todo
      </button>

      <br />
      <br />

      <button
        onClick={signOutAtHome}
        style={{
          color: "white",
          padding: "9px",
          backgroundColor: "blue",
          border: "none",
          borderRadius: "10px",
          width: "20vw",
          fontWeight: "700",
        }}
      >
        Sign Out
      </button>
    </>
  );
}
