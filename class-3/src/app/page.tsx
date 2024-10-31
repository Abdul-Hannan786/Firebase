import Divide from "./components/Divide";
import Multiply from "./components/Multiply";
import NumberInput from "./components/NumberInput";
import Subtract from "./components/Subtract";
import Sum from "./components/Sum";



export default function Home() {
  return (
    <>
     <NumberInput /> 
     <Sum />
     <Subtract />
     <Multiply />
     <Divide />
    </>
  );
}
