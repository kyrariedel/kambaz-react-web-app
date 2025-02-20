import CourseNavigation from "./navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import PeopleTable from "./People/table";
import AssignmentEditor from "./Assignments/editor";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import { courses } from "../Database";

export default function Courses() {
    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);
    const { pathname } = useLocation();
    return (
        <div>
            <h2 className="text-danger">
                <FaAlignJustify className="me-3 fs-4 mb-1" />
                {course.name} &gt; {pathname.split("/")[4]}
            </h2>
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CourseNavigation />
                </div>
                <div className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="People" element={<PeopleTable />} />
                    </Routes>
                </div>
            </div>
        </div>
  );}