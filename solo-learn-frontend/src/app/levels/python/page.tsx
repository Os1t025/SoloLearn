"use client";
import { useState } from "react";

const pythonQuestions = {
  easy: [
    {
      question: "What is the output of `print(2 ** 3)` in Python?",
      options: ["5", "6", "8", "9"],
      answer: "8",
    },
    {
      question: "Which keyword is used to define a function in Python?",
      options: ["func", "define", "def", "lambda"],
      answer: "def",
    },
  ],
  medium: [
    {
      question: "What is the output of `list(range(5))`?",
      options: ["[0,1,2,3,4]", "[1,2,3,4,5]", "(0,1,2,3,4)", "[1,2,3,4]"],
      answer: "[0,1,2,3,4]",
    },
  ],
  hard: [
    {
      question: "What is the time complexity of inserting an element at the end of a Python list?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
      answer: "O(1)",
    },
  ],
};

export default function PythonQuiz() {
  const [level, setLevel] = useState<"easy" | "medium" | "hard" | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const startQuiz = (difficulty: "easy" | "medium" | "hard") => {
    setLevel(difficulty);
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleAnswer = (answer: string) => {
    if (answer === pythonQuestions[level!][currentQuestion].answer) {
      setScore(score + 10);
    }
    if (currentQuestion + 1 < pythonQuestions[level!].length) {
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
          <h1>Python Quiz</h1>
          <p>Select your difficulty level:</p>
          <button className="btn" onClick={() => startQuiz("easy")}>Easy</button>
          <button className="btn" onClick={() => startQuiz("medium")}>Medium</button>
          <button className="btn" onClick={() => startQuiz("hard")}>Hard</button>
        </>
      ) : (
        <>
          <h2>{pythonQuestions[level][currentQuestion].question}</h2>
          {pythonQuestions[level][currentQuestion].options.map((option, index) => (
            <button key={index} className="btn" onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
