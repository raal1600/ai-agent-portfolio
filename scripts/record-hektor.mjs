// Compatibility entry point: refresh both localized Hektor presentations.
// Historical Hektor assets remain unchanged in evidence/hektor-agent/.
process.argv[2] = 'hektor'
await import('./record-presentations.mjs')
