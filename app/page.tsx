// app/page.tsx
"use client"

import { useState } from "react"

type QuizQuestion = {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  sourceLabel?: string
}

type Quiz = {
  title: string
  description: string
  questions: QuizQuestion[]
}

const CURRENT_QUIZ: Quiz = {
  title: "Last Week on Crypto Nutshell",
  description: "Think you paid attention this week? Let’s find out.",
  questions: [
    {
      question:
        "Roughly how much in net inflows did BlackRock’s IBIT Bitcoin ETF pull in during 2025 despite finishing the year with a negative return?",
      options: ["$25.4 billion", "$18.7 billion", "$40.0 billion", "$10.2 billion"],
      correctIndex: 0,
      explanation:
        "IBIT ranked sixth for all U.S. ETFs in 2025, pulling in about $25.4 billion of inflows even though it was down roughly 9.6 percent on the year.",
      sourceLabel: "#779 – This is strange"
    },
    {
      question:
        "After its latest equity raise, roughly how many months of preferred dividends and interest can Strategy cover using its USD reserve without selling Bitcoin?",
      options: ["24 months", "18 months", "32 months", "48 months"],
      correctIndex: 2,
      explanation:
        "Strategy’s USD Reserve now sits at about $2.19 billion, which TD Cowen noted is enough to cover roughly 32 months of preferred dividends and debt interest.",
      sourceLabel: "#780 – Strategy addresses the FUD"
    },
    {
      question:
        "According to VanEck’s latest research, approximately how much Bitcoin do digital asset treasuries now hold in aggregate?",
      options: ["2.0 million BTC", "750,000 BTC", "420,000 BTC", "1.09 million BTC"],
      correctIndex: 3,
      explanation:
        "VanEck highlighted that digital asset treasuries added around 42,000 BTC recently, bringing total holdings to about 1.09 million BTC.",
      sourceLabel: "#781 – Is this bullish?"
    },
    {
      question:
        "Roughly what percentage of the total Ethereum supply is currently locked in staking according to this week’s update?",
      options: ["45%", "29.89%", "15%", "22%"],
      correctIndex: 1,
      explanation:
        "The Christmas issue noted that about 36.07 million ETH are staked, which is 29.89 percent of the total supply, nearly one third of all ETH.",
      sourceLabel: "#782 – Locked away"
    },
    {
      question:
        "Roughly how many Bitcoin addresses currently hold a balance greater than zero, based on the latest adoption snapshot?",
      options: ["80 million", "25 million", "55.57 million", "40 million"],
      correctIndex: 2,
      explanation:
        "The Only up section put the current count at about 55.57 million addresses holding some BTC, up roughly 2.45 million so far in 2025.",
      sourceLabel: "#783 – Only up"
    }
  ]
};

type RankInfo = {
  label: string
  description: string
  className: string
}

function getRankInfo(score: number, totalQuestions: number): RankInfo {
  // tuned for 5 questions, adjust bands if you change totalQuestions
  if (score <= 1) {
    return {
      label: "Skimmer",
      description:
        "You definitely opened the emails… reading them is next week’s goal.",
      className:
        "bg-red-900/40 border-red-500 text-red-100",
    }
  }

  if (score <= 3) {
    return {
      label: "Nutshell Regular",
      description:
        "You are catching the big stories, but a few details slipped through the cracks.",
      className:
        "bg-slate-900 border-slate-600 text-slate-100",
    }
  }

  if (score === 4) {
    return {
      label: "On-Chain Observer",
      description:
        "You are paying close attention. One more right answer and you are in diehard territory.",
      className:
        "bg-indigo-900/40 border-indigo-500 text-indigo-100",
    }
  }

  return {
    label: "Nutshell Diehard",
      description:
        "You caught every story, chart, and macro take from last week’s issues. You are officially one of the Crypto Nutshell obsessives.",
      className:
        "bg-green-900/40 border-green-500 text-green-100",
  }
}

