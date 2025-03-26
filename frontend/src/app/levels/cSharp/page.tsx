"use client";
import { useState } from "react";

const csharpQuestions = {
  easy: [
    {
      question: "What keyword is used to declare a variable in C#?",
      options: ["let", "var", "dim", "int"],
      answer: "var",
    },
    {
      question: "Which symbol is used for single-line comments in C#?",
      options: ["#", "//", "/*", "--"],
      answer: "//",
    },
  ],
  medium: [
    {
      question: "Which of the following is NOT a primitive type in C#?",
      options: ["int", "string", "char", "array"],
      answer: "array",
    },
  ],
  hard: [
    {
      question: "Which method is called automatically when an object is instantiated in C#?",
      options: ["Destructor", "Main()", "Constructor", "Init()"],
      answer: "Constructor",
    },
  ],
};

export default function CSharpQuiz() {
  const [level, setLevel] = useState<"easy" | "medium" | "hard" | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const startQuiz = (difficulty: "easy" | "medium" | "hard") => {
    setLevel(difficulty);
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleAnswer = (answer: string) => {
    if (answer === csharpQuestions[level!][currentQuestion].answer) {
      setScore(score + 10);
    }
    if (currentQuestion + 1 < csharpQuestions[level!].length) {
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
          <h1>C# Quiz</h1>
          <p>Select your difficulty level:</p>
          <button className="btn" onClick={() => startQuiz("easy")}>Easy</button>
          <button className="btn" onClick={() => startQuiz("medium")}>Medium</button>
          <button className="btn" onClick={() => startQuiz("hard")}>Hard</button>
        </>
      ) : (
        <>
          <h2>{csharpQuestions[level][currentQuestion].question}</h2>
          {csharpQuestions[level][currentQuestion].options.map((option, index) => (
            <button key={index} className="btn" onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
