import { FaSearch } from "react-icons/fa";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import QuizEditor from "./quizeditor";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

export default function QuizControls({ quizName, setQuizName, addQuiz }: {
  quizName: string;
  setQuizName: (title: string) => void;
  addQuiz: () => void;
}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleAddQuiz = () => {
        addQuiz();
        handleClose();
    };
    
    return (
        <div id="wd-quizzes-controls" className="text-nowrap">
            <Button variant="light" size="lg" className="me-1 float-end" id="wd-view-progress">
                Group
            </Button>
            <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-quiz-btn" onClick={handleShow}>
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Quiz
            </Button>
            <QuizEditor 
                show={show} 
                handleClose={handleClose} 
                dialogTitle="Add Quiz"
                quizName={quizName} 
                setQuizName={setQuizName} 
                saveQuiz={handleAddQuiz} 
            />
            <FormGroup className="mb-3" controlId="wd-search">
                <FormControl 
                    type="string" 
                    placeholder="Search..." 
                    style={{ paddingLeft: '30px', width: '200px' }}
                />
                <FaSearch 
                    className="position-relative me-2" 
                    style={{ top: '50%', left: '10px', marginTop: '-60px'}} 
                />
            </FormGroup>
        </div>
    );
}