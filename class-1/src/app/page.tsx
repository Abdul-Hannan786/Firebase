"use client";

import { auth, signOutAtHome } from "@/Firebase/firebaseauth";
import { db, saveTodo } from "@/Firebase/firebasefirestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  Unsubscribe,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [todo, setTodo] = useState("");
  const [allTodos, setAllTodos] = useState<DocumentData[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const addTodo = () => {
    saveTodo(todo, isComplete);
    setTodo("");
    setIsComplete(false);
  };
 
  // const fetchAllTodos = async () => {
  //   const fetchedData = await fetchTodos();
  //   console.log(fetchedData, "inside Home");
  //   setAllTodos(fetchedData);
  // };

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       fetchAllTodos();
  //       console.log(allTodos);
  //     } else {
  //       router.push("./signin");
  //     }
  //   });
  // }, []);

  useEffect(() => {
    const detachOnAuthListner = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchTodosRealTime();
      } else {
        router.push("./signin");
      }
    });

    return () => {
      if (readTodoRealTime) {
        console.log("Component Unmount");
        readTodoRealTime();
        detachOnAuthListner();
      }
    };
  }, []);

  let readTodoRealTime: Unsubscribe;

  const fetchTodosRealTime = () => {
    const collectionRef = collection(db, "todos");
    const currentUserUID = auth.currentUser?.uid;
    const condition = where("uid", "==", currentUserUID);
    const q = query(collectionRef, condition);
    const allTodosClone = [...allTodos];

    readTodoRealTime = onSnapshot(q, (querySnapShot) => {
      querySnapShot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const todo = change.doc.data();
          todo.id = change.doc.id;
          allTodosClone.push(todo);
          setAllTodos([...allTodosClone]);
        }
        if (change.type === "modified") {
          console.log("Data Modified")
        }
        if (change.type === "removed") {
        }
      });
    });
  };

  return (
    <>
      <Link href={"./about"}>About</Link>
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

      {allTodos.length > 0 ? (
        allTodos.map(({ todo }, index) => <h1 key={todo + index}>{todo}</h1>)
      ) : (
        <></>
      )}
    </>
  );
}
