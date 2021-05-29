import process from 'process'
import cp from 'child_process'
import path from 'path'

/**
 * This test suite shows how a GitHub-hosted runner would run a JS action,
 * namely using environment variables and the stdout protocol.
 * The reason these variables are called INPUT_* is because of how `getInput()` works.
 * https://github.com/actions/toolkit/blob/3bd746139fadc2f9d6e5d8c2593a0be2a44e9c5c/packages/core/src/core.ts#L91
 */
describe('action [integration]', () => {
  const exe = process.execPath // path to the Node.js binary
  const mainJS = [path.join(__dirname, '..', 'dist', 'index.js')]

  it('throws when input `api_key` is not set', () => {
    const options: cp.ExecFileSyncOptions = {
      env: {
        ...process.env,
        INPUT_API_KEY: undefined,
        INPUT_URL: 'https://www.google.com/'
      }
    }

    expect(() => {
      cp.execFileSync(exe, mainJS, options)
    }).toThrow()
  })

  it('throws when input `url` is not set', () => {
    const options: cp.ExecFileSyncOptions = {
      env: {
        ...process.env,
        INPUT_API_KEY: process.env.INPUT_API_KEY,
        INPUT_URL: undefined
      }
    }

    expect(() => {
      cp.execFileSync(exe, mainJS, options)
    }).toThrow()
  })
})
