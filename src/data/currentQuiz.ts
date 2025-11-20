import { WeeklyQuiz } from '../types/quiz'

export const CURRENT_QUIZ: WeeklyQuiz = {
  id: '2025-11-24',
  title: 'Week of 24 November 2025',
  description: 'Test your knowledge with 5 questions from this week\'s Crypto Nutshell newsletters.',
  questions: [
    {
      id: 'q1',
      question: 'What is the primary mechanism that Bitcoin uses to adjust mining difficulty approximately every two weeks?',
      options: [
        'Difficulty Adjustment Algorithm (DAA)',
        'Proof of Stake consensus',
        'Hash rate targeting',
        'Block time averaging'
      ],
      correctIndex: 0,
      explanation: 'Bitcoin uses the Difficulty Adjustment Algorithm (DAA) to automatically adjust mining difficulty every 2016 blocks (approximately every two weeks) based on the time it took to mine the previous 2016 blocks.',
      sourceLabel: 'Monday Daily'
    },
    {
      id: 'q2',
      question: 'Which Ethereum improvement proposal (EIP) introduced the concept of account abstraction, allowing smart contracts to act as wallets?',
      options: [
        'EIP-1559',
        'EIP-4337',
        'EIP-4844',
        'EIP-3074'
      ],
      correctIndex: 1,
      explanation: 'EIP-4337 introduced account abstraction without requiring changes to the Ethereum protocol consensus layer, enabling smart contracts to function as wallets with custom validation logic.',
      sourceLabel: 'Pro #35'
    },
    {
      id: 'q3',
      question: 'As of November 2025, approximately how many spot Bitcoin ETFs are trading in the United States?',
      options: [
        '5-7 ETFs',
        '8-10 ETFs',
        '11-13 ETFs',
        '14+ ETFs'
      ],
      correctIndex: 2,
      explanation: 'Following the SEC approval in January 2024, multiple asset managers launched spot Bitcoin ETFs, with the number growing to approximately 11-13 actively trading ETFs by late 2025.',
      sourceLabel: 'Wednesday Daily'
    },
    {
      id: 'q4',
      question: 'What on-chain metric is calculated by dividing the total market cap by the realized cap, and is often used to assess whether Bitcoin is overvalued or undervalued?',
      options: [
        'MVRV Ratio',
        'NVT Ratio',
        'Puell Multiple',
        'Reserve Risk'
      ],
      correctIndex: 0,
      explanation: 'The MVRV (Market Value to Realized Value) ratio compares Bitcoin\'s current market cap to its realized cap (sum of all coins at their last moved price), helping identify when Bitcoin is trading above or below its "fair value".',
      sourceLabel: 'Friday Daily'
    },
    {
      id: 'q5',
      question: 'In macro analysis, what term describes the phenomenon where central banks continue to hold large balance sheets even after quantitative easing programs end?',
      options: [
        'Balance sheet normalization',
        'Quantitative tightening',
        'Balance sheet permanence',
        'Monetary policy divergence'
      ],
      correctIndex: 2,
      explanation: 'Balance sheet permanence refers to the observation that central banks tend to maintain elevated balance sheet levels post-QE, effectively making the expanded balance sheets a permanent feature of monetary policy rather than a temporary measure.',
      sourceLabel: 'Pro #36'
    }
  ]
}

