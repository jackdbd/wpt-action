import { inspect } from 'util'
import {
  debug,
  endGroup,
  error,
  getInput,
  info,
  setFailed,
  setOutput,
  startGroup
} from '@actions/core'
import { makeRunTest } from 'wpt-api-client/lib/es2015/run-test'
import { getAllOptionalInputs } from './helpers'

const NAME = '⏱️ [webpagetest-action]'

async function run(): Promise<void> {
  info(`${NAME} NODE_ENV = ${process.env.NODE_ENV || ''}`)

  // getInput() throws for any missing required input
  let apiKey = ''
  let url = ''
  try {
    startGroup(`${NAME} Check required inputs`)
    info(`${NAME} Check required inputs`)
    // maybe apiKey is not required for public WPT instances?
    apiKey = getInput('api_key', { required: true })
    url = getInput('url', { required: true })
    info(`${NAME} INPUT[url] = ${url}`)
    endGroup()
  } catch (err) {
    error((err as Error).message)
    debug(inspect(err))
    setFailed((err as Error).message)
    return // no point of continuing execution with any missing required params
  }

  const options = getAllOptionalInputs(NAME)

  const wptServer = getInput('wpt_server')
  if (wptServer) {
    info(`${NAME} INPUT[wpt_server] = ${wptServer}`)
  }

  const runTest = makeRunTest(apiKey)

  try {
    info(`${NAME} Call WebPageTest API`)
    const data = await runTest(url, options)
    startGroup(`${NAME} Set outputs`)
    setOutput('data', JSON.stringify(data))
    info(`${NAME} OUTPUT[data] set`)
    endGroup()
  } catch (err) {
    error((err as Error).message)
    debug(inspect(err)) // maybe enable this only for NODE_ENV=development
    setFailed((err as Error).message)
  }
}

// the `void` operator here is to make ESlint happy. It's this rule:
// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-floating-promises.md
void run()
