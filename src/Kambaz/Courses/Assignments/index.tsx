import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import * as db from "../../Database";
import AssignmentControls from "./assignmentcontrols";
import ModuleControlButtons from "./modulecontrolbuttons";
import AssignmentControlButtons from "./assignmentcontrolbuttons";

export default function Assignments() {
    const { courseId } = useParams();
    
    const [courseAssignments, setCourseAssignments] = useState<any[]>([]);

    useEffect(() => {
        const filteredAssignments = db.assignments.filter(
            assignment => assignment.courseId === courseId
        );
        setCourseAssignments(filteredAssignments);
    }, [courseId]);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    };

    return (
        <div>
            <AssignmentControls />
            <br /><br /><br /><br />

            <ListGroup className="rounded-0" id="wd-module">
                <ListGroup.Item className="wd-assignments p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        ASSIGNMENTS 40% of Total
                        <ModuleControlButtons />
                    </div>
                    <ListGroup className="wd-lessons rounded-0">
                        {courseAssignments.map((assignment) => (
                            <ListGroup.Item key={assignment._id} className="wd-assignment p-3 ps-1">
                                <BsGripVertical className="me-2 fs-3" />
                                <Link
                                    to={`/Kambaz/Courses/${courseId}/Assignments/${assignment._id}`}
                                    className="wd-assignment-link"
                                >
                                    {assignment.title}
                                </Link>
                                <br />
                                Multiple Modules | 
                                <strong> Not available until </strong>
                                {formatDate(assignment.availableDate)} |
                                <strong> Due </strong>
                                {formatDate(assignment.dueDate)} | 
                                {assignment.points} pts
                                <AssignmentControlButtons />
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>

            <div className="d-flex justify-content-between mt-4">
                <Link to={`/Kambaz/Courses/${courseId}/Assignments/new`} className="btn btn-primary">
                    Add New Assignment
                </Link>
            </div>
        </div>
    );
}
