import './Home.css'
import { Nav } from '@src/Nav/Nav'
import { Route } from '@ace/route'
import { Pulse } from '@ace/pulse'
import { Title } from '@solidjs/meta'
import { Loading } from '@ace/loading'
import { dateRead } from '@ace/dateRead'
import { Markdown } from '@ace/markdown'
import { ChartJS } from '@ace/chartjs'
import { date2Iso } from '@ace/date2Iso'
import { Refresh } from '@src/lib/Refresh'
import { createMemo, Show } from 'solid-js'
import { useStore } from '@src/store/store'
import RootLayout from '@src/app/RootLayout'
import { emojis, formatter } from '@src/lib/vars'
import { AgGrid, type AgParams } from '@ace/agGrid'
import { randomBetween } from '@ace/randomBetween'
import { randomArrayItem } from '@ace/randomArrayItem'
import { apiGetBuildStats, apiGetFinances } from '@ace/apis'
import type { FinanceSummary, Transaction } from '@src/lib/types'



export default new Route('/')
  .layouts([RootLayout])
  .component(() => {
    const {set, sync, store} = useStore()

    apiGetBuildStats({
      queryType: 'stream',
      onData: (d) => set('buildStats', d),
    })

    apiGetFinances({
      queryType: 'stream',
      onData (d) {
        sync('cashFlow', d.cashFlow)
        sync('transactions', d.transactions)
        sync('financeCategories', d.categories)
        set('financeSummary', d.financeSummary)
      }
    })

    return <>
      <Title>🏡 Home</Title>

      <main class="home">
        <Welcome />

        <section class="summaries">
          <Summary key="balance" label="💸 Total Balance"  />
          <Summary key="monthlyExpenses" label="📉 Monthly Expenses" />
          <Summary key="monthlyIncome" label="📈 Monthly Income" />
        </section>

        <section class="vizs">
          <Categories />
          <Transactions/>
        </section>

        <Show when={store.buildStats} fallback={<MarkdownIncoming />}>
          <Markdown content={() => store.buildStats} $div={{class: 'markdown'}} />
        </Show>

        <Nav showRefresh={true} />
      </main>
    </>
  })



function Welcome() {
  return <>
    <section class="welcome">
      <h2>Welcome to Create Ace App ✨</h2>

      <div class="features">
        <span>✅ State stored in indexdb!</span>
        <span>✅ API calls, anchors & redirects are typesafe!</span>
        <span>✅ Looks ugly tho!</span>
      </div>
    </section>
  </>
}



function Summary(props: { label: string, key: keyof FinanceSummary }) {
  const {store} = useStore()

  const amount = () => store.financeSummary?.[props.key]
    ? formatter.format(store.financeSummary?.[props.key])
    : ''

  return <>
    <div class="summary">
      <div class="label">{props.label}</div>

      <Show when={amount()} fallback={<Loading />}>
        <div class="amount">{amount()}</div>
      </Show>
    </div>
  </>
}


