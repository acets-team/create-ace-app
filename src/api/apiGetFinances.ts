import { API } from '@ace/api'
import { ChartJsMap } from '@ace/types'
import type { FinanceSummary } from '@src/lib/types'


export const GET = new API('/api/get-finances', 'apiGetFinances')
  .resolve(async (scope) => {
    return scope.success({
      summary: getSummary(),
      categories: getCategories(),
    })
  })


function getSummary(): FinanceSummary {
  return {
    balance: 18549,
    monthlyIncome: 7281,
    monthlyExpenses: 1521,
  }
}


function getCategories(): ChartJsMap[] {
  return [
    {id: 'Food', amount: 600},
    {id: 'Health', amount: 630},
    {id: 'Rent', amount: 900},
    {id: 'Fun', amount: 1111},
  ]
}
