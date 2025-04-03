import ModulesControls from "./modulescontrols";
import { FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./modulecontrolbuttons";
import LessonControlButtons from "./lessoncontrolbuttons";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as coursesClient from "../client";
import { addModule, editModule, setModules, updateModule, deleteModule }
  from "./modulereducer";
import { useSelector, useDispatch } from "react-redux";
import FacultyOnly from "../../Account/facultyonly";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();
  const fetchModules = async () => {
    const modules = await coursesClient.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };
  useEffect(() => {
    fetchModules();
  }, []);


    return (
      <ul id="wd-modules" className="list-group rounded-0">
        <FacultyOnly>
        <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }} />
        </FacultyOnly>
      {modules
        .map((module: any) => (
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            {!module.editing && module.name}
            <FacultyOnly>
            { module.editing && (
              <FormControl className="w-50 d-inline-block"
                    onChange={(e) => dispatch(
                      updateModule({ ...module, name: e.target.value })
                    ) }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }}
                    defaultValue={module.name}/>
            )}            
             <ModuleControlButtons 
              moduleId={module._id}
              deleteModule={(moduleId) => {
                dispatch(deleteModule(moduleId));
              }}
              editModule={(moduleId) => dispatch(editModule(moduleId))} />
              </FacultyOnly>
          </div>
          {module.lessons && (
            <ul className="wd-lessons list-group rounded-0">
              {module.lessons.map((lesson: any) => (
                <li className="wd-lesson list-group-item p-3 ps-1">
                  <BsGripVertical className="me-2 fs-3" /> {lesson.name} 
                  <FacultyOnly><LessonControlButtons /></FacultyOnly>

                </li>
              ))}</ul>)}</li>))}</ul>
  );}

