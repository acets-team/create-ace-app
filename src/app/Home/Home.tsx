import './Home.css'
import { Show } from 'solid-js'
import { Nav } from '@src/Nav/Nav'
import { Route } from '@ace/route'
import { Pulse } from '@ace/pulse'
import { AgGrid } from '@ace/agGrid'
import { buildOrigin } from '@ace/env'
import { Loading } from '@ace/loading'
import { ChartJs } from '@ace/chartjs'
import { dateRead } from '@ace/dateRead'
import { date2Iso } from '@ace/date2Iso'
import { Refresh } from '@src/lib/Refresh'
import { useStore } from '@src/store/store'
import { Title, Meta } from '@solidjs/meta'
import RootLayout from '@src/app/RootLayout'
import mdAppInfo from '@src/md/mdAppInfo.md?raw'
import { emojis, formatter } from '@src/lib/vars'
import { randomBetween } from '@ace/randomBetween'
import { themeAgGrid } from '@src/init/themeAgGrid'
import { registerHljs } from '@src/init/registerHljs'
import { randomArrayItem } from '@ace/randomArrayItem'
import { agGridComponent } from '@ace/agGridComponent'
import { MarkdownItStatic } from '@ace/markdownItStatic'
import { registerAgGrid } from '@src/init/registerAgGrid'
import { registerChartJs } from '@src/init/registerChartJs'
import { agGridCellRenderer } from '@ace/agGridCellRenderer'
import { apiGetFinances, apiGetTransactions } from '@ace/apis'
import type { FinanceSummary, Transaction } from '@src/lib/types'


export default new Route('/')
  .layouts([RootLayout])
  .component(() => {
    const {sync} = useStore()

    apiGetTransactions({ // api's load simultaneously btw ❤️
      queryType: 'stream',
      onSuccess: (d) => sync('transactions', d)
    })

    apiGetFinances({
      queryType: 'stream',
      onSuccess(d) {
        sync('financeSummary', d.summary)
        sync('financeCategories', d.categories)
      }
    })

    return <>
      <Title>🏡 Home · Create Ace App</Title>
      <Meta property="og:title" content="🏡 Home · Create Ace App" />
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content={buildOrigin} />
      <Meta property="og:image" content={buildOrigin + '/og/home.webp'} />

      <main class="home">
        <Welcome />

        <section class="summaries">
          <Summary key="balance" label="💸 Total Balance"  />
          <Summary key="monthlyExpenses" label="📉 Monthly Expenses" />
          <Summary key="monthlyIncome" label="📈 Monthly Income" />
        </section>

        <section class="vizs">
          <Categories />
          <Transactions />
        </section>

        <MarkdownItStatic content={mdAppInfo} registerHljs={registerHljs} $div={{ class: 'markdown' }} />

        <Nav showRefresh={true} />
      </main>
    </>
  })



function Welcome() {
  return <>
    <section class="welcome">
      <h2>Welcome to Create Ace App ✨</h2>

      <div class="features">
        <span>✅ State saved through refresh!</span>
        <span>✅ API calls, anchors & redirects are typesafe!</span>
        <span>✅ State saved while offline!</span>
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
  const defaultCategoriesCount = 4

  const {sync, store} = useStore()

  const colors = ['#38bdf8', '#8e7cfb', '#3b82f6', '#4ade80', '#ffb8d2', '#facc15', '#0284c7', '#b43c02']

  const addCategory = () => {
    sync('financeCategories', [
      ...store.financeCategories,
      {
        id: randomArrayItem(emojis),
        amount: (store.financeCategories.at(-1)?.amount ?? 0) + 36
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

      <Show when={store.financeCategories.length} fallback={<CategoriesLoading />}>
        <div class="body two-col">
          <ChartJs
            register={registerChartJs}
            $canvas={{ class: 'doughnut' }}
            map={() => store.financeCategories}
            config={{
              type: 'doughnut',
              data: {
                datasets: [{
                  data: [],
                  borderWidth: 0,
                  hoverOffset: 8,
                  backgroundColor: colors,
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
            }} />

          <div class="charts">
            <ChartJs
              register={registerChartJs}
              map={() => store.financeCategories}
              config={{
                type: 'line',
                data: {
                  labels: [],
                  datasets: [{
                    tension: 0.3,
                    label: 'Expenses',
                    data: [],
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
              }} />

            <ChartJs
              register={registerChartJs}
              map={() => store.financeCategories}
              config={{
                type: 'bar',
                data: {
                  labels: [],
                  datasets: [{
                    label: 'Expenses',
                    data: [],
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
              }} />
          </div>
        </div>
      </Show>
    </div>
  </>
}



function CategoriesLoading() {
  return <>
    <div class="categories-load">
      <div class="left">
        <Pulse />
      </div>
      <div class="right">
        <Pulse delay={300} />
        <Pulse delay={300} />
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

      <Show when={store.transactions.length} fallback={<Pulse $div={{ class: 'transactions-load' }} delay={300} />}>
        <div class="body">
          <AgGrid 
            register={registerAgGrid}
            gridOptions={() => ({
              theme: themeAgGrid(),
              rowData: store.transactions,
              defaultColDef: { flex: 1, sortable: true, resizable: true },
              columnDefs: [
                {
                  sort: 'desc',
                  field: 'date',
                  minWidth: 300,
                  filter: 'agDateColumnFilter',
                  cellRenderer: agGridCellRenderer({ component: TableCellDate }),
                },
                { field: 'description', filter: 'agTextColumnFilter', minWidth: 210 },
                {
                  minWidth: 120,
                  field: 'amount',
                  sortable: false,
                  cellStyle: { textAlign: 'right' },
                  cellRenderer: agGridCellRenderer({ component: TableCellAmount }),
                }
              ],
            })}
          />
        </div>
      </Show>
    </div>
  </>
}



const TableCellDate = agGridComponent<Transaction>(params => {
  const date = params.data?.date
  return <>{date ? dateRead({ date }) : 'Unknown'}</>
})



const TableCellAmount = agGridComponent<Transaction>(params => {
  const amount = params.data?.amount ?? 0

  return <>
    <div classList={{ up: amount > 0 }} class="table-amount">
      {formatter.format(Math.abs(amount))}
    </div>
  </>
})
