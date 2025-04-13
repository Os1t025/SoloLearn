"use client";
import { useState, useEffect } from "react";

export default function SqlQuiz() {
  const [level, setLevel] = useState<"easy" | "medium" | "hard" | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true); 

  const startQuiz = (difficulty: "easy" | "medium" | "hard") => {
    setLevel(difficulty);
    setCurrentQuestion(0);
    setScore(0);
    setLoading(true); 
  };

  // Fetch questions from the backend based on the selected difficulty level
  useEffect(() => {
    if (level) {
      setLoading(true); 
      fetch(`http://localhost:8000/get-questions-sql.php?level=${level}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            setQuestions(data); 
          }
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
        })
        .finally(() => {
          setLoading(false); 
        });
    }
  }, [level]); 

  // Function to get points based on difficulty level
  const getPointsForLevel = (level: "easy" | "medium" | "hard") => {
    switch (level) {
      case "easy":
        return 10;
      case "medium":
        return 20;
      case "hard":
        return 50;
      default:
        return 0;
    }
  };

  // Function to handle the answer selection
  const handleAnswer = (answer: string) => {
    const pointsForLevel = getPointsForLevel(level!); 

    if (questions[currentQuestion]?.answer === answer) {
      setScore(score + pointsForLevel); 
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1); 
    } else {
      const finalScore = score + (questions[currentQuestion]?.answer === answer ? pointsForLevel : 0);

      const userId = localStorage.getItem("user_id"); 

      fetch("http://localhost:8000/update-points.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          points: finalScore,
          reason: `SQL Quiz - ${level} level`,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(`Quiz Completed! 🎉 Your Score: ${finalScore}\n${data.message}`);
          localStorage.setItem("xp", (parseInt(localStorage.getItem("xp") || "0") + finalScore).toString());
        })
        .catch((err) => {
          console.error("Failed to submit score:", err);
          alert(`Quiz Completed! 🎉 Your Score: ${finalScore} (but couldn't save to server)`);
        });

      setLevel(null); 
      setCurrentQuestion(0); 
      setScore(0); 
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
            <p>Loading questions...</p> 
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
                <p>No questions available.</p> 
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

