import { Atom } from '@ace/atom'
import type { ApiName2Data, ChartJsMap } from '@ace/types'
import type { FinanceSummary, Transaction, ChatMessage } from '@src/lib/types'


export const atoms = {
  count: new Atom({ save: 'idb', is: 'number', init: 0 }),
  chatMessage: new Atom({ save: 'idb', is: 'string', init: '' }),
  chatMessages: new Atom<ChatMessage[]>({ save: 'idb', is: 'json', init: [] }),
  transactions: new Atom<Transaction[]>({ save: 'idb', is: 'json', init: [] }),
  financeCategories: new Atom<ChartJsMap[]>({ save: 'idb', is: 'json', init: [] }),
  financeSummary: new Atom<undefined | FinanceSummary>({ save: 'idb', is: 'json' }),
  fortunes: new Atom<ApiName2Data<'apiGetFortune'>[]>({ save: 'idb', is: 'json', init: [] }),
}
