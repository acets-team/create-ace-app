## 🤓 `Markdown Example`

This SEO friendly `markdown` ❤️ aims to briefly summarize what's included with `Create Ace App`!

### ⚙️ General
1. `Create Ace App` can be installed as a [`Desktop application`](https://github.com/acets-team/ace?tab=readme-ov-file#create-desktop-application) ✅
<img src="https://i.imgur.com/irIUHOp_d.webp?maxwidth=1520&fidelity=grand" alt="Create Ace App" loading="lazy" width="1280" height="1081" style="width: 100%; height: auto;" />

### 🧠 State
1. State saved through `refresh` & while `offline` ✅
1. On page load, static content is available `immediately` & dynamic state is `streamed` in ✅

### 🙌 Autocomplete
1. **Anchors** are typesafe ✅
1. **Redirects** are typesafe ✅
1. **API's** called with typesafe **functions** ✅

### 🧩 Components
1. Creating & updating charts is **easy** ✅
1. Aria compliant `tabs`, `toasts`, `tooltips` ✅
1. Nav animations **continue** as current page updates ✅
1. Tables are `filterable`, `scrollable` & `sortable` ✅
1. Smooth list addition animations @ `Chat` & `Fortunes` ✅
1. `SEO` Friendly `Markdown` w/ `Code Highlighting`, `Tabs` & Solid component support from a `.md` file ✅

<!--{ "$tabs": ["Home.tsx", "apiGetFinances.ts", "apiGetTransactions.ts"] }-->
```ts
// Component that creates this page 🙌

export default new Route('/')
  .layouts([RootLayout])
  .component(() => {
    const {sync} = useStore()

    apiGetTransactions({ // api's load simultaneously btw ❤️
      queryType: 'stream',
      onSuccess: (d) => sync('transactions', d)
    })

    apiGetFinances({ // on refresh => requests start on the BE 🤓
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
          <Transactions/>
        </section>

        <MarkdownItStatic content={mdAppInfo} registerHljs={registerHljs} $div={{ class: 'markdown' }} />

        <Nav showRefresh={true} />
      </main>
    </>
  })
```
---
```ts
// API for charts 🙌

import { API } from '@ace/api'
import { ChartJsMap } from '@ace/types'
import type { FinanceSummary } from '@src/lib/types'


export const GET = new API('/api/get-finances', 'apiGetFinances')
  .resolve((scope) => {
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
```
---
```ts
// API for table data 🙌

import { API } from '@ace/api'
import { msDay } from '@ace/ms'
import { date2Iso } from '@ace/date2Iso'
import { dateShift } from '@ace/dateShift'
import type { Transaction } from '@src/lib/types'


export const GET = new API('/api/get-transactions', 'apiGetTransactions')
  .resolve((scope) => {
    return scope.success(
      getTransactions()
    )
  })


function getTransactions(): Transaction[] {
  return [
    { id: 1, date: getDate(msDay * -1), description: 'Groceries 🥦', amount: -85.50 },
    { id: 2, date: getDate(msDay * -2), description: 'Yoga Membership 🧘‍♂️', amount: -45.00 },
    { id: 3, date: getDate(msDay * -3), description: 'Freelance Project 💻', amount: 3000.00 },
    { id: 4, date: getDate(msDay * -4), description: 'Matcha 🍵', amount: -4.75 },
    { id: 5, date: getDate(msDay * -5), description: 'Dinner Out 🍝', amount: -62.30 },
    { id: 6, date: getDate(msDay * -6), description: 'Gas ⛽️', amount: -48.00 },
    { id: 7, date: getDate(msDay * -7), description: 'Sponsorship 💰', amount: 6000.00 },
    { id: 8, date: getDate(msDay * -8), description: 'Streaming Premium 🎬', amount: -30 },
    { id: 9, date: getDate(msDay * -9), description: 'Groceries 🛒', amount: -93.20 },
    { id: 10, date: getDate(msDay * -10), description: 'Book Purchase 📚', amount: -18.50 },
    { id: 11, date: getDate(msDay * -11), description: 'Online Course 🎓', amount: -7.99 },
    { id: 12, date: getDate(msDay * -12), description: 'Car Wash 🚗', amount: -15.00 },
    { id: 13, date: getDate(msDay * -13), description: 'Gifts 🧸', amount: -36.45 },
    { id: 14, date: getDate(msDay * -14), description: 'Tutor Time 📓', amount: 60.00 },
    { id: 15, date: getDate(msDay * -15), description: 'Donation 💖', amount: -30.00 },
  ]
}



function getDate(shift: number) {
  return date2Iso(dateShift(shift))
}
```
---