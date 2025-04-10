import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./greencheckmark";
import { Button, Dropdown } from "react-bootstrap";
import { CiNoWaitingSign } from "react-icons/ci";
import ModuleEditor from "./moduleeditor";
import { useState } from "react";

export default function ModulesControls(  { moduleName, setModuleName, addModule }:
  { moduleName: string; setModuleName: (title: string) => void; addModule: () => void; }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 return (
   <div id="wd-modules-controls" className="text-nowrap">
    
     <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn" onClick={handleShow} >
       <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       Module
     </Button>
     <ModuleEditor show={show} handleClose={handleClose} dialogTitle="Add Module"
       moduleName={moduleName} setModuleName={setModuleName} addModule={addModule} />
     <Dropdown className="float-end me-2">
       <Dropdown.Toggle variant="secondary" size="lg" id="wd-publish-all-btn">
         <GreenCheckmark /> Publish All
       </Dropdown.Toggle>
       <Dropdown.Menu>
         <Dropdown.Item id="wd-publish-all">
           <GreenCheckmark /> Publish All
         </Dropdown.Item>
         <Dropdown.Item id="wd-publish-all-modules-and-items">
           <GreenCheckmark /> Publish all modules and items
         </Dropdown.Item>
         <Dropdown.Item id="wd-publish-modules-only">
           <GreenCheckmark /> Publish modules only
         </Dropdown.Item>
         <Dropdown.Item id="wd-unpublish-all-modules-and-items">
           <CiNoWaitingSign /> Unpublish all modules and items
         </Dropdown.Item>
         <Dropdown.Item id="wd-unpublish-modules-only">
           <CiNoWaitingSign /> Unpublish modules only
         </Dropdown.Item>
       </Dropdown.Menu>
     </Dropdown>
     <Button variant="light" size="lg" className="me-1 float-end" id="wd-view-progress">
       View Progress
     </Button>
     <Button variant="light" size="lg" className="me-1 float-end" id="wd-collapse-all">
       Collapse All
     </Button>
   </div>
);}
