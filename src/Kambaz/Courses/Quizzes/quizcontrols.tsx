import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";

export default function QuizControls({ addQuiz }: {
  addQuiz: () => void;
}) {
  return (
    <div className="d-flex justify-content-end mb-3">
      <Button 
        variant="primary" 
        onClick={addQuiz}
        className="d-flex align-items-center"
      >
        <FaPlus className="me-2" /> Quiz
      </Button>
    </div>
  );
}