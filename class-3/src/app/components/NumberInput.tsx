"use client";

import { useCounterStore } from "@/store/counter-store";
import React, { useState } from "react";

const NumberInput = () => {
    const num1Val = useCounterStore(store => store.num1)
    const num2Val = useCounterStore(store => store.num2)
    const modifyAllNum = useCounterStore(store => store.modifyAllNum)
  const [num1, setNum1] = useState(num1Val);
  const [num2, setNum2] = useState(num2Val);
  return (
    <div className="p-10">
      <label htmlFor="num1">
        Num 1 : {" "}
        <input
          id="num1"
          type="text"
          className="border-2 rounded-md mt-3 p-2"
          value={num1}
          onChange={(e) => setNum1(Number(e.target.value))}
        />
      </label>
      <br />
      <label htmlFor="num2">
        Num 2 : {" "}
        <input
          id="num2"
          type="text"
          className="border-2 rounded-md mt-3 p-2"
          value={num2}
          onChange={(e) => setNum2(Number(e.target.value))}
        />
      </label>
      <br />
      <button onClick={() => {modifyAllNum(num1, num2)}} className="bg-black text-white p-3 rounded-md mt-3 font-semibold">
        Update in Store
      </button>
    </div>
  );
};

export default NumberInput;
