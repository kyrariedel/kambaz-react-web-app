// import React, { useState } from "react";
// import { ListGroup } from "react-bootstrap";
// import TodoForm from "./todoform";
// import TodoItem from "./todoitem";
// export default function TodoList() {
//   const [todos, setTodos] = useState([
//     { id: "1", title: "Learn React" },
//     { id: "2", title: "Learn Node"  }]);
//   const [todo, setTodo] = useState({ id: "-1", title: "Learn Mongo" });
//   const addTodo = (todo: any) => {
//     const newTodos = [ ...todos, { ...todo,
//       id: new Date().getTime().toString() }];
//     setTodos(newTodos);
//     setTodo({id: "-1", title: ""});
//   };
//   const deleteTodo = (id: string) => {
//     const newTodos = todos.filter((todo) => todo.id !== id);
//     setTodos(newTodos);
//   };
//   const updateTodo = (todo: any) => {
//     const newTodos = todos.map((item) =>
//       (item.id === todo.id ? todo : item));
//     setTodos(newTodos);
//     setTodo({id: "-1", title: ""});
//   };
//   return (
//     <div>
//       <h2>Todo List</h2>
//       <ListGroup>
//         <TodoForm
//             todo={todo}
//             setTodo={setTodo}
//             addTodo={addTodo}
//             updateTodo={updateTodo}/>
//             {todos.map((todo) => (
//             <TodoItem
//                 todo={todo}
//                 deleteTodo={deleteTodo}
//                 setTodo={setTodo} />
//             ))}
//       </ListGroup><hr/>
// </div>);}

import React from "react";
import TodoForm from "./todoform";
import TodoItem from "./todoitem";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
export default function TodoList() {
  const { todos } = useSelector((state: any) => state.todosReducer);
  return (
    <div id="wd-todo-list-redux">
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo: any) => (
          <TodoItem todo={todo} />
        ))}
      </ListGroup>
      <hr/>
    </div>
);}
