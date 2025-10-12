import { API } from '@ace/api'


export const GET = new API('/api/get-build-stats', 'apiGetBuildStats')
  .resolve(async (scope) => {
    return scope.success(getMarkdown())
  })


function getMarkdown() {
  return `## 🤓 \`npm run build\`

This app's stats 🧐!
  
### 🧱 FE Bundle (processed & cached by browser)

**Total:** ~45 KB gzip (≈ 📸 the size of a small photo)  

---

### 🧩 BE Bundle (routes & endpoints, processed by Workers or Servers)

**Total:** ~36 KB gzip (≈ 📝 a 6-7 page Word document)`
}
