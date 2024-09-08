"use client";

import {
  loginWithEmailPassword,
  signupWithEmailPassword,
} from "@/Firebase/firebaseauth";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <h1>Hello Auth</h1>
      <label htmlFor="email">Email: </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <br />
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <br />
      <button
        onClick={() => {
          signupWithEmailPassword(email, password);
        }}
      >
        SignUp
      </button>
      <br />
      <br />
      <button
        onClick={() => {
          loginWithEmailPassword(email, password);
        }}
      >
        Login
      </button>
    </>
  );
}
