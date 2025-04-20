import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api`;
const axiosWithCredentials = axios.create({ withCredentials: true });

// Quiz operations
export const fetchQuizzesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/courses/${courseId}/quizzes`);
  return response.data;
};

export const fetchQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/quizzes/${quizId}`);
  return response.data;
};

export const createQuiz = async (courseId: string, quiz: { title: string; course: string | undefined; createdBy: any; }) => {
  const response = await axiosWithCredentials.post(`${QUIZZES_API}/courses/${courseId}/quizzes`, quiz);
  return response.data;
};

export const updateQuiz = async (quizId: string, quizUpdates: { course: string | undefined; title: string; description: string; quizType: string; points: number; assignmentGroup: string; shuffleAnswers: boolean; timeLimit: number; multipleAttempts: boolean; attemptsAllowed: number; showCorrectAnswers: boolean; accessCode: string; oneQuestionAtATime: boolean; webcamRequired: boolean; lockQuestionsAfterAnswering: boolean; dueDate: string; availableDate: string; availableUntilDate: string; }) => {
  const response = await axiosWithCredentials.put(`${QUIZZES_API}/quizzes/${quizId}`, quizUpdates);
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(`${QUIZZES_API}/quizzes/${quizId}`);
  return response.data;
};

export const publishQuiz = async (quizId: string, published: boolean) => {
  const response = await axiosWithCredentials.put(`${QUIZZES_API}/quizzes/${quizId}/publish`, { published });
  return response.data;
};

// Question operations
export const fetchQuestionsForQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/quizzes/${quizId}/questions`);
  return response.data;
};

// Question operations (continued)
export const fetchQuestion = async (questionId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/questions/${questionId}`);
    return response.data;
  };
  
  export const createQuestion = async (quizId: string, question: { quiz: string; _id: string; title: string; questionType: string; points: number; questionText: string; choices: string[]; correctAnswer: number; possibleAnswers: string[]; }) => {
    const response = await axiosWithCredentials.post(`${QUIZZES_API}/quizzes/${quizId}/questions`, question);
    return response.data;
  };
  
  export const updateQuestion = async (questionId: string, questionUpdates: { _id: string; title: string; questionType: string; points: number; questionText: string; choices: string[]; correctAnswer: number; possibleAnswers: string[]; }) => {
    const response = await axiosWithCredentials.put(`${QUIZZES_API}/questions/${questionId}`, questionUpdates);
    return response.data;
  };
  
  export const deleteQuestion = async (questionId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/questions/${questionId}`);
    return response.data;
  };
  
  export const reorderQuestions = async (quizId: string, questions: any) => {
    const response = await axiosWithCredentials.put(`${QUIZZES_API}/quizzes/${quizId}/questions/reorder`, questions);
    return response.data;
  };
  
  // Quiz attempt operations
  export const fetchAttemptsForQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/quizzes/${quizId}/attempts`);
    return response.data;
  };
  
  export const fetchStudentAttempts = async (studentId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/students/${studentId}/attempts`);
    return response.data;
  };
  
  export const fetchStudentAttemptsForQuiz = async (studentId: string, quizId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/students/${studentId}/quizzes/${quizId}/attempts`);
    return response.data;
  };
  
  export const fetchAttempt = async (attemptId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/attempts/${attemptId}`);
    return response.data;
  };
  
  export const createAttempt = async (quizId: string) => {
    const response = await axiosWithCredentials.post(`${QUIZZES_API}/quizzes/${quizId}/attempts`);
    return response.data;
  };
  
  export const submitAttempt = async (attemptId: string, answers: any) => {
    const response = await axiosWithCredentials.put(`${QUIZZES_API}/attempts/${attemptId}/submit`, { answers });
    return response.data;
  };
  
  export const fetchLatestAttempt = async (studentId: string, quizId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/students/${studentId}/quizzes/${quizId}/latest-attempt`);
    return response.data;
  };