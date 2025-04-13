"use client";
import React, { useEffect, useState } from "react";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  Language: string;
  hint: string;
}

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await fetch("/api/flashcards");
        if (!response.ok) {
          throw new Error("Failed to fetch flashcards");
        }
        const data = await response.json();
        setFlashcards(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlashcards();
  }, []);

  const handleSubmit = () => {
    if (!userAnswer.trim()) {
      setFeedback("Please enter an answer");
      return;
    }

    const correctAnswer = flashcards[currentIndex].answer.trim().toLowerCase();
    const userResponse = userAnswer.trim().toLowerCase();

    if (userResponse === correctAnswer) {
      setFeedback("✅ Correct!");
      setShowHint(false);
    } else {
      setFeedback("❌ Incorrect. Try again!");
      setShowHint(true);
    }
  };

  const handleNext = () => {
    setUserAnswer("");
    setFeedback("");
    setShowHint(false);
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => 
      flashcards.length > 0 ? (prevIndex + 1) % flashcards.length : 0
    );
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setFeedback("The correct answer is shown below");
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Loading flashcards...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (flashcards.length === 0) {
    return (
      <div className="empty-container">
        <p>No flashcards available</p>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];

  return (
    <div className="flashcard-container">
      <div className="flashcard">
        <h2>Flashcards Practice</h2>
        
        <div className="progress">
          Question {currentIndex + 1} of {flashcards.length}
        </div>

        <h3 className="question">{currentCard.question}</h3>

        <div className="language-tag">
          Language: {currentCard.Language}
        </div>

        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="answer-input"
          onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
        />

        <div className="button-group">
          <button onClick={handleSubmit} className="submit-btn">
            Check Answer
          </button>
          <button onClick={handleShowAnswer} className="show-answer-btn">
            Show Answer
          </button>
        </div>

        {feedback && <div className="feedback">{feedback}</div>}

        {showHint && (
          <div className="hint">
            Hint: {currentCard.hint}
          </div>
        )}

        {showAnswer && (
          <div className="correct-answer">
            Correct Answer: {currentCard.answer}
          </div>
        )}

        <button onClick={handleNext} className="next-btn">
          Next Question
        </button>
      </div>
    </div>
  );
}

// CSS (can be in a separate file or CSS-in-JS)
const styles = `
  .flashcard-container {
    background-color: #b2f5f0;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .flashcard {
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 500px;
  }

  .progress {
    text-align: center;
    margin-bottom: 10px;
    color: #666;
    font-size: 0.9rem;
  }

  .question {
    font-weight: bold;
    margin-bottom: 20px;
    min-height: 60px;
  }

  .language-tag {
    background-color: #f0f0f0;
    padding: 5px 10px;
    border-radius: 15px;
    display: inline-block;
    margin-bottom: 15px;
    font-size: 0.8rem;
  }

  .answer-input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
  }

  .button-group {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
  }

  button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    flex: 1;
  }

  .submit-btn {
    background-color: #007bff;
    color: white;
  }

  .show-answer-btn {
    background-color: #6c757d;
    color: white;
  }

  .next-btn {
    background-color: #28a745;
    color: white;
    width: 100%;
  }

  .feedback {
    margin: 15px 0;
    padding: 10px;
    border-radius: 5px;
    background-color: #f8f9fa;
  }

  .hint {
    font-style: italic;
    color: #666;
    margin-bottom: 15px;
    padding: 10px;
    background-color: #fff8e1;
    border-left: 3px solid #ffc107;
  }

  .correct-answer {
    margin: 15px 0;
    padding: 10px;
    background-color: #e8f5e9;
    border-left: 3px solid #4caf50;
    font-weight: bold;
  }

  .loading-container,
  .error-container,
  .empty-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #b2f5f0;
  }
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}