import { API } from '@ace/api'


export const GET = new API('/api/get-app-info', 'apiGetAppInfo')
  .resolve(async (scope) => {
    return scope.success(
      getMarkdown()
    )
  })


function getMarkdown() {
  return `## 🤓 \`Markdown Example\`

Quick run down of what this app does! Sooo much power at your fingertips! Great responsibility btw! :)

#### 🧠 State
1. State saved while offline ✅
1. State saved through refresh ✅
1. Static content is available immediately & dynamic state is streamed in ✅

#### 🙌 Autocomplete
1. Anchors are typesafe ✅
1. Redirects are typesafe ✅
1. API's are called as a typesafe function ✅

#### 🧩 Components
1. Creating & updating charts is easy ✅
1. Aria compliant toasts, modals & tooltips ✅
1. Tables are filterable, scrollable & sortable ✅
1. Nav animations continue as current page updates ✅
1. Ability to smoothly add onto lists @ Chat & Fortunes ✅`
}
