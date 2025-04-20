import { useParams, Link } from "react-router-dom";
import { ListGroup, FormControl, Button } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { BsBan } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import FacultyOnly from "../../Account/facultyonly";
import QuizControls from "./quizcontrols";
import QuizControlButtons from "./quizcontrolbuttons";
import * as quizzesClient from "./client";
import { setQuizzes } from "./reducer";

export default function QuizList() {
    const { courseId } = useParams();
    const [quizName, setQuizName] = useState("New Quiz");
    const { quizzes, loading } = useSelector((state: any) => state.quizzesReducer);
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.userReducer.currentUser);

    const formatDate = (date: string) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    };

    const getAvailabilityStatus = (quiz: any) => {
        const now = new Date();
        const availableDate = quiz.availableDate ? new Date(quiz.availableDate) : null;
        const availableUntilDate = quiz.availableUntilDate ? new Date(quiz.availableUntilDate) : null;

        if (!availableDate) {
            return "Available";
        }

        if (now < availableDate) {
            return `Not available until ${formatDate(quiz.availableDate)}`;
        }

        if (availableUntilDate && now > availableUntilDate) {
            return "Closed";
        }

        return "Available";
    };

    const getQuestionCount = (quiz: any) => {
        // This would ideally be part of the quiz object from the API
        return quiz.questionCount || 0;
    };

    const addQuizHandler = async () => {
        try {
            const newQuiz = await quizzesClient.createQuiz(courseId!, {
                title: quizName,
                course: courseId,
                createdBy: user?._id
            });
            
            fetchQuizzesForCourse();
            // Navigate to edit page
            window.location.href = `/Kambaz/Courses/${courseId}/Quizzes/${newQuiz._id}/edit`;
        } catch (error) {
            console.error("Error creating quiz:", error);
        }
    };

    const fetchQuizzesForCourse = async () => {
        try {
            const fetchedQuizzes = await quizzesClient.fetchQuizzesForCourse(courseId!);
            dispatch(setQuizzes(fetchedQuizzes));
        } catch (error) {
            console.error("Error fetching quizzes:", error);
        }
    };

    useEffect(() => {
        fetchQuizzesForCourse();
    }, [courseId]);

    const togglePublish = async (quiz: any) => {
        try {
            await quizzesClient.publishQuiz(quiz._id, !quiz.published);
            fetchQuizzesForCourse();
        } catch (error) {
            console.error("Error toggling publish status:", error);
        }
    };

    const deleteQuizHandler = async (quizId: string) => {
        try {
            await quizzesClient.deleteQuiz(quizId);
            fetchQuizzesForCourse();
        } catch (error) {
            console.error("Error deleting quiz:", error);
        }
    };

    const getStudentScore = (quiz: any) => {
        if (user?.role !== "STUDENT" || !quiz.attempts || quiz.attempts.length === 0) {
            return null;
        }
        
        const latestAttempt = quiz.attempts[0]; // Assuming attempts are sorted with latest first
        if (!latestAttempt.completed) {
            return null;
        }
        
        return `${latestAttempt.score} / ${latestAttempt.totalPoints}`;
    };

    return (
        <div>
            <FacultyOnly>
                <QuizControls 
                    setQuizName={setQuizName} 
                    quizName={quizName} 
                    addQuiz={addQuizHandler}
                />
            </FacultyOnly>

            <ListGroup className="rounded-0 mt-4" id="wd-quizzes">
                <ListGroup.Item className="wd-quizzes p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        QUIZZES
                    </div>

                    {quizzes.length === 0 && (
                        <div className="p-4 text-center">
                            No quizzes yet. Click the "+ Quiz" button to create one.
                        </div>
                    )}

                    <ListGroup className="wd-quiz-list rounded-0">
                        {quizzes.map((quiz: any) => (
                            <ListGroup.Item key={quiz._id} className="wd-quiz p-3 ps-1">
                                <div className="d-flex">
                                    <div className="me-2">
                                        {quiz.published ? (
                                            <FaCheckCircle 
                                                className="text-success fs-5" 
                                                onClick={() => user?.role === "FACULTY" ? togglePublish(quiz) : null}
                                                style={user?.role === "FACULTY" ? { cursor: "pointer" } : {}}
                                            />
                                        ) : (
                                            <BsBan 
                                                className="text-danger fs-5" 
                                                onClick={() => user?.role === "FACULTY" ? togglePublish(quiz) : null}
                                                style={user?.role === "FACULTY" ? { cursor: "pointer" } : {}}
                                            />
                                        )}
                                    </div>
                                    
                                    <div className="flex-grow-1">
                                        <Link
                                            to={`/Kambaz/Courses/${courseId}/Quizzes/${quiz._id}`}
                                            className="quiz-title fs-5 text-decoration-none"
                                        >
                                            {quiz.title}
                                        </Link>
                                        
                                        <div>
                                            <span className="text-muted">{getAvailabilityStatus(quiz)}</span>
                                            {quiz.dueDate && (
                                                <span className="ms-2">
                                                    <strong>Due </strong>
                                                    {formatDate(quiz.dueDate)}
                                                </span>
                                            )}
                                            <span className="ms-2">{quiz.points} pts</span>
                                            <span className="ms-2">{getQuestionCount(quiz)} questions</span>
                                            
                                            {user?.role === "STUDENT" && (
                                                <span className="ms-2">
                                                    {getStudentScore(quiz) ? (
                                                        <>Score: {getStudentScore(quiz)}</>
                                                    ) : null}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <FacultyOnly>
                                        <QuizControlButtons
                                            quizId={quiz._id}
                                            deleteQuiz={(quizId) => deleteQuizHandler(quizId)}
                                            courseId={courseId!}
                                        />
                                    </FacultyOnly>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}