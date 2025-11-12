import type  { DateLike } from '@ace/vanilla'


export type FinanceSummary = {
  balance: number
  monthlyIncome: number
  monthlyExpenses: number
}

export type Transaction = {
  id: number
  date: DateLike
  description: string
  amount: number
}

export type ChatMessage = {
  id: string,
  message: string,
  userType: 'me' | 'friend'
}
