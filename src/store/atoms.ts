import { Atom } from '@ace/atom'
import type { ApiName2Data } from '@ace/types'
import type { ChartData, FinanceSummary, Transaction } from '@src/lib/types'


export const atoms = {
  count: new Atom({ save: 'idb', is: 'number', init: 0 }), // in nav

  buildStats: new Atom({ save: 'idb', is: 'string', init: '' }),

  fortunes: new Atom<ApiName2Data<'apiGetFortune'>[]>({ save: 'idb', is: 'json', init: [] }),

  chatMessage: new Atom({ save: 'idb', is: 'string', init: '' }),

  chatMessages: new Atom<{id: string, message: string, userType: 'me' | 'friend'}[]>({ save: 'idb', is: 'json', init: [] }),

  financeSummary: new Atom<undefined | FinanceSummary>({ save: 'idb', is: 'json' }),

  transactions: new Atom<Transaction[]>({ save: 'idb', is: 'json', init: [] }),

  cashFlow: new Atom<ChartData[]>({ save: 'idb', is: 'json', init: [] }),

  financeCategories: new Atom<ChartData[]>({ save: 'idb', is: 'json', init: [] }),
}
