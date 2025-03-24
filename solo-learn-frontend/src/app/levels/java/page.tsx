"use client";
import { useState } from "react";

const javaQuestions = {
  easy: [
    {
      question: "What is the default value of an uninitialized int variable in Java?",
      options: ["0", "null", "undefined", "Compilation Error"],
      answer: "0",
    },
    {
      question: "Which keyword is used to define a constant in Java?",
      options: ["let", "final", "const", "static"],
      answer: "final",
    },
  ],
  medium: [
    {
      question: "What does the `static` keyword do in Java?",
      options: [
        "Makes a variable constant",
        "Defines a class-level variable or method",
        "Makes a class inherit another",
        "None of the above",
      ],
      answer: "Defines a class-level variable or method",
    },
  ],
  hard: [
    {
      question: "What is the time complexity of accessing an element in an ArrayList?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      answer: "O(1)",
    },
  ],
};

export default function JavaQuiz() {
  const [level, setLevel] = useState<"easy" | "medium" | "hard" | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const startQuiz = (difficulty: "easy" | "medium" | "hard") => {
    setLevel(difficulty);
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleAnswer = (answer: string) => {
    if (answer === javaQuestions[level!][currentQuestion].answer) {
      setScore(score + 10);
    }
    if (currentQuestion + 1 < javaQuestions[level!].length) {
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
          <h1>Java Quiz</h1>
          <p>Select your difficulty level:</p>
          <button className="btn" onClick={() => startQuiz("easy")}>Easy</button>
          <button className="btn" onClick={() => startQuiz("medium")}>Medium</button>
          <button className="btn" onClick={() => startQuiz("hard")}>Hard</button>
        </>
      ) : (
        <>
          <h2>{javaQuestions[level][currentQuestion].question}</h2>
          {javaQuestions[level][currentQuestion].options.map((option, index) => (
            <button key={index} className="btn" onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </>
      )}
    </div>
  );
}

