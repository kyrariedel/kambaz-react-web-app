import VariablesAndConstants from "./variablesandconstants";
import VariableTypes from "./variabletypes";
import BooleanVariables from "./booleanvariables";
import IfElse from "./ifelese";
import TernaryOperator from "./ternaryoperator";
import ConditionalOutputIfElse from "./conditionaloutputifelse";
import ConditionalOutputInline from "./conditionaloutputinline";
import LegacyFunctions from "./legacyfunctions";
import ArrowFunctions from "./arrowfunctions";
import ImpliedReturn from "./impliedreturn";
import TemplateLiterals from "./templateliterals";
import SimpleArrays from "./simplearrays";
import ArrayIndexAndLength from "./arrayindexandlength";
import AddingAndRemovingToFromArrays from "./addingandremovingtofromarrays";
import ForLoops from "./forloops";
import MapFunction from "./mapfunction";
import FindFunction from "./findfunction";
import FindIndex from "./findindex";
import FilterFunction from "./filterfunction";
import Destructing from "./destructing";
import DestructingImports from "./destructingimports";
import FunctionDestructing from "./functiondestructing";
import Spreading from "./spreading";
import House from "./house";
import Classes from "./classes";
import Styles from "./styles";
import Add from "./add";
// import Square from "./square";
import Highlight from "./highlight";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";


export default function Lab3() {
  console.log('Hello World!');
  const { todos } = useSelector((state: any) => state.todosReducer);
  return(
    <div id="wd-lab3">
      <h3>Lab 3</h3>
      <ListGroup>
        {todos.map((todo: any) => (
          <ListGroup.Item key={todo.id}>
            {todo.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <hr />
      <VariablesAndConstants/>
      <VariableTypes/>
      <BooleanVariables/>
      <IfElse/>
      <TernaryOperator/>
      <ConditionalOutputIfElse/>
      <ConditionalOutputInline/>
      <LegacyFunctions/>
      <ArrowFunctions/>
      <ImpliedReturn/>
      <TemplateLiterals/>
      <SimpleArrays/>
      <ArrayIndexAndLength/>
      <AddingAndRemovingToFromArrays/>
      <ForLoops/>
      <MapFunction/>
      <FindFunction/>
      <FindIndex/>
      <FilterFunction/>
      <Destructing/>
      <DestructingImports/>
      <FunctionDestructing/>
      <Spreading/>
      <House/>
      <Classes/>
      <Styles/>
      <Add a={3} b={4} />
      <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
        vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
     </Highlight>
    </div>
  );
}
