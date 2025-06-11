![Ace](https://i.imgur.com/jFILQ9P.png)



# 🧚‍♀️ Create `Ace` App!
```bash
npx create-ace-app@latest
```



# Or?
```bash
nvm use 22
npm create solid # basic / typescript
npm install @acets-team/ace -D
```



### Set Typescript Config
- @ `./tsconfig.json`
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "jsx": "preserve",
    "jsxImportSource": "solid-js",
    "allowJs": true,
    "strict": true,
    "noEmit": true,
    "types": ["vinxi/types/client"],
    "isolatedModules": true,
    "paths": {
      "@src/*": ["./src/*"],
      "ace.config": ["ace.config.js"],
      "@ace/*": ["./.ace/fundamentals/*"],
    }
  },
  "include": [
    "src/**/*",
    ".ace/**/*"
  ]
}
```



### Set Vite Config
- @ `./app.config.ts`
```ts
import { resolveAlias } from './.ace/resolveAlias'
import { defineConfig } from '@solidjs/start/config'


export default defineConfig({
  vite({ router }) {
    return {
      resolve: {
        alias: resolveAlias(router, import.meta.url)
      }
    }
  }
})
```



### 🗂️ Create the folders
1. `./src/app/`
    - Route & layout `tsx` files go here
2. `./src/api/`
    - GET & POST functions go here



![Sloths writing code](https://i.imgur.com/dDOo5DS.jpeg)



### 🥳 Create fun config
- @ `./ace.config.js`
```ts
// @ts-check 


/** @type {import('acets').AceConfig} */
export const config = {
  apiDir: './src/api',
  appDir: './src/app',
  logCaughtErrors: true,
  cookieKey: 'ace_cookie',
  sessionDataTTL: 1000 * 60 * 60 * 24 * 3, // 3 days in ms
  envs: [
    { name: 'local', url: 'http://localhost:3000' },
  ],
  plugins: {
    solid: true,
  }
}


/** 
 * @typedef {Object} SessionData
 * @property {string} userId
 * @property {string} sessionId
 */
```



### Bind `<App />` component
```tsx
import './app.css'
import { App } from '@ace/app'

export default () => <App />
```



![Lion's using app's at Pride Rock](https://i.imgur.com/37aoJkk.png)



### Create primary api endpoint
- @ `./src/routes/api/[...api].ts`
- Thanks to the Solid Start `<FileRoutes />` component, all calls to `/api` will go through the fn's placed here
```tsx
import { gets, posts } from '@ace/apis'
import type { APIEvent } from '@ace/types'
import { onAPIEvent } from '@ace/onAPIEvent'


export async function GET(event: APIEvent) {
  'use server'
  return await onAPIEvent(event, gets)
}


export async function POST(event: APIEvent) {
  'use server'
  return await onAPIEvent(event, posts)
}
```



![Kitties developing software](https://i.imgur.com/Ao8xTG5.png)



### Update package.json
```json
{
  "scripts": {
    "dev": "ace build local && vinxi dev",
  }
}
```


![kitty developer](https://camo.githubusercontent.com/68c3849e22315c2dc02b02b433db1b51ae7fefe0372bf395b2a75ab4f692941f/68747470733a2f2f692e696d6775722e636f6d2f7a6378436b4a482e706e67)




### 🧼 Cleanup 
- Delete the `./src/routes/about.tsx` file
- Delete the `./src/routes/index.tsx` file
- Delete the `./src/components` folder
- Create a `./src/lib` folder
    - Lib is short for library
    - `./src/lib` holds common variables, functions & components



### 🙏 Create middleware
-  @ `./src/lib/middleware.ts`:
    ```tsx
    import { getMiddleware } from '@ace/getMiddleware'

    export default getMiddleware()
    ```
  - Add `middleware` to config @ `./app.config.ts`, example:
    ```ts
    import { resolveAlias } from './.ace/resolveAlias'
    import { defineConfig } from '@solidjs/start/config'


    export default defineConfig({
      middleware: './src/lib/middleware.ts',
      vite({ router }) {
        return {
          resolve: {
            alias: resolveAlias(router, import.meta.url)
          }
        }
      }
    })
    ```

### ✅ All done!


![Bunnies writing code](https://i.imgur.com/d0wINvM.jpeg)