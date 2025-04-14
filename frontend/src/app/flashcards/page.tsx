"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/flashcards");
        if (!response.ok) throw new Error("Failed to load flashcards");
        const result = await response.json();
        const rawData = Array.isArray(result) ? result : result.data || [];
        const validatedData = rawData.map((item: any) => ({
          id: item.id || Math.random().toString(36).substring(2, 9),
          question: item.question.trim(),
          answer: item.answer.trim(),
          Language: item.Language?.trim() || "general",
          hint: generateDynamicHint(item.question, item.Language)
        }));
        setFlashcards(validatedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading cards");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFlashcards();
  }, []);

  const generateDynamicHint = (question: string, language: string): string => {
    const lang = language.toLowerCase();
    const questionLower = question.toLowerCase();
    const hints = [];

    if (lang.includes('python')) {
      if (questionLower.includes('output') && questionLower.includes('for')) hints.push("Trace the loop iterations step by step");
      if (questionLower.includes('list comprehension')) hints.push("List comprehensions create new lists by transforming each element");
      if (questionLower.includes('*')) hints.push("In Python, * can multiply strings or numbers");
      if (questionLower.includes('tuple')) hints.push("Tuples are immutable sequences");
      if (questionLower.includes('dictionary') || questionLower.includes('get(')) hints.push("dict.get() returns a default if key not found");
      if (questionLower.includes('recur') || questionLower.includes('recursion')) hints.push("Recursive functions need a base case");
      if (questionLower.includes('slice') || question.includes('[::-1]')) hints.push("[::-1] reverses a sequence");
    }

    if (lang.includes('java')) {
      if (questionLower.includes('output') && questionLower.includes('for')) hints.push("Track variable changes through each loop iteration");
      if (questionLower.includes('%')) hints.push("% is the modulus (remainder) operator");
      if (questionLower.includes('extends')) hints.push("extends creates class inheritance");
      if (questionLower.includes('final')) hints.push("final prevents method overriding");
      if (questionLower.includes('array') || questionLower.includes('length')) hints.push("array.length gives array size");
      if (questionLower.includes('primitive')) hints.push("Primitives: byte, short, int, long, float, double, char, boolean");
    }

    if (lang.includes('c#')) {
      if (questionLower.includes('??')) hints.push("?? is the null-coalescing operator");
      if (questionLower.includes('int?')) hints.push("int? is a nullable integer");
      if (questionLower.includes('reverse')) hints.push(".Reverse() reverses a sequence");
      if (questionLower.includes('linq')) hints.push("LINQ provides query capabilities");
      if (questionLower.includes('try-catch')) hints.push("finally always executes");
      if (questionLower.includes('parse') || questionLower.includes('convert')) hints.push("Both int.Parse() and Convert.ToInt32() work");
    }

    if (questionLower.includes('output')) hints.push("Trace the code execution line by line");
    if (questionLower.includes('error')) hints.push("Check for type mismatches or invalid operations");
    if (questionLower.includes('debug')) hints.push("Use step-through debugging to inspect values");
    if (questionLower.includes('multiple choice')) hints.push("Eliminate obviously wrong options first");

    return hints.length > 0 ? hints.join(' • ') : `Review ${language} fundamentals`;
  };

  const handleSubmit = () => {
    if (!userAnswer.trim()) {
      setFeedback("Please enter an answer");
      return;
    }
    const correctAnswer = flashcards[currentIndex].answer.trim().toLowerCase();
    const userResponse = userAnswer.trim().toLowerCase();
    setFeedback(userResponse === correctAnswer ? "✅ Correct!" : "❌ Incorrect. Try again!");
    setShowHint(userResponse !== correctAnswer);
  };

  const handleNext = () => {
    setUserAnswer("");
    setFeedback("");
    setShowHint(false);
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const toggleShowAnswer = () => {
    setShowAnswer(!showAnswer);
    if (!showAnswer) {
      setFeedback("Answer revealed");
    }
  };

  if (isLoading) return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading flashcards...</p>
    </div>
  );

  if (error) return (
    <div className="error">
      <h3>Error</h3>
      <p>{error}</p>
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  );

  if (flashcards.length === 0) return (
    <div className="empty">
      <h3>No Flashcards Found</h3>
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  );

  return (
    <div className="container">


      {/* Back Button */}
      <button className="back-button" onClick={() => router.push("/levels")}>
        ← Back to Levels
      </button>

      <div className="card">
        <div className={`lang ${flashcards[currentIndex].Language.toLowerCase()}`}>
          {flashcards[currentIndex].Language}
        </div>
        <div className="question">
          <pre>{flashcards[currentIndex].question}</pre>
        </div>
        
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Your answer..."
          className="answer-input"
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        <div className="buttons">
          <button className="submit" onClick={handleSubmit} disabled={!userAnswer.trim()}>
            Submit
          </button>
          <button className="hint" onClick={() => setShowHint(!showHint)}>
            {showHint ? "Hide Hint" : "Show Hint"}
          </button>
          <button className="show-answer" onClick={toggleShowAnswer}>
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>
        </div>

        {feedback && (
          <div className={`feedback ${feedback.includes("✅") ? "correct" : "incorrect"}`}>
            {feedback}
          </div>
        )}

        {showHint && (
          <div className="hint-box">
            <p>{flashcards[currentIndex].hint}</p>
          </div>
        )}

        {showAnswer && (
          <div className="answer-box">
            <p><strong>Answer:</strong> {flashcards[currentIndex].answer}</p>
          </div>
        )}

        <button className="next" onClick={handleNext}>
          Next Question →
        </button>
      </div>

      <style jsx>{`
        .container {
          max-width: 700px;
          margin: 2rem auto;
          padding: 1rem;
        }
        
        .card {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          position: relative;
        }
        
        .lang {
          position: absolute;
          top: -10px;
          right: 20px;
          padding: 0.25rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          color: white;
        }
        
        .lang.python {
          background: #3776ab;
        }
        
        .lang.java {
          background: #f89820;
        }
        
        .lang.c\\# {
          background: #178600;
        }
        
        .question pre {
          white-space: pre-wrap;
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
          font-family: 'Courier New', monospace;
          margin: 1rem 0;
        }
        
        .answer-input {
          width: 100%;
          padding: 1rem;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 1rem;
          margin: 1rem 0;
        }
        
        .answer-input:focus {
          outline: none;
          border-color: #4361ee;
          box-shadow: 0 0 0 3px rgba(67,97,238,0.2);
        }
        
        .buttons {
          display: flex;
          gap: 1rem;
          margin: 1rem 0;
        }
        
        button {
          padding: 1rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 1rem;
          flex: 1;
        }
        
        .submit {
          background: #4361ee;
          color: white;
        }
        
        .submit:hover {
          background: #3a56d4;
        }
        
        .submit:disabled {
          background: #adb5bd;
          cursor: not-allowed;
        }
        
        .hint {
          background: #f8961e;
          color: white;
        }
        
        .hint:hover {
          background: #e07c0c;
        }
        
        .show-answer {
          background: #7209b7;
          color: white;
        }
        
        .show-answer:hover {
          background: #5a08a0;
        }
        
        .next {
          background: #4cc9f0;
          color: white;
          width: 100%;
          margin-top: 1rem;
        }
        
        .next:hover {
          background: #3ab7e0;
        }
        
        .feedback {
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem 0;
          text-align: center;
          font-weight: 500;
        }
        
        .correct {
          background: rgba(76,201,240,0.1);
          color: #4cc9f0;
          border: 1px solid #4cc9f0;
        }
        
        .incorrect {
          background: rgba(239,35,60,0.1);
          color: #ef233c;
          border: 1px solid #ef233c;
        }
        
        .hint-box {
          background: #fff9e6;
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem 0;
          border-left: 4px solid #f8961e;
        }
        
        .answer-box {
          background: #f0f9ff;
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem 0;
          border-left: 4px solid #4361ee;
        }
        
        .loading, .error, .empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 50vh;
          text-align: center;
        }
        
        .spinner {
          border: 4px solid rgba(0,0,0,0.1);
          border-radius: 50%;
          border-top: 4px solid #4361ee;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .error, .empty {
          color: #ef233c;
        }
        
        .error button, .empty button {
          background: #ef233c;
          color: white;
          margin-top: 1rem;
          padding: 0.75rem 1.5rem;
        }
        
        @media (max-width: 768px) {
          .container {
            padding: 0.5rem;
          }
          
          .card {
            padding: 1.5rem;
          }
          
          .buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}