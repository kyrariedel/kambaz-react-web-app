import { useParams, Link } from "react-router-dom";
import { ListGroup, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControls from "./assignmentcontrols";
import ModuleControlButtons from "./modulecontrolbuttons";
import AssignmentControlButtons from "./assignmentcontrolbuttons";
import { useSelector, useDispatch } from "react-redux";
import { updateAssignment, deleteAssignment } from "./reducer";
import FacultyOnly from "../../Account/facultyonly";

export default function Assignments() {
    const { courseId } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const dispatch = useDispatch();

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
            {courseId && <AssignmentControls />}
            <div className="d-flex justify-content-between mt-4">
                <Link to={`/Kambaz/Courses/${courseId}/Assignments/new`} className="btn btn-danger">
                    Add Assignment
                </Link>
            </div>
            <br /><br /><br /><br />

            <ListGroup className="rounded-0 mt-4" id="wd-module">
                <ListGroup.Item className="wd-assignments p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        ASSIGNMENTS 40% of Total
                        <ModuleControlButtons />
                    </div>

                    <ListGroup className="wd-lessons rounded-0">
                        {assignments
                            .filter((assignment: any) => assignment.course === courseId)
                            .map((assignment: any) => (
                                <ListGroup.Item key={assignment._id} className="wd-assignment p-3 ps-1">
                                    <BsGripVertical className="me-2 fs-3" />

                                    {/* Editable Assignment Title */}
                                    {!assignment.editing ? (
                                        <Link
                                            to={`/Kambaz/Courses/${courseId}/Assignments/${assignment._id}`}
                                            className="wd-assignment-link"
                                        >
                                            {assignment.title}
                                        </Link>
                                    ) : (
                                        <FormControl
                                            className="w-50 d-inline-block"
                                            onChange={(e) =>
                                                dispatch(updateAssignment({ ...assignment, title: e.target.value }))
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    dispatch(updateAssignment({ ...assignment, editing: false }));
                                                }
                                            }}
                                            defaultValue={assignment.title}
                                        />
                                    )}

                                    <br />
                                    Multiple Modules |
                                    <strong> Not available until </strong>
                                    {formatDate(assignment.availableDate)} |
                                    <strong> Due </strong>
                                    {formatDate(assignment.dueDate)} |
                                    {assignment.points} pts

                                    <FacultyOnly>
                                        <AssignmentControlButtons
                                            assignmentId={assignment._id}
                                            deleteAssignment={(assignmentId) => dispatch(deleteAssignment(assignmentId))}
                                            updateAssignment={() =>
                                                dispatch(updateAssignment({ ...assignment, editing: true }))
                                            }
                                        />
                                    </FacultyOnly>
                                </ListGroup.Item>
                            ))}
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>

        </div>
    );
}