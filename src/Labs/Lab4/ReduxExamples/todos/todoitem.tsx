import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosreducer";
import { useSelector } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";
export default function TodoItem({ todo = useSelector((state: any) => state.todosReducer) }) {
  const dispatch = useDispatch();
  return (
    <ListGroup.Item key={todo.id}>
      <Button onClick={() => dispatch(deleteTodo(todo.id))}
              id="wd-delete-todo-click"> Delete </Button>
      <Button onClick={() => dispatch(setTodo(todo))}
              id="wd-set-todo-click"> Edit </Button>
      {todo.title}
    </ListGroup.Item>
);}
