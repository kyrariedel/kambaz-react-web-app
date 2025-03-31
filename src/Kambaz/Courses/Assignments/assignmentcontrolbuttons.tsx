import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./greencheckmark";
import { FaTrash } from "react-icons/fa";

export default function AssignmentControlButtons({assignmentId, deleteAssignment, updateAssignment}:
  { assignmentId: string; deleteAssignment: (assignmentId: string) => void; updateAssignment: (assignmentId: string) => void }) {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteAssignment(assignmentId)}/>
      <IoEllipsisVertical className="fs-4" onClick={() => updateAssignment(assignmentId)}/>
    </div> );}