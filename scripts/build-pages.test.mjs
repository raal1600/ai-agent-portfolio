import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve, join, dirname, sep } from 'node:path'
import { assemblePages } from './build-pages.mjs'
import { verifyPages } from './verify-pages.mjs'
import config from '../site.config.mjs'

function fixture(run) {
  const directory = mkdtempSync(join(tmpdir(), 'portfolio-pages-tests-'))
  const main = join(directory, 'main'), customer = join(directory, 'customer')
  const write = (file, content) => { mkdirSync(dirname(file), { recursive: true }); writeFileSync(file, content) }
  try {
    for (const site of [main, customer]) {
      for (const dir of ['assets', 'projects', 'evidence']) mkdirSync(join(site, dir), { recursive: true })
      write(join(site, 'index.html'), '<html lang="en"><head><title>Existing portfolio</title><meta name="description" content="A portfolio."></head><body><h1>Existing portfolio</h1></body></html>')
      write(join(site, 'assets/favicon.svg'), '<svg xmlns="http://www.w3.org/2000/svg"/>')
      write(join(site, '.env'), 'fixture-only=exclude-this')
      write(join(site, 'docs/internal.md'), 'Do not publish development documentation')
    }
    for (const page of config.pages) write(join(customer, page.path), '<html lang="en"><head><title>Customer website</title><meta name="description" content="Custom agents."></head><body><h1>Customer website</h1></body></html>')
    run({ main, customer, write })
  } finally {
    assert(directory.startsWith(resolve(tmpdir()) + sep + 'portfolio-pages-tests-'))
    rmSync(directory, { recursive: true, force: true })
  }
}

test('both branches publish together; original bytes and customer source metadata are preserved', () => fixture(({ main, customer }) => {
  const beforeMain = readFileSync(join(main, 'index.html'))
  const beforeCustomer = readFileSync(join(customer, 'index.html'))
  const output = assemblePages(main, customer)
  verifyPages(output)
  assert.deepEqual(readFileSync(join(output, 'index.html')), beforeMain)
  assert.deepEqual(readFileSync(join(customer, 'index.html')), beforeCustomer)
  assert(readFileSync(join(output, 'preview/index.html'), 'utf8').includes('/ai-agent-portfolio/preview/'))
  assert(!existsSync(join(output, '.env')))
  assert(!existsSync(join(output, 'preview/.env')))
}))

test('missing branch content stops assembly before replacing previous output', () => fixture(({ main, customer, write }) => {
  const output = assemblePages(main, customer)
  write(join(output, 'keep.txt'), 'previous artifact')
  const emptyMain = join(main, 'missing-checkout')
  assert.throws(() => assemblePages(emptyMain, customer), /Required branch content missing/)
  assert.equal(readFileSync(join(output, 'keep.txt'), 'utf8'), 'previous artifact')
}))

test('existing preview path on main is never overwritten', () => fixture(({ main, customer, write }) => {
  write(join(main, 'preview/index.html'), 'Existing public path')
  assert.throws(() => assemblePages(main, customer), /already owns/)
  assert.equal(readFileSync(join(main, 'preview/index.html'), 'utf8'), 'Existing public path')
}))

test('unrecognized output content is never cleared', () => fixture(({ main, customer, write }) => {
  write(join(customer, 'pages-dist/keep.txt'), 'User work')
  assert.throws(() => assemblePages(main, customer), /unrecognized/)
  assert.equal(readFileSync(join(customer, 'pages-dist/keep.txt'), 'utf8'), 'User work')
}))

test('recognized output is rebuilt to remove stale files', () => fixture(({ main, customer, write }) => {
  const output = assemblePages(main, customer)
  write(join(output, 'stale.html'), 'Old generated file')
  assemblePages(main, customer)
  assert(!existsSync(join(output, 'stale.html')))
  verifyPages(output)
}))
