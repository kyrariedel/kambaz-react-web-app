import { IoEllipsisVertical } from "react-icons/io5";
// import GreenCheckmark from "../../Assignments/greencheckmark";
import { FaTrash, FaEdit, FaCopy } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

export default function QuizControlButtons({
    quizId,
    deleteQuiz,
    courseId
}: {
    quizId: string;
    deleteQuiz: (quizId: string) => void;
    courseId: string;
}) {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="quiz-controls" ref={dropdownRef}>
            <IoEllipsisVertical 
                className="fs-4 cursor-pointer" 
                onClick={() => setShowDropdown(!showDropdown)}
                style={{ cursor: "pointer" }}
            />
            
            {showDropdown && (
                <div className="dropdown-menu show position-absolute" style={{ right: 0, top: "100%" }}>
                    <Link 
                        to={`/Kambaz/Courses/${courseId}/Quizzes/${quizId}/edit`} 
                        className="dropdown-item"
                    >
                        <FaEdit className="me-2" /> Edit
                    </Link>
                    <a 
                        className="dropdown-item" 
                        onClick={() => deleteQuiz(quizId)}
                        style={{ cursor: "pointer" }}
                    >
                        <FaTrash className="me-2" /> Delete
                    </a>
                    <a 
                        className="dropdown-item" 
                        onClick={() => alert("Not implemented yet")}
                        style={{ cursor: "pointer" }}
                    >
                        <FaCopy className="me-2" /> Copy
                    </a>
                </div>
            )}
        </div>
    );
}