#!/usr/bin/env node

import readline from 'node:readline'
import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'
import { cp, mkdir } from 'node:fs/promises'
import { constants, type PathLike } from 'node:fs'
import { access, writeFile } from 'node:fs/promises'
import { cuteLog, cuteString } from './.ace/fundamentals/cuteLog.js'


/**
 * 1. Ensure node version is 22 or higher
 * 1. Ask / receive project name
 * 1. Copy files from project to their directory
 */
async function main() {
  const build = new Build()

  try {
    build.checkNodeVersion()

    // await build.setTemplate()
    await build.setProjectName()
    await build.writeFiles()
    await build.onSuccess()
  } catch (err) {
    build.onCatch(err)
  }
}


class Build {
  template = ''
  projectName = ''

  renderPackageDotJson() {
    return {
      name: this.projectName,
      type: 'module',
      engines: {
        node: '>=22'
      },
      scripts: {
        dev: 'ace build local && vinxi dev',
        build: 'vinxi build',
        start: 'vinxi start',
      },
      devDependencies: {
        '@acets-team/ace': '^0.0.21',
        '@solidjs/meta': '^0.29.4',
        '@solidjs/router': '^0.15.3',
        '@solidjs/start': '^1.1.4',
        'solid-js': '^1.9.7',
        vinxi: '^0.5.3',
      }
    }
  }


  async writeFiles() {
    // get bearings
    const cwd = process.cwd()
    const newProjectDir = join(cwd, this.projectName)
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)
  
    // create project name dir
    await mkdir(newProjectDir, { recursive: true }) 

    // write src and public folders
    await Promise.all([
      mkdir(join(newProjectDir, 'src')), 
      mkdir(join(newProjectDir, 'public'), { recursive: true }),
    ])

    // write files that go right into root folder
    const writePromises = [ 'app.config.ts', 'ace.config.js', 'tsconfig.json' ].map(file =>
      cp(join(__dirname, file), join(newProjectDir, file))
    )

    // write the package.json, .env & the files that go into the src & public folders
    writePromises.push(
      cp(join(__dirname, 'src'), join(newProjectDir, 'src'), { recursive: true }),
      cp(join(__dirname, 'public'), join(newProjectDir, 'public'), { recursive: true }),
      writeFile(join(newProjectDir, '.env'), `ENV=local\nSESSION_CRYPT_PASSWORD=${ crypto.randomUUID() }`, 'utf8'),
      writeFile(join(newProjectDir, 'package.json'), JSON.stringify(this.renderPackageDotJson(), null, 2), 'utf8'),
      writeFile(join(newProjectDir, '.gitignore'), this.renderGitIgnore(), 'utf8'),
      writeFile(join(newProjectDir, 'wrangler.toml'), this.renderWranglerDotToml(), 'utf8'),
    )

    await Promise.all(writePromises)
  }



  checkNodeVersion() {
    const current = parseInt(process.versions.node.split('.')[0], 10)
  
    if (current < 22) {
      console.error(cuteString(`❌ Node.js 22+ is required. You're using ${process.version}`, 'red'))
      process.exit(1)
    }
  }


  async setTemplate() {
    console.clear()

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

    const question = (q: string) => new Promise<string>((resolve) => rl.question(q, (answer) => resolve(answer.trim())))

    console.log(`${cuteString('Welcome to Ace!', 'bold', 'underline')}

Please choose a template:
    
1️⃣ ${cuteString('Most Simple', 'cyan', 'bold')} 🔧
   • So no code deletion is necessary!
    
2️⃣ ${cuteString('Standard', 'cyan', 'bold')} 🚀
   • Includes a brief layout, route & api example ${cuteString('(recommended)', 'green', 'bold')}!
    
3️⃣ ${cuteString('Full', 'cyan', 'bold')} ✨
   • Includes a sign in, sign up & database pool example!
    
${cuteString('Please enter a 1, 2, or 3 and then press [return]:', 'magenta', 'bold')}
`)

    while (true) {
      const choice = await question(cuteString('Your choice: ', 'magenta'))

      if (choice && ['1', '2', '3'].includes(choice)) {
        this.template = choice
        break
      } else {
        cuteLog('⚠️  Invalid selection. Please enter 1, 2, or 3.', 'red')
      }
    }

    rl.close()
  }


  async setProjectName() {
    console.clear()

    cuteLog('Welcome to Ace!', 'bold', 'underline')

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    const question = (q: string) => new Promise<string>((resolve) => rl.question(q, (answer) => resolve(answer.trim())))

    while (true) {
      const projectName = await question(cuteString('🛠️ Project Name Please: ', 'cyan'))

      if (!projectName) cuteLog('⚠️ Project name cannot be empty', 'red')
      else if (/[/\\?%*:|"<>]/.test(projectName)) cuteLog('⚠️ Project name contains invalid folder characters', 'red')
      else if (await pathExists(projectName)) cuteLog(`⚠️ A folder named "${projectName}" already exists. Please choose a different name.`, 'red')
      else {
        this.projectName = projectName
        break
      }
    }

    rl.close();
  }


  async onSuccess() {
    console.log(`
${cuteString(`🎉 Congratulations! "${this.projectName}" created! 🎉`, 'green', 'bold', 'underline')}

${cuteString('🤓 3 quick steps to dev please:', 'blue', 'bold')}

   ${cuteString('1)', 'blue')} ${cuteString('cd ' + this.projectName, 'cyan')}
   ${cuteString('2)', 'blue')} ${cuteString('npm install', 'cyan')}
   ${cuteString('3)', 'blue')} ${cuteString('npm run dev', 'cyan')}

${cuteString('💖 Thanks for creating w/ Ace! ✨ Docs: https://github.com/acets-team/ace\n', 'bold')}`)
  }


  /**
   * @param {unknown} err
   */
  onCatch(err: unknown) {
    console.error(err)
    process.exit(1)
  }


  renderGitIgnore() {
    return `.env
.vinxi
.output
node_modules
app.config.timestamp*\n`
  }


  renderWranglerDotToml() {
    return `name = "${this.projectName}"
compatibility_date = "${getWranglerCompatabilityDate()}"\n`
  }
}


main()


async function pathExists(path: PathLike): Promise<boolean> {
  try {
    await access(path, constants.F_OK)
    return true
  } catch {
    return false
  }
}


/**
 * 1) Get the current utc date
 * 2) Subtract 3 days
 * 3) Give back in the format "2025-01-30" aka Year-Month-Day
 */
function getWranglerCompatabilityDate(): string {
  const now = new Date()
  const utcDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  utcDate.setUTCDate(utcDate.getUTCDate() - 3)

  const year = utcDate.getUTCFullYear()
  const month = String(utcDate.getUTCMonth() + 1).padStart(2, '0')
  const day = String(utcDate.getUTCDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}