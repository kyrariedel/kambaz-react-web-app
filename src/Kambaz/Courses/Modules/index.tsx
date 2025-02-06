import ModulesControls from "./modulescontrols";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./modulecontrolbuttons";
import LessonControlButtons from "./lessoncontrolbuttons";

export default function Modules() {
    return (
      <div>
          <ModulesControls /><br /><br /><br /><br />
          <ListGroup className="rounded-0" id="wd-modules">
            <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary"> <BsGripVertical className="me-2 fs-3" /> Week 1 <ModuleControlButtons /> </div>
              <ListGroup className="wd-lessons rounded-0">
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                  LEARNING OBJECTIVES <LessonControlButtons /> </ListGroup.Item>
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                  Introduction to the course <LessonControlButtons /> </ListGroup.Item>
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                  Learn what is Web Development  <LessonControlButtons /> </ListGroup.Item>
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                  READINGS <LessonControlButtons /> </ListGroup.Item>
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                Full Stack Developer: Chapter 1 - Introduction <LessonControlButtons /> </ListGroup.Item>
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                Full Stack Developer: Chapter 2 - Creating User Interfaces With HTML  <LessonControlButtons /> </ListGroup.Item>
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                  Learn what is Web Development  <LessonControlButtons /> </ListGroup.Item>
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                  SLIDES <LessonControlButtons /> </ListGroup.Item>
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                Introduction to Web Development <LessonControlButtons /> </ListGroup.Item>
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                Creating an HTTP Server with Node.js <LessonControlButtons /> </ListGroup.Item>
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                Creating a React Application <LessonControlButtons /> </ListGroup.Item>
              </ListGroup>
            </ListGroup.Item>
            <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary"> <BsGripVertical className="me-2 fs-3" /> Week 2 <ModuleControlButtons /> </div>
              <ListGroup className="wd-lessons rounded-0">
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                  LEARNING OBJECTIVES <LessonControlButtons /> </ListGroup.Item>
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                Learn how to create user interfaces with HTML <LessonControlButtons /> </ListGroup.Item>
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                Keep working on assignment 1  <LessonControlButtons /> </ListGroup.Item>
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                Deploy the assignment to Netlify  <LessonControlButtons /> </ListGroup.Item>
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                  READINGS <LessonControlButtons /> </ListGroup.Item>
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                Developing Full Stack MERN Web Applications - Ch 1 - Building React User Interfaces with HTML <LessonControlButtons /> </ListGroup.Item>
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                  SLIDES <LessonControlButtons /> </ListGroup.Item>
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                Embedding content with Iframes <LessonControlButtons /> </ListGroup.Item>
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                Drawing with Scalable Vector Graphics <LessonControlButtons /> </ListGroup.Item>
              </ListGroup>
            </ListGroup.Item>
            <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary"> <BsGripVertical className="me-2 fs-3" /> Week 3 <ModuleControlButtons /> </div>
              <ListGroup className="wd-lessons rounded-0">
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                  LEARNING OBJECTIVES <LessonControlButtons /> </ListGroup.Item>
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                Introduction to CSS <LessonControlButtons /> </ListGroup.Item>
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                Selectors by tag ID, classes, and document structure <LessonControlButtons /> </ListGroup.Item>
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                Styling color and background color  <LessonControlButtons /> </ListGroup.Item>
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                Styling dimensions and positions <LessonControlButtons /> </ListGroup.Item>
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                The box model - styling margins, borders, and paddings  <LessonControlButtons /> </ListGroup.Item>
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                READING <LessonControlButtons /> </ListGroup.Item>
                <ListGroup.Item className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" /> 
                Developing Full Stack MERN Web Applications - Chapter 2 - Styling Web Pages with CSS <LessonControlButtons /> </ListGroup.Item>
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
      </div>
  );}
  