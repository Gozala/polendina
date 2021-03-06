/* globals describe it */

const assert = require('assert')
const path = require('path')
const { runCli } = require('./common')

const webpackMergeFixture = path.join(__dirname, 'fixtures/webpack-merge')

describe('basic webpack-merge', function () {
  this.timeout(20000)
  it('should run plain', async () => {
    const expected = `
assert.ok() is a function
querystring.parse() is a function
  ✔ test.js
`
    const { stdout, code } = await runCli(webpackMergeFixture, '--runner=bare-sync')
    assert.strictEqual(code, 0, 'exited with zero exit code')
    assert.ok(stdout.includes(expected), 'stdout contains expected test output')
    assert.ok(stdout.includes('Running bare-sync page tests with Puppeteer'), 'stdout contains expected output for running in page')
  })

  it('should fail with custom config', async () => {
    const expectedStdout = `
assert.ok() is a function
  ✘ test.js
`
    const expectedStderr = '\'undefined\' === \'function\''

    const { stdout, stderr, code } = await runCli(webpackMergeFixture, '--runner=bare-sync --webpack-config webpack.config.js')
    assert.strictEqual(code, 1, 'exited with zero exit code')
    assert.ok(stdout.includes(expectedStdout), 'stdout contains expected test output')
    assert.ok(stderr.includes(expectedStderr), 'stderr contains expected test output')
    assert.ok(stdout.includes('Running bare-sync page tests with Puppeteer'), 'stdout contains expected output for running in page')
  })
})
