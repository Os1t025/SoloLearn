"use client";
import { useState, useEffect } from "react";

export default function SqlQuiz() {
  const [level, setLevel] = useState<"easy" | "medium" | "hard" | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]); // Store fetched questions
  const [loading, setLoading] = useState(true); // Loading state

  const startQuiz = (difficulty: "easy" | "medium" | "hard") => {
    setLevel(difficulty);
    setCurrentQuestion(0);
    setScore(0);
    setLoading(true); // Set loading to true when starting the quiz
  };

  // Fetch questions from the backend based on the selected difficulty level
  useEffect(() => {
    if (level) {
      setLoading(true); // Set loading to true when starting to fetch
      fetch(`http://localhost:8000/get-questions-sql.php?level=${level}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            setQuestions(data); // Set the fetched questions
          }
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
        })
        .finally(() => {
          setLoading(false); // Set loading to false once the fetch is complete
        });
    }
  }, [level]); // Run the effect whenever `level` changes

  // Function to handle the answer selection
  const handleAnswer = (answer: string) => {
    if (questions[currentQuestion]?.answer === answer) {
      setScore(score + 10); // Increment score for correct answer
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1); // Move to the next question
    } else {
      alert(`Quiz Completed! 🎉 Your Score: ${score + 10}`);
      setLevel(null); // Reset quiz after completion
      setCurrentQuestion(0); // Reset current question index
      setScore(0); // Reset score
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
          {loading ? (
            <p>Loading questions...</p> // Display a loading message while questions are being fetched
          ) : (
            <>
              {/* Ensure the current question exists */}
              {questions[currentQuestion] ? (
                <>
                  <h2>{questions[currentQuestion].question}</h2>
                  {questions[currentQuestion]?.options?.map((option: string, index: number) => (
                    <button key={index} className="btn" onClick={() => handleAnswer(option)}>
                      {option}
                    </button>
                  ))}
                </>
              ) : (
                <p>No questions available.</p> // Fallback if no questions exist
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