function Categories() {
  const {sync, store} = useStore()
  const defaultCategoriesCount = 4
  const colors = ['#38bdf8', '#8e7cfb', '#3b82f6', '#4ade80',  '#ffb8d2', '#facc15', '#0284c7', '#b43c02']

  const chart = createMemo(() => {
    const data: number[] = []
    const labels: string[] = []

    for (const c of store.financeCategories) {
      labels.push(c.id)
      data.push(c.amount)
    }

    return { data, labels }
  })

  const addCategory = () => {
    sync('financeCategories', [
      ...store.financeCategories,
      {
        id: randomArrayItem(emojis),
        amount: (chart().data.at(-1) ?? 0) + 38
      }
    ])
  }

  const refreshCategories = () => {
    sync('financeCategories', store.financeCategories.slice(0, defaultCategoriesCount))
  }

  return <>
    <div class="viz">
      <div class="head">
        <h2>🍰 Categories</h2>
        <div class="buttons">
          <Show when={store.financeCategories.length > defaultCategoriesCount}>
            <Refresh onClick={refreshCategories} tooltipContent="Refresh Categories" />
          </Show>
          
          <button class="brand" onClick={addCategory}>Add Category</button>
        </div>
      </div>

      <div class="body two-col">
        <ChartJS
          $canvas={{class: 'doughnut'}}
          config={() => ({
            type: 'doughnut',
            data: {
              labels: chart().labels,
              datasets: [{
                data: chart().data,
                backgroundColor: colors,
                borderWidth: 0,
                hoverOffset: 8,
              }]
            },
            options: {
              plugins: {
                legend: {
                  labels: { color: '#f0f0f0' }
                },
                title: {
                  display: false,
                }
              }
            }
          })}
        />

        <div class="charts">
          <ChartJS
            config={() => ({
              type: 'line',
              data: {
                labels: chart().labels,
                datasets: [{
                  label: 'Expenses',
                  data: chart().data,
                  tension: 0.3,
                  backgroundColor: colors,
                  borderColor: 'rgba(255, 255, 255, 0.6)',
                }]
              },
              options: {
                plugins: { legend: { display: false } },
                scales: {
                  x: { ticks: { color: '#cfd8e3' } },
                  y: { ticks: { color: '#cfd8e3' } }
                }
              }
            })}
          />

          <ChartJS
            config={() => ({
              type: 'bar',
              data: {
                labels: chart().labels,
                datasets: [{
                  label: 'Expenses',
                  data: chart().data,
                  backgroundColor: colors,
                }]
              },
              options: {
                plugins: { legend: { display: false } },
                scales: {
                  x: { ticks: { color: '#cfd8e3' } },
                  y: { ticks: { color: '#cfd8e3' } }
                }
              }
            })}
          />
        </div>
      </div>
    </div>
  </>
}



function Transactions() {
  const {sync, store} = useStore()
  const defaultTransactionsCount = 15

  const addTransaction = () => {
    sync('transactions', [
      ...store.transactions, 
      { id: store.transactions.length, date: date2Iso(new Date()), description: randomArrayItem(emojis), amount: randomBetween(-6000, 9000) }
    ])
  }

  const refreshTransactions = () => {
    sync('transactions', store.transactions.slice(0, defaultTransactionsCount))
  }

  return <>
    <div class="viz">
      <div class="head">
        <h2>📆 Transactions</h2>
        <div class="buttons">
          <Show when={store.transactions.length > defaultTransactionsCount}>
            <Refresh onClick={refreshTransactions} tooltipContent="Refresh Transactions" />
          </Show>
          <button class="brand" onClick={addTransaction}>Add Transaction</button>
        </div>
      </div>

      <div class="body">
        <AgGrid 
          gridOptions={() => ({
            rowData: store.transactions,
            defaultColDef: { flex: 1, sortable: true, resizable: true },
            columnDefs: [
              {
                field: 'date',
                filter: 'agDateColumnFilter',
                sort: 'desc',
                cellRenderer (params: AgParams<Transaction[]>) {
                  return params.data?.date ? dateRead({ date: params.data.date }) : 'Unknown'
                }
              },
              { field: 'description', filter: 'agTextColumnFilter', },
              {
                field: 'amount',
                cellStyle: { textAlign: 'right' },
                sortable: false,
                cellRenderer (params: AgParams<Transaction[]>) {
                  const amount = () => (params.data?.amount ?? 0)

                  return <>
                    <div classList={{ up: amount() > 0 }} class="table-amount">
                      { formatter.format(Math.abs(amount())) }
                    </div>
                  </>
                }
              },
            ],
          })}
        />
      </div>
    </div>
  </>
}




function MarkdownIncoming() {
  return <>
    <div class="markdown-incoming">
      <Pulse $div={{class: 'h1'}} />
      <Pulse $div={{class: 'p'}} />
    </div>
  </>
}
