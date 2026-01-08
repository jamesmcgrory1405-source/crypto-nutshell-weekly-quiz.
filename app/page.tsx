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
        "Roughly what percentage of all Bitcoin is currently held by short-term holders (less than six months) according to the latest HODL Waves update?",
      options: ["22%", "31.77%", "45%", "60%"],
      correctIndex: 1,
      explanation:
        "Issue #789 noted that 31.77% of all Bitcoin is held by short-term holders, down from 35.08% two weeks earlier.",
      sourceLabel: "#789 – Ageing up"
    },
    {
      question:
        "According to Bank of America’s new guidance, what digital asset allocation range did CIO Chris Hyzy say could be appropriate for some client portfolios?",
      options: ["0.5% to 1%", "1% to 4%", "5% to 10%", "10% to 20%"],
      correctIndex: 1,
      explanation:
        "In issue #790, Bank of America’s CIO Chris Hyzy said that for investors comfortable with volatility, a modest allocation of 1% to 4% in digital assets could be appropriate.",
      sourceLabel: "#790 – Buy Bitcoin they say"
    },
    {
      question:
        "What did MSCI decide to do with Digital Asset Treasury (DAT) companies like Strategy in its February index review?",
      options: [
        "Immediately exclude all DATs from its indexes",
        "Exclude only DATs with more than 75% of assets in digital assets",
        "Keep the current treatment for now while continuing to study DATs",
        "Limit DATs to a 1% maximum weight in any index"
      ],
      correctIndex: 2,
      explanation:
        "Issue #791 reported that MSCI will, for the time being, keep the current index treatment for companies whose digital asset holdings are 50% or more of total assets, while it continues a broader review.",
      sourceLabel: "#791 – Some good news"
    },
    {
      question:
        "What major change to its capital structure is BitMine asking shareholders to approve?",
      options: [
        "Reducing authorized shares from 500 million to 50 million",
        "Increasing authorized shares from 500 million to 5 billion",
        "Increasing authorized shares from 500 million to 50 billion",
        "Authorizing only a single new class of preferred shares"
      ],
      correctIndex: 2,
      explanation:
        "In issue #792, BitMine proposed increasing its authorized share count from 500 million to 50 billion to give it maximum flexibility to raise capital and buy more ETH.",
      sourceLabel: "#792 – Ethereum treasury expansion"
    },
    {
      question:
        "Roughly how many wallets now hold at least some Bitcoin according to the latest adoption update?",
      options: ["25 million", "40 million", "57.75 million", "80 million"],
      correctIndex: 2,
      explanation:
        "Issue #793 highlighted that there are now 57.75 million wallets holding Bitcoin, up about 100,000 in two weeks and 3.28 million since the start of 2025.",
      sourceLabel: "#793 – Only up"
    }
  ]
}

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