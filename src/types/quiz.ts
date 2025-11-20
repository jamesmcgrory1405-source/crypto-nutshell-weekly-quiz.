export type WeeklyQuizQuestion = {
  id: string
  question: string
  options: string[] // Always 4 options
  correctIndex: number // 0 to 3
  explanation: string // 1 or 2 sentences
  sourceLabel?: string // Short label like "Monday Daily" or "Pro #35"
}

export type WeeklyQuiz = {
  id: string // For example "2025-11-24"
  title: string // For example "Week of 24 November 2025"
  description: string
  questions: WeeklyQuizQuestion[]
}

