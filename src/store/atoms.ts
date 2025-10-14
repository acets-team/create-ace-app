import { Atom } from '@ace/atom'
import type { ApiName2Data } from '@ace/types'
import type { ChartData, FinanceSummary, Transaction, ChatMessage } from '@src/lib/types'


export const atoms = {
  count: new Atom({ save: 'idb', is: 'number', init: 0 }),
  buildStats: new Atom({ save: 'idb', is: 'string', init: '' }),
  chatMessage: new Atom({ save: 'idb', is: 'string', init: '' }),
  cashFlow: new Atom<ChartData[]>({ save: 'idb', is: 'json', init: [] }),
  chatMessages: new Atom<ChatMessage[]>({ save: 'idb', is: 'json', init: [] }),
  transactions: new Atom<Transaction[]>({ save: 'idb', is: 'json', init: [] }),
  financeCategories: new Atom<ChartData[]>({ save: 'idb', is: 'json', init: [] }),
  financeSummary: new Atom<undefined | FinanceSummary>({ save: 'idb', is: 'json' }),
  fortunes: new Atom<ApiName2Data<'apiGetFortune'>[]>({ save: 'idb', is: 'json', init: [] }),
}
