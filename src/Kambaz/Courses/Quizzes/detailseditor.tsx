import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Row, Col, Card, Nav, Tab } from "react-bootstrap";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import * as quizzesClient from "./client";
import { setSelectedQuiz, updateQuiz, setQuestions } from "./reducer";
import QuestionsEditor from "./questionseditor";

export default function QuizDetailsEditor() {
    const { courseId, quizId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { selectedQuiz, questions } = useSelector((state: any) => state.quizzesReducer);
    const [activeTab, setActiveTab] = useState("details");
    
    const [formState, setFormState] = useState({
        title: "",
        description: "",
        quizType: "GRADED_QUIZ",
        points: 0,
        assignmentGroup: "QUIZZES",
        shuffleAnswers: true,
        timeLimit: 20,
        multipleAttempts: false,
        attemptsAllowed: 1,
        showCorrectAnswers: true,
        accessCode: "",
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        dueDate: "",
        availableDate: "",
        availableUntilDate: ""
    });

    useEffect(() => {
        const fetchQuizDetails = async () => {
            try {
                const quiz = await quizzesClient.fetchQuiz(quizId!);
                dispatch(setSelectedQuiz(quiz));
                
                // Format dates for form inputs
                const formatDateForInput = (dateString: string) => {
                    if (!dateString) return "";
                    const date = new Date(dateString);
                    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
                        .toISOString()
                        .slice(0, 16);
                };
                
                setFormState({
                    title: quiz.title || "",
                    description: quiz.description || "",
                    quizType: quiz.quizType || "GRADED_QUIZ",
                    points: quiz.points || 0,
                    assignmentGroup: quiz.assignmentGroup || "QUIZZES",
                    shuffleAnswers: quiz.shuffleAnswers !== false,
                    timeLimit: quiz.timeLimit || 20,
                    multipleAttempts: quiz.multipleAttempts || false,
                    attemptsAllowed: quiz.attemptsAllowed || 1,
                    showCorrectAnswers: quiz.showCorrectAnswers !== false,
                    accessCode: quiz.accessCode || "",
                    oneQuestionAtATime: quiz.oneQuestionAtATime !== false,
                    webcamRequired: quiz.webcamRequired || false,
                    lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering || false,
                    dueDate: formatDateForInput(quiz.dueDate),
                    availableDate: formatDateForInput(quiz.availableDate),
                    availableUntilDate: formatDateForInput(quiz.availableUntilDate)
                });
                
                const quizQuestions = await quizzesClient.fetchQuestionsForQuiz(quizId!);
                dispatch(setQuestions(quizQuestions));
            } catch (error) {
                console.error("Error fetching quiz details:", error);
            }
        };
        
        if (quizId) {
            fetchQuizDetails();
        }
    }, [quizId, dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormState({ ...formState, [name]: checked });
        } else {
            setFormState({ ...formState, [name]: value });
        }
    };

    const saveQuiz = async () => {
        try {
            const updatedQuiz = await quizzesClient.updateQuiz(quizId!, {
                ...formState,
                course: courseId
            });
            
            dispatch(updateQuiz(updatedQuiz));
            navigate(`/Kambaz/Courses/${courseId}/Quizzes/${quizId}`);
        } catch (error) {
            console.error("Error updating quiz:", error);
        }
    };

    const saveAndPublishQuiz = async () => {
        try {
            const updatedQuiz = await quizzesClient.updateQuiz(quizId!, {
                ...formState,
                course: courseId
            });
            
            await quizzesClient.publishQuiz(quizId!, true);
            dispatch(updateQuiz({...updatedQuiz, published: true}));
            navigate(`/Kambaz/Courses/${courseId}/Quizzes`);
        } catch (error) {
            console.error("Error saving and publishing quiz:", error);
        }
    };

    const handleCancel = () => {
        navigate(`/Kambaz/Courses/${courseId}/Quizzes`);
    };

    return (
        <div className="quiz-editor">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Edit Quiz: {formState.title}</h2>
                <div>
                    <Link to={`/Kambaz/Courses/${courseId}/Quizzes`} className="btn btn-outline-secondary me-2">
                        <FaArrowLeft className="me-1" /> Back to Quizzes
                    </Link>
                </div>
            </div>
            
            <Tab.Container id="quiz-editor-tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'details')}>
                <Nav variant="tabs" className="mb-3">
                    <Nav.Item>
                        <Nav.Link eventKey="details">Details</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="questions">Questions</Nav.Link>
                    </Nav.Item>
                </Nav>
                
                <Tab.Content>
                    <Tab.Pane eventKey="details">
                        <Card>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="title"
                                            value={formState.title}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-3">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            name="description"
                                            value={formState.description}
                                            onChange={handleInputChange}
                                            rows={4}
                                        />
                                    </Form.Group>
                                    
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Quiz Type</Form.Label>
                                                <Form.Select
                                                    name="quizType"
                                                    value={formState.quizType}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="GRADED_QUIZ">Graded Quiz</option>
                                                    <option value="PRACTICE_QUIZ">Practice Quiz</option>
                                                    <option value="GRADED_SURVEY">Graded Survey</option>
                                                    <option value="UNGRADED_SURVEY">Ungraded Survey</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Assignment Group</Form.Label>
                                                <Form.Select
                                                    name="assignmentGroup"
                                                    value={formState.assignmentGroup}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="QUIZZES">Quizzes</option>
                                                    <option value="EXAMS">Exams</option>
                                                    <option value="ASSIGNMENTS">Assignments</option>
                                                    <option value="PROJECT">Project</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    
                                    <Form.Group className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label="Shuffle Answers"
                                            name="shuffleAnswers"
                                            checked={formState.shuffleAnswers}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Time Limit (minutes)</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="timeLimit"
                                                    value={formState.timeLimit}
                                                    onChange={handleInputChange}
                                                    min={1}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    
                                    <Form.Group className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label="Multiple Attempts"
                                            name="multipleAttempts"
                                            checked={formState.multipleAttempts}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    
                                    {formState.multipleAttempts && (
                                        <Form.Group className="mb-3">
                                            <Form.Label>How Many Attempts</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="attemptsAllowed"
                                                value={formState.attemptsAllowed}
                                                onChange={handleInputChange}
                                                min={1}
                                            />
                                        </Form.Group>
                                    )}
                                    
                                    <Form.Group className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label="Show Correct Answers"
                                            name="showCorrectAnswers"
                                            checked={formState.showCorrectAnswers}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-3">
                                        <Form.Label>Access Code (optional)</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="accessCode"
                                            value={formState.accessCode}
                                            onChange={handleInputChange}
                                            placeholder="Leave blank for no access code"
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label="One Question at a Time"
                                            name="oneQuestionAtATime"
                                            checked={formState.oneQuestionAtATime}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label="Webcam Required"
                                            name="webcamRequired"
                                            checked={formState.webcamRequired}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label="Lock Questions After Answering"
                                            name="lockQuestionsAfterAnswering"
                                            checked={formState.lockQuestionsAfterAnswering}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    
                                    <Row>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Due Date</Form.Label>
                                                <Form.Control
                                                    type="datetime-local"
                                                    name="dueDate"
                                                    value={formState.dueDate}
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Available From</Form.Label>
                                                <Form.Control
                                                    type="datetime-local"
                                                    name="availableDate"
                                                    value={formState.availableDate}
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Available Until</Form.Label>
                                                <Form.Control
                                                    type="datetime-local"
                                                    name="availableUntilDate"
                                                    value={formState.availableUntilDate}
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Tab.Pane>
                    
                    <Tab.Pane eventKey="questions">
                        <QuestionsEditor quizId={quizId!} />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
            
            <div className="mt-4 d-flex justify-content-end">
                <Button variant="secondary" onClick={handleCancel} className="me-2">
                    Cancel
                </Button>
                <Button variant="primary" onClick={saveQuiz} className="me-2">
                    <FaSave className="me-1" /> Save
                </Button>
                <Button variant="success" onClick={saveAndPublishQuiz}>
                    Save & Publish
                </Button>
            </div>
        </div>
    );
}