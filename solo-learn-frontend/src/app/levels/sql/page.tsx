"use client";
import { useState } from "react";

const sqlQuestions = {
    easy: [
      {
        question: "Which SQL clause is used to filter results?",
        options: ["ORDER BY", "WHERE", "JOIN", "GROUP BY"],
        answer: "WHERE",
      },
    ],
    medium: [
      {
        question: "Which SQL function is used to count the number of rows?",
        options: ["SUM()", "AVG()", "COUNT()", "TOTAL()"],
        answer: "COUNT()",
      },
    ],
    hard: [
      {
        question: "Which SQL keyword is used to remove duplicates from a query result?",
        options: ["DELETE", "DISTINCT", "REMOVE", "FILTER"],
        answer: "DISTINCT",
      },
    ],
  };

export default function sqlQuiz() {
  const [level, setLevel] = useState<"easy" | "medium" | "hard" | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const startQuiz = (difficulty: "easy" | "medium" | "hard") => {
    setLevel(difficulty);
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleAnswer = (answer: string) => {
    if (answer === sqlQuestions[level!][currentQuestion].answer) {
      setScore(score + 10);
    }
    if (currentQuestion + 1 < sqlQuestions[level!].length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert(`Quiz Completed! 🎉 Your Score: ${score + 10}`);
      setLevel(null);
    }
  };

  return (
    <div className="container">
      {!level ? (
        <>
          <h1>SQL Quiz</h1>
          <p>Select your difficulty level:</p>
          <button className="btn" onClick={() => startQuiz("easy")}>Easy</button>
          <button className="btn" onClick={() => startQuiz("medium")}>Medium</button>
          <button className="btn" onClick={() => startQuiz("hard")}>Hard</button>
        </>
      ) : (
        <>
          <h2>{sqlQuestions[level][currentQuestion].question}</h2>
          {sqlQuestions[level][currentQuestion].options.map((option, index) => (
            <button key={index} className="btn" onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </>
      )}
    </div>
  );
}

  