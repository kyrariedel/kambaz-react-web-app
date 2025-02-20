// import CourseNavigation from "./navigation";
// import Modules from "./Modules";
// import Home from "./Home";
// import Assignments from "./Assignments";
// import PeopleTable from "./People/table";
// import AssignmentEditor from "./Assignments/editor";
//import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import { courses } from "../Database";

export default function Courses() {
    const { cid } = useParams();
    const { pathname } = useLocation();
    const course = courses.find((course) => course._id === cid);
    return (
        <div id="wd-courses">
        <h2 className="text-danger">
          <FaAlignJustify className="me-3 fs-4 mb-1" />
          {course && course.name} &gt; {pathname.split("/")[4]}
        </h2> </div>
  );}
  