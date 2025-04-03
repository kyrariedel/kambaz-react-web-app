import { useState } from "react";
import { FormControl, FormCheck } from "react-bootstrap";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;

    const [module, setModule] = useState({
        id: "M1", name: "React Basics",
        description: "Introduction to React and JSX",
        course: "Web Development",
    });
    const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>
            
            <h4>Modifying Assignment Properties</h4>
            <a className="btn btn-primary float-end" href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>Update Title</a>
            <FormControl className="w-75" defaultValue={assignment.title} onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}/>
            
            <a className="btn btn-primary float-end" href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>Update Score</a>
            <FormControl type="number" className="w-75" defaultValue={assignment.score} onChange={(e) => setAssignment({ ...assignment, score: Number(e.target.value) })}/>
            
            <a className="btn btn-primary float-end" href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>Update Completed</a>
            <FormCheck className="w-75" type="checkbox" checked={assignment.completed} onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })}/>
            
            <hr />

            <h4>Retrieving Assignment Data</h4>
            <a className="btn btn-primary" href={`${ASSIGNMENT_API_URL}`}>Get Assignment</a>
            <a className="btn btn-primary" href={`${ASSIGNMENT_API_URL}/title`}>Get Title</a>
            <hr />

            <h4>Modifying Module Properties</h4>
            <a className="btn btn-primary float-end" href={`${MODULE_API_URL}/name/${module.name}`}>Update Module Name</a>
            <FormControl className="w-75" defaultValue={module.name} onChange={(e) => setModule({ ...module, name: e.target.value })}/>
            
            <a className="btn btn-primary float-end" href={`${MODULE_API_URL}/description/${module.description}`}>Update Description</a>
            <FormControl className="w-75" defaultValue={module.description} onChange={(e) => setModule({ ...module, description: e.target.value })}/>
            
            <hr />

            <h4>Retrieving Module Data</h4>
            <a className="btn btn-primary" href={`${MODULE_API_URL}`}>Get Module</a>
            <a className="btn btn-primary" href={`${MODULE_API_URL}/name`}>Get Module Name</a>
        </div>
    );}
