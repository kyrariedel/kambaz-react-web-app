import { Modal, Button, Form } from 'react-bootstrap';

export default function QuizEditor({ 
    show, 
    handleClose, 
    dialogTitle, 
    quizName, 
    setQuizName, 
    saveQuiz
}: {  
    show: boolean;
    handleClose: () => void;
    dialogTitle: string;
    quizName: string;
    setQuizName: (title: string) => void;
    saveQuiz: () => void;
}) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{dialogTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Quiz Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={quizName}
                            onChange={(e) => setQuizName(e.target.value)}
                            placeholder="Enter quiz name"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={saveQuiz}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}