"use client";

import { signupWithEmailPassword } from "@/Firebase/firebaseauth";
import Link from "next/link";
import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <input
        type="text"
        placeholder="Enetr Your email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <br />
      <input
        type="password"
        placeholder="Enter Your Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <br />
      <button onClick={() => {signupWithEmailPassword(email, password)}}>Sign Up</button>
      <p>
        Already have an account?{" "}
        <span>
          <Link href={"/signin"}>Login Here</Link>
        </span>
      </p>
    </>
  );
};

export default SignUp;
