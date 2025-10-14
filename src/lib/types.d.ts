import type  { DateLike } from '@ace/types'
import type { InferEnums } from '@ace/enums'
import type { elements } from '@src/lib/vars'


export type Element = InferEnums<typeof elements>

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

export type ChartData = {
  id: string
  amount: number
}

export type ChatMessage = {
  id: string,
  message: string,
  userType: 'me' | 'friend'
}
