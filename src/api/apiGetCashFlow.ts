import { API } from '@ace/api'
import { ChartJsMap } from '@ace/types'


export const GET = new API('/api/get-cash-flow', 'apiGetCashFlow')
  .resolve(async (scope) => {
    return scope.success(
      getCashFlow()
    )
  })


function getCashFlow(): ChartJsMap[] {
  return [
    {id: 'Jan', amount: 2100},
    {id: 'Feb', amount: 2700},
    {id: 'Mar', amount: 3000},
    {id: 'Apr', amount: 2610},
    {id: 'May', amount: 3120},
    {id: 'Jun', amount: 3963},
  ]
}
