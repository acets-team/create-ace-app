## 🤓 `Markdown Example`

In this markdown we'll quickly relay what this site/app does! ❤️ With great power comes great responsibility!

### ⚙️ General
1. Can be installed as a [Desktop application](https://github.com/acets-team/ace?tab=readme-ov-file#create-desktop-application) ✅
<img src="https://i.imgur.com/irIUHOp_d.webp?maxwidth=1520&fidelity=grand" alt="Create Ace App" loading="lazy" width="1280" height="1081" style="width: 100%; height: auto;" />

### 🧠 State
1. State saved through refresh & while offline ✅
1. On page load, static content is available immediately & dynamic state is streamed in ✅

### 🙌 Autocomplete
1. Anchors are typesafe ✅
1. Redirects are typesafe ✅
1. API's are called as typesafe functions ✅

### 🧩 Components
1. Creating & updating charts is easy ✅
1. Aria compliant toasts, modals & tooltips ✅
1. Tables are filterable, scrollable & sortable ✅
1. Nav animations continue as current page updates ✅
1. Ability to smoothly add onto lists @ Chat & Fortunes ✅
1. SEO Friendly Markdown w/ Code Highlight Support from a `.md` file ✅

```ts
// Create Ace App > Home.tsx (aka: the code that creates this page 🙌)

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
          <Transactions/>
        </section>

        <MarkdownItStatic content={mdAppInfo} registerHljs={registerHljs} $div={{ class: 'markdown' }} />

        <Nav showRefresh={true} />
      </main>
    </>
  })
```
