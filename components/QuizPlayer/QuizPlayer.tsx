"use client";

import { useState } from "react";

import QuizQuestion from "./QuizQuestion";
import QuizNavigation from "./QuizNavigation";
import QuizPalette from "./QuizPalette";
import QuizResult from "./QuizResult";
import ReviewAnswers from "./ReviewAnswers";
import SubmitDialog from "./SubmitDialog";

type MCQ = {
  question: string;
  options: string[];
  answer: string;
};

type Props = {
  mcqs: MCQ[];
  onDownloadPDF: () => void;
  onNewQuiz: () => void;
};

export default function QuizPlayer({
  mcqs,
  onDownloadPDF,
  onNewQuiz,
}: Props) {
  const [activeMcqs, setActiveMcqs] = useState(mcqs);

  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(mcqs.length).fill(null)
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [quizFinished, setQuizFinished] = useState(false);

  const [reviewMode, setReviewMode] = useState(false);

  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  const [score, setScore] = useState(0);

  function selectAnswer(answer: string) {
    const updated = [...answers];
    updated[currentQuestion] = answer;
    setAnswers(updated);
  }

  function nextQuestion() {
    if (currentQuestion < activeMcqs.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  }

  function previousQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }

  function submitQuiz() {
  const unanswered = answers.filter(
    (answer) => answer === null
  ).length;

  if (unanswered > 0) {
    setShowSubmitDialog(true);
    return;
  }

  finishQuiz();
}

function finishQuiz() {
  let correct = 0;

  activeMcqs.forEach((mcq, index) => {
    if (answers[index] === mcq.answer) {
      correct++;
    }
  });

  setScore(correct);
  setQuizFinished(true);
}

const unanswered = answers.filter(
  (answer) => answer === null
).length;

function retryWrongQuestions() {
  const wrongQuestions = activeMcqs.filter(
    (mcq, index) => answers[index] !== mcq.answer
  );

  if (wrongQuestions.length === 0) return;

  setActiveMcqs(wrongQuestions);
  setAnswers(Array(wrongQuestions.length).fill(null));
  setCurrentQuestion(0);
  setScore(0);
  setQuizFinished(false);
  setReviewMode(false);
}

if (reviewMode) {
  return (
    <ReviewAnswers
      mcqs={activeMcqs}
      answers={answers}
      onBack={() => setReviewMode(false)}
    />
  );
}

if (quizFinished) {
  return (
    <QuizResult
      score={score}
      total={activeMcqs.length}
      hasWrongQuestions={score < activeMcqs.length}
      onReview={() => setReviewMode(true)}
      onRetryWrong={retryWrongQuestions}
      onDownloadPDF={onDownloadPDF}
      onNewQuiz={onNewQuiz}
    />
  );
}

  return (
    
    <div className="mx-auto max-w-3xl">

      {showSubmitDialog && (
  <SubmitDialog
    unanswered={unanswered}
    onReview={() => setShowSubmitDialog(false)}
    onSubmit={() => {
      setShowSubmitDialog(false);
      finishQuiz();
    }}
  />
)}

      <QuizPalette
        currentQuestion={currentQuestion}
        answers={answers}
        onJump={setCurrentQuestion}
      />

      <QuizQuestion
        mcq={activeMcqs[currentQuestion]}
        currentQuestion={currentQuestion}
        totalQuestions={activeMcqs.length}
        selectedAnswer={answers[currentQuestion]}
        onSelectAnswer={selectAnswer}
      />

      <QuizNavigation
        isFirst={currentQuestion === 0}
        isLast={currentQuestion === activeMcqs.length - 1}
        onPrevious={previousQuestion}
        onNext={nextQuestion}
        onSubmit={submitQuiz}
      />
    </div>
  );
}