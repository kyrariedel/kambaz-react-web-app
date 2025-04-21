import { useParams, Link, useNavigate } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { BsBan } from "react-icons/bs";
import QuizControls from "./quizcontrols";
import QuizControlButtons from "./quizcontrolbuttons";
import { useSelector, useDispatch } from "react-redux";
import * as quizzesClient from "./client";
import { setQuizzes, setLoading, addQuiz, updateQuiz, deleteQuiz } from "./reducer";
import { useState, useEffect } from "react";
import FacultyOnly from "../../Account/facultyonly";
import StudentOnly from "../../Account/studentonly";

export default function Quizzes() {
    const { courseId } = useParams();
    const [quizName, setQuizName] = useState("New Quiz");
    const { quizzes, loading } = useSelector((state: any) => state.quizzesReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formatDate = (date: string) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
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
        return quiz.questionCount || 0;
    };

    // Modified to navigate directly to the new quiz editor page
    const addQuizHandler = () => {
        // Instead of creating a quiz first, we'll navigate to a new route for quiz creation
        navigate(`/Kambaz/Courses/${courseId}/Quizzes/new`);
    };

    const fetchQuizzesForCourse = async () => {
        dispatch(setLoading(true));
        try {
            const fetchedQuizzes = await quizzesClient.fetchQuizzesForCourse(courseId!);
            dispatch(setQuizzes(fetchedQuizzes));
        } catch (error) {
            console.error("Error fetching quizzes:", error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (courseId) {
            fetchQuizzesForCourse();
        }
    }, [courseId]);

    const togglePublish = async (quiz: any) => {
        try {
            await quizzesClient.publishQuiz(quiz._id, !quiz.published);
            const updatedQuiz = { ...quiz, published: !quiz.published };
            dispatch(updateQuiz(updatedQuiz));
        } catch (error) {
            console.error("Error toggling publish status:", error);
        }
    };

    const deleteQuizHandler = async (quizId: string) => {
        try {
            await quizzesClient.deleteQuiz(quizId);
            dispatch(deleteQuiz(quizId));
        } catch (error) {
            console.error("Error deleting quiz:", error);
        }
    };

    const getStudentScore = (quiz: any) => {
        if (!quiz.attempts || quiz.attempts.length === 0) {
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
                            <FacultyOnly>
                                No quizzes yet. Click the '+ Quiz' button to create one.
                            </FacultyOnly>
                            <StudentOnly>
                                No quizzes yet. Your instructor hasn't created any quizzes yet.
                            </StudentOnly>
                        </div>
                    )}

                    <ListGroup className="wd-quiz-list rounded-0">
                        {quizzes.map((quiz: any) => (
                            <ListGroup.Item key={quiz._id} className="wd-quiz p-3 ps-1">
                                <div className="d-flex">
                                    <div className="me-2">
                                        <FacultyOnly>
                                            {quiz.published ? (
                                                <FaCheckCircle
                                                    className="text-success fs-5"
                                                    onClick={() => togglePublish(quiz)}
                                                    style={{ cursor: "pointer" }}
                                                    title="Click to unpublish"
                                                />
                                            ) : (
                                                <BsBan
                                                    className="text-danger fs-5"
                                                    onClick={() => togglePublish(quiz)}
                                                    style={{ cursor: "pointer" }}
                                                    title="Click to publish"
                                                />
                                            )}
                                        </FacultyOnly>
                                        
                                        <StudentOnly>
                                            {quiz.published ? (
                                                <FaCheckCircle className="text-success fs-5" />
                                            ) : (
                                                <BsBan className="text-danger fs-5" />
                                            )}
                                        </StudentOnly>
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

                                            <StudentOnly>
                                                {getStudentScore(quiz) && (
                                                    <span className="ms-2">
                                                        Score: {getStudentScore(quiz)}
                                                    </span>
                                                )}
                                            </StudentOnly>
                                        </div>
                                    </div>

                                    <FacultyOnly>
                                        <QuizControlButtons
                                            quizId={quiz._id}
                                            deleteQuiz={deleteQuizHandler}
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