import AssignmentControls from "./assignmentcontrols";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./modulecontrolbuttons";
import AssignmentControlButtons from "./assignmentcontrolbuttons";

export default function Assignments() {
    return (
      <div>
      <AssignmentControls /><br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-module">
        <ListGroup.Item className="wd-assignments p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary"> <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS 40% of Total<ModuleControlButtons /> </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-assignment1 p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
            <a href="#/Kambaz/Courses/1234/Assignments/123" className="wd-assignment-link">
                A1
              </a>
              <br />
              Multiple Modules | <strong>Not available until</strong> May 6 at 12:00am |
              <strong>Due</strong> May 13 at 11:59pm | 100 pts
              <AssignmentControlButtons /> </ListGroup.Item>
              
            <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
            <a href="#/Kambaz/Courses/1234/Assignments/234" className="wd-assignment-link">
              A2 </a><br />
              Multiple Modules | <strong>Not available until</strong> May 13 at 12:00am | <strong>Due</strong> May 20 at 11:59pm | 100 pts<AssignmentControlButtons /> </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
            <a href="#/Kambaz/Courses/1234/Assignments/345"
               className="wd-assignment-link" >
              A3
            </a><br />
            Multiple Modules | <strong>Not available until</strong> May 20 at 12:00am | <strong>Due</strong> May 27 at 11:59pm | 100 pts  <AssignmentControlButtons /> </ListGroup.Item>
              </ListGroup>
        </ListGroup.Item>
      </ListGroup>
  </div>
  );}
  