import { useState, useRef } from 'react'
import { WeeklyQuiz, WeeklyQuizQuestion } from '../types/quiz'

export function useWeeklyQuiz(quiz: WeeklyQuiz) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    new Array(quiz.questions.length).fill(-1)
  )
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  
  // Track which questions have already contributed to the score
  // This prevents double-scoring even if answerQuestion is called multiple times
  const scoredQuestionsRef = useRef<Set<number>>(new Set())

  const currentQuestion: WeeklyQuizQuestion = quiz.questions[currentIndex]
  const totalQuestions = quiz.questions.length

  const answerQuestion = (selectedIndex: number) => {
    const questionIndex = currentIndex
    
    // Check if this question was already answered
    setSelectedAnswers((prevAnswers) => {
      const wasAlreadyAnswered = prevAnswers[questionIndex] !== -1
      
      // Always update the selected answer
      const newAnswers = [...prevAnswers]
      newAnswers[questionIndex] = selectedIndex

      // Only update score if:
      // 1. This question hasn't been answered yet (in selectedAnswers)
      // 2. This question hasn't already contributed to the score (in scoredQuestionsRef)
      // 3. The selected answer is correct
      if (!wasAlreadyAnswered && !scoredQuestionsRef.current.has(questionIndex)) {
        const correctIndex = quiz.questions[questionIndex].correctIndex
        if (selectedIndex === correctIndex) {
          scoredQuestionsRef.current.add(questionIndex)
          setScore((prevScore) => prevScore + 1)
        }
      }

      return newAnswers
    })
  }

  const goToNextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setFinished(true)
    }
  }

  const resetQuiz = () => {
    setCurrentIndex(0)
    setSelectedAnswers(new Array(quiz.questions.length).fill(-1))
    setScore(0)
    setFinished(false)
    scoredQuestionsRef.current.clear()
  }

  return {
    currentQuestion,
    currentIndex,
    totalQuestions,
    selectedAnswers,
    score,
    finished,
    answerQuestion,
    goToNextQuestion,
    resetQuiz,
  }
}

