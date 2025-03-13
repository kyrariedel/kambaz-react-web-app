import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { Button, FormGroup, FormControl} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AssignmentControls({courseId}) {
 return (
   <div id="wd-modules-controls" className="text-nowrap">
     <Button as={Link} to={`/Kambaz/Courses/${courseId}/Assignments/new`} variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
       <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       Assignment
     </Button>
     <Button variant="light" size="lg" className="me-1 float-end" id="wd-view-progress">
       Group
     </Button>
     <FormGroup className="mb-3" controlId="wd-email">
        <FormControl type="string" placeholder="Search..." style={{ paddingLeft: '30px', width: '200px' }}/>
        <FaSearch className="position-relative me-2" style={{ top: '50%', left: '10px', marginTop: '-60px'}} />
        </FormGroup>
   </div>
);}