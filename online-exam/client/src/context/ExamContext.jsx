import { createContext, useContext, useState } from "react";

const ExamContext = createContext(null);

export function ExamProvider({ children }) {
  const [activeExam, setActiveExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());

  const updateAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const toggleFlag = (questionIndex) => {
    setFlaggedQuestions((prev) => {
      const next = new Set(prev);
      next.has(questionIndex) ? next.delete(questionIndex) : next.add(questionIndex);
      return next;
    });
  };

  const resetExam = () => {
    setActiveExam(null);
    setAnswers({});
    setCurrentQuestion(0);
    setFlaggedQuestions(new Set());
  };

  return (
    <ExamContext.Provider
      value={{
        activeExam,
        setActiveExam,
        answers,
        updateAnswer,
        currentQuestion,
        setCurrentQuestion,
        flaggedQuestions,
        toggleFlag,
        resetExam,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
}

export const useExam = () => {
  const ctx = useContext(ExamContext);
  if (!ctx) throw new Error("useExam must be used within ExamProvider");
  return ctx;
};