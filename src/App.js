import "./styles.css"
import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
export const ACTIONS = {
ADD_DIGIT:'add_digit',
CLEAR:'clear',
DELETE_DIGIT:'delete_digit',
CHOOSE_OPERATION:'choose_operation',
EVALUATE:'evaluate'
}


function reducer(state,{type,payload}){
  switch(type){
  case ACTIONS.ADD_DIGIT:
    if(state.overwrite){
      return {
        ...state,
        currentOperand:payload.digit,
        overwrite:false,
      }
    } 
  if( payload.digit === "0" && state.currentOperand === "0") return state
  if( payload.digit ==='.' && state.currentOperand.includes('.') ){
    return state
  }
  return{
    ...state, 
    currentOperand:`${state.currentOperand || ""}${payload.digit}`
  }
  case ACTIONS.CLEAR:
  return {};

  case ACTIONS.CHOOSE_OPERATION:
    if(state.currentOperand == null && state.previousOperand ==  null){
      return state
    }
    
    if (state.currentOperand == null) {
      return {
        ...state,
        operation: payload.operation,
      }
    }

    if(state.previousOperand == null){
      return {
        ...state, 
        operation:payload.operation,
        previousOperand:state.currentOperand,
        currentOperand:null        
      }
    }
    
    return {
      ...state,
      previousOperand: evaluate(state),
      operation:payload.operation,
      currentOperand: null

    }
    case ACTIONS.EVALUATE:
      if(state.previousOperand ==null || state.currentOperand==null || state.operation==null){
        return state
      }
   return{
    ...state,
    previousOperand:null,
    currentOperand:evaluate(state),
    operation:null,
    overwrite:true   //overwrite flage is added...
   }
      
  }
  
}
function evaluate({currentOperand,previousOperand,operation}){
  console.log("these are operand"+previousOperand,currentOperand)
  const prev = parseFloat(previousOperand);
  const current= parseFloat(currentOperand);
  console.log(prev,current);
  if(isNaN(prev) || isNaN(current)){
    return ""
  }
  let computation="";
  switch(operation){
    case "+": 
  computation = (prev + current);
  break;
  case "-": 
  computation = (prev - current);
  break;
  case "*": 
  computation = (prev * current);
  break;
  case "/": 
  computation = (prev / current);
  break;
  }
  console.log(computation);
  console.log(computation.toString());
  return computation.toString();

}
function App() {
  
 const [{currentOperand,previousOperand,operation},dispatch] = useReducer(reducer,{});
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand}{operation}</div>
        <div className="next-operand">{currentOperand}</div>
        </div>
        <button className="span-2" onClick={()=>{ dispatch({type:ACTIONS.CLEAR})}} >AC</button>
        <button>DEL</button>
        <OperationButton dispatch={dispatch} operation="/"/>
        <DigitButton dispatch={dispatch} digit="1"/>
        <DigitButton dispatch={dispatch} digit="2"/>
        <DigitButton dispatch={dispatch} digit="3"/>

        <OperationButton dispatch={dispatch} operation="*"/>
        <DigitButton dispatch={dispatch} digit="4"/>
        <DigitButton dispatch={dispatch} digit="5"/>
        <DigitButton dispatch={dispatch} digit="6"/>
        
        <OperationButton dispatch={dispatch} operation="+"/>
        <DigitButton dispatch={dispatch} digit="7"/>
        <DigitButton dispatch={dispatch} digit="8"/>
        <DigitButton dispatch={dispatch} digit="9"/>
        
        <OperationButton dispatch={dispatch} operation="-"/>
        <DigitButton dispatch={dispatch} digit="."/>
        <DigitButton dispatch={dispatch} digit="0"/>
        <button className="span-2" onClick={()=>{dispatch({type:ACTIONS.EVALUATE})}}>=</button>
    </div>
  );
}

export default App;
