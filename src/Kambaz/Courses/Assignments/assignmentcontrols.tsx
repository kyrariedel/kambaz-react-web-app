import { FaSearch } from "react-icons/fa";
import { Button, FormGroup, FormControl} from "react-bootstrap";
import AssignmentEditor from "./editor";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

export default function AssignmentControls({ assignmentName, setAssignmentName, addAssignment }:
  { assignmentName: string; setAssignmentName: (title: string) => void; addAssignment: () => void; }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 return (
   <div id="wd-modules-controls" className="text-nowrap">
     <Button variant="light" size="lg" className="me-1 float-end" id="wd-view-progress">
       Group
     </Button>
     <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn" onClick={handleShow} >
       <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       Assignment
     </Button>
     <AssignmentEditor show={show} handleClose={handleClose} dialogTitle="Add Assignment"
       assignmentName={assignmentName} setAssignmentName={setAssignmentName} addAssignment={addAssignment} />
     <FormGroup className="mb-3" controlId="wd-search">
        <FormControl type="string" placeholder="Search..." style={{ paddingLeft: '30px', width: '200px' }}/>
        <FaSearch className="position-relative me-2" style={{ top: '50%', left: '10px', marginTop: '-60px'}} />
        </FormGroup>
   </div>
);}
