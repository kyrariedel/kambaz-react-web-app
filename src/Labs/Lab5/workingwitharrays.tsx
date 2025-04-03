const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
import { useState } from "react";
import { FormControl } from "react-bootstrap";
import { Button, FormCheck } from "react-bootstrap";
export default function WorkingWithArrays() {
  const API = `${REMOTE_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({id: "1", title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,});
    const updateDescription = () => {
        fetch(`${API}/${todo.id}/description/${encodeURIComponent(todo.description)}`, {
          method: "PUT",
        }).then(() => alert(`Updated description of Todo ID = ${todo.id}`));
      };
    
      const updateCompleted = () => {
        fetch(`${API}/${todo.id}/completed/${todo.completed}`, {
          method: "PUT",
        }).then(() => alert(`Updated completion status of Todo ID = ${todo.id}`));
      };
  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos </a><hr/>
      <h4>Retrieving an Item from an Array by ID</h4>
      <a id="wd-retrieve-todo-by-id" className="btn btn-primary float-end" href={`${API}/${todo.id}`}>
        Get Todo by ID
      </a>
      <FormControl id="wd-todo-id" defaultValue={todo.id} className="w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })} />
      <hr />
      <h3>Filtering Array Items</h3>
        <a id="wd-retrieve-completed-todos" className="btn btn-primary"
            href={`${API}?completed=true`}>
            Get Completed Todos
        </a><hr/>
        <h3>Creating new Items in an Array</h3>
        <a id="wd-retrieve-completed-todos" className="btn btn-primary"
            href={`${API}/create`}>
            Create Todo
        </a><hr/>
        <h5>Edit Description</h5>
      <FormControl
        id="wd-todo-description"
        className="w-50"
        placeholder="New Description"
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <Button id="wd-update-description" className="btn btn-primary mt-2" onClick={updateDescription}>
        Update Description
      </Button>
      <hr />

      <h5>Mark as Completed</h5>
      <FormCheck
        id="wd-todo-completed"
        label="Completed"
        checked={todo.completed}
        onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
      />
      <Button id="wd-update-completed" className="btn btn-primary mt-2" onClick={updateCompleted}>
        Update Completed
      </Button>
      <hr />
        <h3>Deleting from an Array</h3>
        <a id="wd-retrieve-completed-todos" className="btn btn-primary float-end" href={`${API}/${todo.id}/delete`}>
        Delete Todo with ID = {todo.id} </a>
        <FormControl defaultValue={todo.id} className="w-50" onChange={(e) => setTodo({ ...todo, id: e.target.value })}/><hr/>
        <h3>Updating an Item in an Array</h3>
      <a href={`${API}/${todo.id}/title/${todo.title}`} className="btn btn-primary float-end">
        Update Todo</a>
      <FormControl defaultValue={todo.id} className="w-25 float-start me-2"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}/>
      <FormControl defaultValue={todo.title} className="w-50 float-start"
             onChange={(e) => setTodo({ ...todo, title: e.target.value }) }/>
      <br /><br /><hr />
    </div>
);}
