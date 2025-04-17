import { useParams, Link } from "react-router-dom";
import { ListGroup, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControls from "./assignmentcontrols";
import ModuleControlButtons from "./modulecontrolbuttons";
import AssignmentControlButtons from "./assignmentcontrolbuttons";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
import { addAssignment, setAssignment, updateAssignment, deleteAssignment } from "./reducer";
import { useState, useEffect } from "react";
import FacultyOnly from "../../Account/facultyonly";

export default function Assignments() {
    const { courseId } = useParams();
    const [assignmentName, setAssignmentName] = useState("");
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
    const addAssignmentHandler = async () => {
        const newAssignment = await coursesClient.createModuleForCourse(courseId!, {
          name: assignmentName,
          course: courseId,
        });
        dispatch(addAssignment(newAssignment));
        setAssignmentName("");
      };
      const updateAssignmentHandler = async (assignment: any) => {
        await assignmentsClient.updateAssignment(assignment);
        dispatch(updateAssignment(assignment));
      };
     
     
    const fetchAssignmentsForCourse = async () => {
        const modules = await coursesClient.findModulesForCourse(courseId!);
        dispatch(setAssignment(modules));
      };
      useEffect(() => {
        fetchAssignmentsForCourse();
      }, [courseId]);
     
    const fetchAssignments = async () => {
        const assignments = await coursesClient.findAssignmentsForCourse(courseId as string);
        dispatch(setAssignment(assignments));
    };
    const deleteAssignmentHandler = async (moduleId: string) => {
        await assignmentsClient.deleteAssignment(moduleId);
        dispatch(deleteAssignment(moduleId));
      };
     
    
    useEffect(() => {
        fetchAssignments();
    }, [courseId]);
    
    // const createAssignmentForCourse = async () => {
    //     if (!courseId) return;
    //     const newAssignment = { title: assignmentName, course: courseId };
    //     const assignment = await coursesClient.createAssignmentForCourse(courseId, newAssignment);
    //     dispatch(addAssignment(assignment));
    // };

    // const removeAssignment = async (assignmentId: string) => {
    //     await assignmentsClient.deleteAssignment(assignmentId);
    //     dispatch(deleteAssignment(assignmentId));
    // };
    
    const saveAssignment = async (assignment: any) => {
        await assignmentsClient.updateAssignment(assignment);
        dispatch(updateAssignment(assignment));
    };

    return (
        <div>
            <FacultyOnly>
                <AssignmentControls 
                    setAssignmentName={setAssignmentName} 
                    assignmentName={assignmentName} 
                    addAssignment={addAssignmentHandler}
                />
            </FacultyOnly>

            <ListGroup className="rounded-0 mt-4" id="wd-assignment">
                <ListGroup.Item className="wd-assignments p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        ASSIGNMENTS 40% of Total
                        <ModuleControlButtons />
                    </div>

                    <ListGroup className="wd-lessons rounded-0">
                        {assignments.map((assignment: any) => (
                            <ListGroup.Item key={assignment._id} className="wd-assignment p-3 ps-1">
                                <BsGripVertical className="me-2 fs-3" />
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
                                            updateAssignmentHandler({ ...assignment, title: e.target.value })
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                saveAssignment({ ...assignment, editing: false });
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
                                        deleteAssignment={(assignmentId) => deleteAssignmentHandler(assignmentId)}
                                        updateAssignment={(assignmentId) => dispatch(updateAssignment({ _id: assignmentId, editing: true }))}
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