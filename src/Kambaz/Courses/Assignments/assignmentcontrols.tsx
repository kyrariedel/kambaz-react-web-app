import { FaSearch } from "react-icons/fa";
import { Button, FormGroup, FormControl} from "react-bootstrap";

export default function AssignmentControls() {
 return (
   <div id="wd-modules-controls" className="text-nowrap">
     <Button variant="light" size="lg" className="me-1 float-end" id="wd-view-progress">
       Group
     </Button>
     <FormGroup className="mb-3" controlId="wd-email">
        <FormControl type="string" placeholder="Search..." style={{ paddingLeft: '30px', width: '200px' }}/>
        <FaSearch className="position-relative me-2" style={{ top: '50%', left: '10px', marginTop: '-60px'}} />
        </FormGroup>
   </div>
);}