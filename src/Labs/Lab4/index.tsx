import PassingFunctions from "./passingfunctions";
import ReduxExamples from "./ReduxExamples";
import Counter from "./counter";
import BooleanStateVariables from "./booleanstatevariables";
import StringStateVariables from "./stringstatevariables";
import DateStateVariable from "./datastatevariables";
import ObjectStateVariables from "./objectstatevariable";
import ArrayStateVariables from "./arraystatevariable";
import ParentStateComponent from "./parentstatecomponent";


export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }
  return (
    <div id="wd-passing-functions">
      <h2>Lab 4</h2>
      <Counter/>
      <BooleanStateVariables/>
      <StringStateVariables/>
      <DateStateVariable/>
      <ObjectStateVariables/>
      <ArrayStateVariables/>
      <ParentStateComponent/>
      <ReduxExamples/>
      <PassingFunctions theFunction={sayHello} />
    </div>
);}
