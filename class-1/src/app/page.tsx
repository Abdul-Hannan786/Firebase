"use client";

import { UseAuthContext } from "@/Context/AuthContext";
import { signOutAtHome } from "@/Firebase/firebaseauth";
import { fetchTodos, saveTodo } from "@/Firebase/firebasefirestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { user } = UseAuthContext();
  const [todo, setTodo] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const addTodo = () => {
    saveTodo(todo, isComplete);
    setTodo("");
    setIsComplete(false) 
  };

  useEffect(() => {
    if (!user) {
      router.push("./signin");
    }

    fetchTodos()
  }, [router, user, isComplete]);
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

      <label htmlFor="iscomplete">Is Complete</label>
      <input
        type="checkbox"
        id="iscomplete"
        onChange={(e) => setIsComplete(e.target.checked)} 
        checked={isComplete}
      />

      <br />
      <br />
      <button
        onClick={() => {
          addTodo();
        }}
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
