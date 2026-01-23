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
        "Roughly what percentage of all Bitcoin is currently held by short-term holders (coins held for less than six months), according to the latest HODL Waves breakdown?",
      options: ["27.5%", "31.3%", "35.1%", "29.9%"],
      correctIndex: 1,
      explanation:
        "Short-term holders control about 31.28% of Bitcoin supply, down from 31.77% two weeks ago, as coins quietly age into longer holding bands.",
      sourceLabel: "#799 – More drama"
    },
    {
      question:
        "Roughly how much money flowed into digital asset funds last week, marking the largest weekly inflow since just before the October 10 crash?",
      options: ["$870 million", "$1.35 billion", "$3.05 billion", "$2.17 billion"],
      correctIndex: 3,
      explanation:
        "Digital asset funds saw about $2.17 billion in net inflows, with Bitcoin taking the lion's share and Ethereum close behind, signalling that capital is starting to return in size.",
      sourceLabel: "#800 – Back with a bang"
    },
    {
      question:
        "During this week’s macro-driven pullback, how many bitcoin did Strategy buy for its balance sheet in its largest purchase in nine months?",
      options: ["22,300 BTC", "8,500 BTC", "14,800 BTC", "35,000 BTC"],
      correctIndex: 0,
      explanation:
        "Strategy stepped in and bought 22,300 BTC for roughly $2.1 billion, reinforcing that the biggest corporate holder is accumulating into weakness, not selling.",
      sourceLabel: "#801 – Is it over?"
    },
    {
      question:
        "Roughly what percentage of the entire Ethereum supply is now locked in staking, according to the latest update?",
      options: ["18%", "24%", "30%", "36%"],
      correctIndex: 2,
      explanation:
        "About 36.31 million ETH are staked, equal to roughly 30% of total supply, which tightens the liquid float and sets up stronger moves when demand returns.",
      sourceLabel: "#802 – The setup"
    },
    {
      question:
        "Approximately how many wallets now hold at least some Bitcoin (a balance greater than zero), as reported in the latest on-chain section?",
      options: ["42.5 million", "57.85 million", "64.2 million", "51.3 million"],
      correctIndex: 1,
      explanation:
        "There are about 57.85 million wallets with a non-zero BTC balance, up another 100,000 in two weeks, showing that holder count keeps rising despite choppy price action.",
      sourceLabel: "#803 – Only up"
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