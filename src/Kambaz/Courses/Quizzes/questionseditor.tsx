import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, ListGroup, Form } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaSave } from "react-icons/fa";
import * as quizzesClient from "./client";
import { addQuestion, updateQuestion, deleteQuestion } from "./reducer";

export default function QuizQuestionsEditor({ quizId }: { quizId: string }) {
    const dispatch = useDispatch();
    const { questions } = useSelector((state: any) => state.quizzesReducer);
    const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
    const [newQuestion, setNewQuestion] = useState(false);
    
    const [currentQuestion, setCurrentQuestion] = useState({
        _id: "",
        title: "",
        questionType: "MULTIPLE_CHOICE",
        points: 1,
        questionText: "",
        choices: ["", "", "", ""],
        correctAnswer: 0,
        possibleAnswers: [""] 
    });

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await quizzesClient.fetchQuestionsForQuiz(quizId);
                dispatch({ type: "SET_QUESTIONS", payload: response });
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchQuestions();
    }, [quizId, dispatch]);

    const handleAddQuestion = () => {
        setNewQuestion(true);
        setEditingQuestionId(null);
        setCurrentQuestion({
            _id: "",
            title: "New Question",
            questionType: "MULTIPLE_CHOICE",
            points: 1,
            questionText: "",
            choices: ["", "", "", ""],
            correctAnswer: 0,
            possibleAnswers: [""]
        });
    };

    const handleEditQuestion = (question: any) => {
        setNewQuestion(false);
        setEditingQuestionId(question._id);
        
        let formattedQuestion = {
            ...question,
            choices: question.choices || ["", "", "", ""],
            possibleAnswers: question.possibleAnswers || [""]
        };
        
        setCurrentQuestion(formattedQuestion);
    };

    const handleDeleteQuestion = async (questionId: string) => {
        try {
            await quizzesClient.deleteQuestion(questionId);
            dispatch(deleteQuestion(questionId));
        } catch (error) {
            console.error("Error deleting question:", error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        if (name === "questionType") {
            if (value === "MULTIPLE_CHOICE") {
                setCurrentQuestion({
                    ...currentQuestion,
                    questionType: value,
                    choices: ["", "", "", ""],
                    correctAnswer: 0,
                    possibleAnswers: [""]
                });
            } else if (value === "TRUE_FALSE") {
                setCurrentQuestion({
                    ...currentQuestion,
                    questionType: value,
                    choices: [],
                    correctAnswer: 0,
                    possibleAnswers: [""]
                });
            } else if (value === "FILL_BLANK") {
                setCurrentQuestion({
                    ...currentQuestion,
                    questionType: value,
                    choices: [],
                    correctAnswer: 0,
                    possibleAnswers: [""]
                });
            }
        } else {
            setCurrentQuestion({ ...currentQuestion, [name]: value });
        }
    };

    const handleChoiceChange = (index: number, value: string) => {
        const updatedChoices = [...currentQuestion.choices];
        updatedChoices[index] = value;
        setCurrentQuestion({ ...currentQuestion, choices: updatedChoices });
    };

    const handleCorrectAnswerChange = (index: number) => {
        setCurrentQuestion({ ...currentQuestion, correctAnswer: index });
    };

    const handleTrueFalseChange = (value: number) => {
        setCurrentQuestion({ ...currentQuestion, correctAnswer: value });
    };

    const handlePossibleAnswerChange = (index: number, value: string) => {
        const updatedAnswers = [...currentQuestion.possibleAnswers];
        updatedAnswers[index] = value;
        setCurrentQuestion({ ...currentQuestion, possibleAnswers: updatedAnswers });
    };

    const addChoice = () => {
        setCurrentQuestion({ 
            ...currentQuestion, 
            choices: [...currentQuestion.choices, ""] 
        });
    };

    const removeChoice = (index: number) => {
        const updatedChoices = [...currentQuestion.choices];
        updatedChoices.splice(index, 1);
        
        let updatedCorrectAnswer = currentQuestion.correctAnswer;
        if (typeof currentQuestion.correctAnswer === 'number') {
            if (currentQuestion.correctAnswer === index) {
                updatedCorrectAnswer = 0;
            } else if (currentQuestion.correctAnswer > index) {
                updatedCorrectAnswer = Number(currentQuestion.correctAnswer) - 1;
            }
        }
        
        setCurrentQuestion({ 
            ...currentQuestion, 
            choices: updatedChoices,
            correctAnswer: updatedCorrectAnswer
        });
    };

    const addPossibleAnswer = () => {
        setCurrentQuestion({ 
            ...currentQuestion, 
            possibleAnswers: [...currentQuestion.possibleAnswers, ""] 
        });
    };

    const removePossibleAnswer = (index: number) => {
        if (currentQuestion.possibleAnswers.length <= 1) return;
        
        const updatedAnswers = [...currentQuestion.possibleAnswers];
        updatedAnswers.splice(index, 1);
        setCurrentQuestion({ 
            ...currentQuestion, 
            possibleAnswers: updatedAnswers 
        });
    };

    const saveQuestion = async () => {
        try {
            if (newQuestion) {
                const createdQuestion = await quizzesClient.createQuestion(quizId, {
                    ...currentQuestion,
                    quiz: quizId
                });
                dispatch(addQuestion(createdQuestion));
            } else {
                const updatedQuestion = await quizzesClient.updateQuestion(currentQuestion._id, currentQuestion);
                dispatch(updateQuestion(updatedQuestion));
            }
            
            setNewQuestion(false);
            setEditingQuestionId(null);
        } catch (error) {
            console.error("Error saving question:", error);
        }
    };

    const cancelEdit = () => {
        setNewQuestion(false);
        setEditingQuestionId(null);
    };

    const renderQuestionEditor = () => {
        return (
            <Card className="mb-4">
                <Card.Header>
                    {newQuestion ? "New Question" : "Edit Question"}
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Question Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={currentQuestion.title}
                                onChange={handleInputChange}
                                placeholder="Enter a title for this question"
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Question Type</Form.Label>
                            <Form.Select
                                name="questionType"
                                value={currentQuestion.questionType}
                                onChange={handleInputChange}
                            >
                                <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                                <option value="TRUE_FALSE">True/False</option>
                                <option value="FILL_BLANK">Fill in the Blank</option>
                            </Form.Select>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Points</Form.Label>
                            <Form.Control
                                type="number"
                                name="points"
                                value={currentQuestion.points}
                                onChange={handleInputChange}
                                min={1}
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Question Text</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="questionText"
                                value={currentQuestion.questionText}
                                onChange={handleInputChange}
                                rows={3}
                                placeholder="Enter the question text"
                            />
                        </Form.Group>
                        
                        {currentQuestion.questionType === "MULTIPLE_CHOICE" && (
                            <div className="choices-section">
                                <Form.Label>Choices</Form.Label>
                                {currentQuestion.choices.map((choice, index) => (
                                    <div key={index} className="d-flex mb-2 align-items-center">
                                        <Form.Check
                                            type="radio"
                                            name="correctAnswer"
                                            className="me-2"
                                            checked={currentQuestion.correctAnswer === index}
                                            onChange={() => handleCorrectAnswerChange(index)}
                                        />
                                        <Form.Control
                                            type="text"
                                            value={choice}
                                            onChange={(e) => handleChoiceChange(index, e.target.value)}
                                            placeholder={`Choice ${index + 1}`}
                                        />
                                        {currentQuestion.choices.length > 2 && (
                                            <Button 
                                                variant="outline-danger" 
                                                size="sm" 
                                                className="ms-2"
                                                onClick={() => removeChoice(index)}
                                            >
                                                <FaTrash />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button 
                                    variant="outline-secondary" 
                                    size="sm" 
                                    onClick={addChoice}
                                    className="mt-2"
                                >
                                    Add Choice
                                </Button>
                            </div>
                        )}
                        
                        {currentQuestion.questionType === "TRUE_FALSE" && (
                            <div className="true-false-section">
                                <Form.Label>Correct Answer</Form.Label>
                                <div>
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="True"
                                        name="trueFalseAnswer"
                                        checked={currentQuestion.correctAnswer === 1} // 1 for true, 0 for false
                                        onChange={() => handleTrueFalseChange(1)}
                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="False"
                                        name="trueFalseAnswer"
                                        checked={currentQuestion.correctAnswer === 0}
                                        onChange={() => handleTrueFalseChange(0)}
                                    />
                                </div>
                            </div>
                        )}
                        
                        {currentQuestion.questionType === "FILL_BLANK" && (
                            <div className="fill-blank-section">
                                <Form.Label>Possible Correct Answers</Form.Label>
                                {currentQuestion.possibleAnswers.map((answer, index) => (
                                    <div key={index} className="d-flex mb-2 align-items-center">
                                        <Form.Control
                                            type="text"
                                            value={answer}
                                            onChange={(e) => handlePossibleAnswerChange(index, e.target.value)}
                                            placeholder={`Possible Answer ${index + 1}`}
                                        />
                                        {currentQuestion.possibleAnswers.length > 1 && (
                                            <Button 
                                                variant="outline-danger" 
                                                size="sm" 
                                                className="ms-2"
                                                onClick={() => removePossibleAnswer(index)}
                                            >
                                                <FaTrash />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button 
                                    variant="outline-secondary" 
                                    size="sm" 
                                    onClick={addPossibleAnswer}
                                    className="mt-2"
                                >
                                    Add Possible Answer
                                </Button>
                            </div>
                        )}
                        
                        <div className="mt-4 d-flex justify-content-end">
                            <Button variant="secondary" onClick={cancelEdit} className="me-2">
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={saveQuestion}>
                                <FaSave className="me-1" /> Save Question
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        );
    };

    const renderQuestionPreview = (question: any) => {
        const isEditing = editingQuestionId === question._id;
        
        let answerPreview;
        if (question.questionType === "MULTIPLE_CHOICE") {
            answerPreview = (
                <div className="choices">
                    {question.choices?.map((choice: string, idx: number) => (
                        <div key={idx} className={`choice ${question.correctAnswer === idx ? 'text-success' : ''}`}>
                            {idx === question.correctAnswer ? '✓ ' : '○ '}{choice}
                        </div>
                    ))}
                </div>
            );
        } else if (question.questionType === "TRUE_FALSE") {
            answerPreview = (
                <div className="true-false">
                    Correct answer: <strong>{question.correctAnswer ? 'True' : 'False'}</strong>
                </div>
            );
        } else if (question.questionType === "FILL_BLANK") {
            answerPreview = (
                <div className="fill-blank">
                    Accepted answers: <strong>{question.possibleAnswers?.join(', ')}</strong>
                </div>
            );
        }
        
        return (
            <ListGroup.Item key={question._id} className="question-item">
                <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                        <div className="question-header d-flex justify-content-between">
                            <h5>{question.title}</h5>
                            <span className="text-muted">{question.points} {question.points === 1 ? 'pt' : 'pts'}</span>
                        </div>
                        <div className="question-text mb-2">{question.questionText}</div>
                        <div className="question-answers">
                            {answerPreview}
                        </div>
                    </div>
                    <div className="question-actions ms-3">
                        <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="me-2"
                            onClick={() => handleEditQuestion(question)}
                        >
                            <FaEdit />
                        </Button>
                        <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleDeleteQuestion(question._id)}
                        >
                            <FaTrash />
                        </Button>
                    </div>
                </div>
            </ListGroup.Item>
        );
    };

    return (
        <div className="quiz-questions-editor">
            {(newQuestion || editingQuestionId) ? (
                renderQuestionEditor()
            ) : (
                <div className="text-end mb-3">
                    <Button variant="primary" onClick={handleAddQuestion}>
                        <FaPlus className="me-1" /> New Question
                    </Button>
                </div>
            )}
            
            <Card>
                <Card.Header>
                    Questions
                </Card.Header>
                <ListGroup variant="flush">
                    {questions.length === 0 ? (
                        <ListGroup.Item className="text-center text-muted py-4">
                            No questions yet. Click "New Question" to add one.
                        </ListGroup.Item>
                    ) : (
                        questions.map((question: any) => renderQuestionPreview(question))
                    )}
                </ListGroup>
            </Card>
            
            {!newQuestion && !editingQuestionId && questions.length > 0 && (
                <div className="text-end mt-3">
                    <Button variant="primary" onClick={handleAddQuestion}>
                        <FaPlus className="me-1" /> Add Another Question
                    </Button>
                </div>
            )}
        </div>
    );
}