export default function HomePage() {
  const [stage, setStage] = useState<"welcome" | "quiz" | "results">("welcome")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const totalQuestions = CURRENT_QUIZ.questions.length
  const currentQuestion = CURRENT_QUIZ.questions[currentIndex]

  const handleStartQuiz = () => {
    setStage("quiz")
    setCurrentIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
  }

  const handleOptionClick = (index: number) => {
    if (showFeedback || stage !== "quiz") return

    setSelectedAnswer(index)
    setShowFeedback(true)

    if (index === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    } else {
      setStage("results")
    }
  }

  const handleRestart = () => {
    setStage("welcome")
    setCurrentIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
  }

  const questionNumber = currentIndex + 1
  const progressPercentage = (questionNumber / totalQuestions) * 100

  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-3 text-white tracking-tight">
            Crypto Nutshell Weekly Quiz
          </h1>
          <p className="text-sm md:text-base text-slate-400">
            Test your crypto knowledge
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-800 bg-neutral-950/90 backdrop-blur shadow-2xl p-6 md:p-8 lg:p-10">
          {stage === "welcome" && (
            <div className="p-4 md:p-6 text-center">
              <div className="max-w-md mx-auto space-y-3">
                <div className="text-yellow-400 text-xs md:text-sm font-semibold uppercase tracking-wider">
                  This week&apos;s quiz
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  {CURRENT_QUIZ.title}
                </h2>

                <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                  {CURRENT_QUIZ.description}
                </p>
              </div>

              <button
                onClick={handleStartQuiz}
                className="mt-6 block mx-auto w-full max-w-xs rounded-full px-8 py-3 text-sm md:text-base font-semibold bg-yellow-400 hover:bg-yellow-300 text-black transition-all hover:scale-105 active:scale-95 shadow-lg"
              >
                Start Quiz
              </button>
            </div>
          )}

          {stage === "quiz" && (
            <div className="space-y-6 py-2 md:py-4">
              {/* Progress header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs md:text-sm text-slate-400">
                  <span>
                    Question {questionNumber} of {totalQuestions}
                  </span>
                  <span className="font-semibold text-yellow-400">
                    Score: {score}/{totalQuestions}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="bg-yellow-400 h-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Question text */}
              <div className="pt-2">
                <h2 className="text-lg md:text-2xl font-bold text-white text-center leading-snug">
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQuestion.options.map((option, index) => {
                  const isCorrect = index === currentQuestion.correctIndex
                  const isSelected = index === selectedAnswer
                  const showCorrect = showFeedback && isCorrect
                  const showIncorrect = showFeedback && isSelected && !isCorrect

                  let base =
                    "w-full text-left p-4 rounded-xl border-2 text-sm md:text-base transition-all"
                  let state =
                    "border-slate-700 bg-slate-900/60 text-slate-100"

                  if (!showFeedback && isSelected) {
                    state = "border-yellow-400 bg-yellow-400/10 text-white"
                  } else if (showCorrect) {
                    state =
                      "border-green-500 bg-green-500/20 text-green-100 shadow-lg shadow-green-500/20"
                  } else if (showIncorrect) {
                    state =
                      "border-red-500 bg-red-500/20 text-red-100 shadow-lg shadow-red-500/20"
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleOptionClick(index)}
                      disabled={showFeedback}
                      className={`${base} ${state} ${
                        showFeedback
                          ? "cursor-not-allowed"
                          : "cursor-pointer hover:border-yellow-400 hover:bg-slate-800/60 active:scale-[0.98]"
                      }`}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>

              {/* Feedback + Next */}
              <div className="min-h-[160px] mt-2">
                {showFeedback && (
                  <div className="space-y-4">
                    <div className="rounded-xl bg-slate-800/60 border border-slate-700 px-5 py-4">
                      <p className="text-sm md:text-base text-slate-200 leading-relaxed">
                        {currentQuestion.explanation}
                      </p>
                      {currentQuestion.sourceLabel && (
                        <p className="text-xs text-slate-400 mt-2">
                          Source: {currentQuestion.sourceLabel}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={handleNext}
                      className="w-full inline-flex items-center justify-center rounded-full px-8 py-3 text-sm md:text-base font-semibold bg-yellow-400 hover:bg-yellow-300 text-black transition-all hover:scale-105 active:scale-95 shadow-lg"
                    >
                      {currentIndex + 1 < totalQuestions
                        ? "Next question"
                        : "See results"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

{stage === "results" && (() => {
  const { label, description, className } = getRankInfo(score, totalQuestions)

  return (
    <div className="p-6 md:p-8 text-center space-y-6">
      <div className="space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Quiz Complete
        </h2>
        <p className="text-sm md:text-base text-slate-200">
          You scored{" "}
          <span className="font-semibold text-yellow-400">{score}</span> out of{" "}
          {totalQuestions}
        </p>

        <div
          className={`mt-3 inline-flex items-center justify-center rounded-full px-4 py-1 text-xs md:text-sm font-medium border ${className}`}
        >
          {label}
        </div>

        <p className="text-sm md:text-base text-slate-300 max-w-md mx-auto mt-2">
          {description}
        </p>
      </div>

      <button
        onClick={handleRestart}
        className="mt-4 inline-flex w-full max-w-xs mx-auto items-center justify-center rounded-full px-8 py-3 text-sm md:text-base font-semibold bg-yellow-400 hover:bg-yellow-300 text-black transition-all hover:scale-105 active:scale-95 shadow-lg"
      >
        Restart quiz
      </button>
    </div>
  )
})()}
        </div>
      </div>
    </main>
  )
}