import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Row, Col, Badge } from "react-bootstrap";
import { FaArrowLeft, FaEdit, FaEye } from "react-icons/fa";
import * as quizzesClient from "./client";
import { setSelectedQuiz, setQuestions } from "./reducer";
import FacultyOnly from "../../Account/facultyonly";
import StudentOnly from "../../Account/studentonly";

export default function QuizDetails() {
    const { courseId, quizId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedQuiz, questions, loading } = useSelector((state: any) => state.quizzesReducer);
    const user = useSelector((state: any) => state.userReducer.currentUser);
    const [latestAttempt, setLatestAttempt] = useState<any>(null);
    const [attemptsCount, setAttemptsCount] = useState(0);

    const fetchQuiz = async () => {
        try {
            const quiz = await quizzesClient.fetchQuiz(quizId!);
            dispatch(setSelectedQuiz(quiz));
            
            const quizQuestions = await quizzesClient.fetchQuestionsForQuiz(quizId!);
            dispatch(setQuestions(quizQuestions));
            
            // If student, fetch their attempts
            if (user?.role === "STUDENT") {
                try {
                    const attempts = await quizzesClient.fetchStudentAttemptsForQuiz(user._id, quizId!);
                    setAttemptsCount(attempts.length);
                    
                    if (attempts.length > 0) {
                        const latest = await quizzesClient.fetchLatestAttempt(user._id, quizId!);
                        setLatestAttempt(latest);
                    }
                } catch (error) {
                    console.error("Error fetching attempts:", error);
                }
            }
        } catch (error) {
            console.error("Error fetching quiz details:", error);
        }
    };

    useEffect(() => {
        if (quizId) {
            fetchQuiz();
        }
    }, [quizId]);

    const formatDate = (date: string) => {
        if (!date) return "Not set";
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    };

    const handleStartQuiz = async () => {
        try {
            // Create a new attempt
            const attempt = await quizzesClient.createAttempt(quizId!);
            // Navigate to quiz taking page
            navigate(`/Kambaz/Courses/${courseId}/Quizzes/${quizId}/take/${attempt._id}`);
        } catch (error: any) {
            if (error.response?.data?.message === "Maximum attempts reached") {
                alert("You've reached the maximum number of attempts for this quiz.");
            } else {
                console.error("Error starting quiz:", error);
                alert("Error starting quiz. Please try again.");
            }
        }
    };

    const canTakeQuiz = () => {
        if (!selectedQuiz || !selectedQuiz.published) return false;
        
        const now = new Date();
        const availableFrom = selectedQuiz.availableDate ? new Date(selectedQuiz.availableDate) : null;
        const availableUntil = selectedQuiz.availableUntilDate ? new Date(selectedQuiz.availableUntilDate) : null;
        
        if (availableFrom && now < availableFrom) return false;
        if (availableUntil && now > availableUntil) return false;
        
        // Check attempts
        if (!selectedQuiz.multipleAttempts && attemptsCount > 0) return false;
        if (selectedQuiz.multipleAttempts && attemptsCount >= selectedQuiz.attemptsAllowed) return false;
        
        return true;
    };

    if (!selectedQuiz) {
        return <div>Loading quiz details...</div>;
    }

    return (
        <div className="quiz-details">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>{selectedQuiz.title}</h2>
                <div>
                    <Link to={`/Kambaz/Courses/${courseId}/Quizzes`} className="btn btn-outline-secondary me-2">
                        <FaArrowLeft className="me-1" /> Back to Quizzes
                    </Link>
                    
                    <FacultyOnly>
                        <Link to={`/Kambaz/Courses/${courseId}/Quizzes/${quizId}/preview`} className="btn btn-outline-primary me-2">
                            <FaEye className="me-1" /> Preview
                        </Link>
                        <Link to={`/Kambaz/Courses/${courseId}/Quizzes/${quizId}/edit`} className="btn btn-primary">
                            <FaEdit className="me-1" /> Edit
                        </Link>
                    </FacultyOnly>
                    
                    <StudentOnly>
                        {canTakeQuiz() ? (
                            <Button variant="primary" onClick={handleStartQuiz}>
                                Start Quiz
                            </Button>
                        ) : (
                            <Button variant="secondary" disabled>
                                {!selectedQuiz.published ? "Quiz Not Available" : 
                                 attemptsCount >= selectedQuiz.attemptsAllowed ? "No Attempts Remaining" :
                                 "Quiz Not Available"}
                            </Button>
                        )}
                    </StudentOnly>
                </div>
            </div>
            
            {selectedQuiz.description && (
                <Card className="mb-4">
                    <Card.Body>
                        <div dangerouslySetInnerHTML={{ __html: selectedQuiz.description }} />
                    </Card.Body>
                </Card>
            )}
            
            <Row>
                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Header>Quiz Details</Card.Header>
                        <Card.Body>
                            <dl className="row">
                                <dt className="col-sm-6">Quiz Type</dt>
                                <dd className="col-sm-6">
                                    {selectedQuiz.quizType === "GRADED_QUIZ" ? "Graded Quiz" :
                                     selectedQuiz.quizType === "PRACTICE_QUIZ" ? "Practice Quiz" :
                                     selectedQuiz.quizType === "GRADED_SURVEY" ? "Graded Survey" :
                                     "Ungraded Survey"}
                                </dd>
                                
                                <dt className="col-sm-6">Points</dt>
                                <dd className="col-sm-6">{selectedQuiz.points}</dd>
                                
                                <dt className="col-sm-6">Assignment Group</dt>
                                <dd className="col-sm-6">{selectedQuiz.assignmentGroup}</dd>
                                
                                <dt className="col-sm-6">Shuffle Answers</dt>
                                <dd className="col-sm-6">{selectedQuiz.shuffleAnswers ? "Yes" : "No"}</dd>
                                
                                <dt className="col-sm-6">Time Limit</dt>
                                <dd className="col-sm-6">{selectedQuiz.timeLimit} minutes</dd>
                                
                                <dt className="col-sm-6">Multiple Attempts</dt>
                                <dd className="col-sm-6">{selectedQuiz.multipleAttempts ? "Yes" : "No"}</dd>
                                
                                {selectedQuiz.multipleAttempts && (
                                    <>
                                        <dt className="col-sm-6">Attempts Allowed</dt>
                                        <dd className="col-sm-6">{selectedQuiz.attemptsAllowed}</dd>
                                    </>
                                )}
                                
                                <dt className="col-sm-6">Show Correct Answers</dt>
                                <dd className="col-sm-6">{selectedQuiz.showCorrectAnswers ? "Yes" : "No"}</dd>
                                
                                {selectedQuiz.accessCode && (
                                    <>
                                        <dt className="col-sm-6">Access Code</dt>
                                        <dd className="col-sm-6">{selectedQuiz.accessCode}</dd>
                                    </>
                                )}
                                
                                <dt className="col-sm-6">One Question at a Time</dt>
                                <dd className="col-sm-6">{selectedQuiz.oneQuestionAtATime ? "Yes" : "No"}</dd>
                                
                                <dt className="col-sm-6">Webcam Required</dt>
                                <dd className="col-sm-6">{selectedQuiz.webcamRequired ? "Yes" : "No"}</dd>
                                
                                <dt className="col-sm-6">Lock Questions After Answering</dt>
                                <dd className="col-sm-6">{selectedQuiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</dd>
                            </dl>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Header>Availability</Card.Header>
                        <Card.Body>
                            <dl className="row">
                                <dt className="col-sm-6">Due Date</dt>
                                <dd className="col-sm-6">{formatDate(selectedQuiz.dueDate)}</dd>
                                
                                <dt className="col-sm-6">Available From</dt>
                                <dd className="col-sm-6">{formatDate(selectedQuiz.availableDate)}</dd>
                                
                                <dt className="col-sm-6">Available Until</dt>
                                <dd className="col-sm-6">{formatDate(selectedQuiz.availableUntilDate)}</dd>
                            </dl>
                        </Card.Body>
                    </Card>
                    
                    <StudentOnly>
                        {latestAttempt && (
                            <Card className="mb-4">
                                <Card.Header>Your Results</Card.Header>
                                <Card.Body>
                                    <dl className="row">
                                        <dt className="col-sm-6">Latest Attempt</dt>
                                        <dd className="col-sm-6">
                                            Attempt {latestAttempt.attemptNumber} of {selectedQuiz.attemptsAllowed || 1}
                                        </dd>
                                        
                                        {latestAttempt.completed && (
                                            <>
                                                <dt className="col-sm-6">Score</dt>
                                                <dd className="col-sm-6">
                                                    {latestAttempt.score} / {latestAttempt.totalPoints}
                                                    <Badge 
                                                        className="ms-2" 
                                                        bg={latestAttempt.score / latestAttempt.totalPoints >= 0.6 ? "success" : "danger"}
                                                    >
                                                        {Math.round((latestAttempt.score / latestAttempt.totalPoints) * 100)}%
                                                    </Badge>
                                                </dd>
                                                
                                                <dt className="col-sm-6">Completed</dt>
                                                <dd className="col-sm-6">{formatDate(latestAttempt.endTime)}</dd>
                                            </>
                                        )}
                                    </dl>
                                    
                                    {latestAttempt.completed && (
                                        <Button 
                                            variant="outline-primary"
                                            onClick={() => navigate(`/Kambaz/Courses/${courseId}/Quizzes/${quizId}/attempt/${latestAttempt._id}`)}
                                        >
                                            View Attempt
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        )}
                    </StudentOnly>
                </Col>
            </Row>
        </div>
    );
}