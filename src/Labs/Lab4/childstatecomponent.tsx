import { Button} from "react-bootstrap";
export default function ChildStateComponent({
    counter,
    setCounter
   } : {
    counter: number;
    setCounter: (counter: number) => void;
   }) {
     return (
       <div id="wd-child-state">
         <h3>Counter {counter}</h3>
         <Button variant="success" onClick={() => setCounter(counter + 1)} id="wd-increment-child-state-click">
           Increment</Button>
         <Button variant="danger" onClick={() => setCounter(counter - 1)} id="wd-decrement-child-state-click">
           Decrement</Button>
         <hr/>
       </div>
   );}
   