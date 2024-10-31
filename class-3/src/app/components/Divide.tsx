"use client"

import { useCounterStore } from "@/store/counter-store"

const Divide = () => {
    const num1 = useCounterStore(store => store.num1)
    const num2 = useCounterStore(store => store.num2)
  return (
   <h1 className="text-center text-2xl font-semibold">Division of both number: {num1 / num2}</h1>
  )
}

export default Divide