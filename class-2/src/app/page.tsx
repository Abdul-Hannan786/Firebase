"use client";

import { auth, signOutAtHome } from "@/Firebase/firebaseauth";
import { saveExpense } from "@/Firebase/firebasefirestore";
import { onAuthStateChanged } from "firebase/auth";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [note, setNote] = useState("");
  const date = new Date(). toDateString()

  const addExpense = () => {
    if(title.trim() !== "" && amount.trim() !== ""){
      saveExpense({
        title, amount, category, note, date,
        userID: ""
      })
    }
    else{
      alert("Please fill all the fields")
    }
    setTitle("")
    setAmount("")
    setNote("")
    setCategory("")
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
      } else {
        router.push("./signin");
      }
    });
  }, []);

  return (
    <>
      <h1>Home Page</h1>
      <input
        type="text"
        placeholder="Enter Your Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Enter Your Amount"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <br />
      <br />
      <label htmlFor="category">Select Your Category </label>
      <select
        id="category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Education">Education</option>
        <option value="Investments">Investments</option>
        <option value="Luxuries">Luxuries</option>
        <option value="Others">Others</option>
      </select>
      <br />
      <br />
      <textarea
        placeholder="Optional Note"
        value={note}
        onChange={(e) => {
          setNote(e.target.value);
        }}
      ></textarea>
      <br />
      <br />
      <button onClick={addExpense}>Create Expense</button>
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
