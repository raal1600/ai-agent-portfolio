import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'

export function restoreHektor() {
  const root = fileURLToPath(new URL('../', import.meta.url))
  const hash = (path, text = false) => createHash('sha256').update(text ? readFileSync(resolve(root,path),'utf8').replaceAll('\r\n','\n') : readFileSync(resolve(root,path))).digest('hex')
  const original = JSON.parse(readFileSync(resolve(root,'evidence/hektor-agent/recording.json'),'utf8'))
  const storyboard = JSON.parse(readFileSync(resolve(root,'evidence/hektor-agent/storyboard.json'),'utf8'))
  const dir = 'evidence/presentations/hektor/sv'
  mkdirSync(resolve(root,dir), { recursive:true })
  assert.equal(hash('evidence/hektor-agent/hektor-demo.mp4'), original.videoSha256)
  copyFileSync(resolve(root,'evidence/hektor-agent/hektor-demo.mp4'), resolve(root,dir,'walkthrough.mp4'))
  const slides = original.slides.map((s,i) => {
    assert.equal(hash(`evidence/hektor-agent/${s.image}`),s.sha256)
    const image = `slide-${String(s.number).padStart(2,'0')}.png`
    copyFileSync(resolve(root,'evidence/hektor-agent',s.image), resolve(root,dir,image))
    return {...s, id:storyboard.slides[i].id, image}
  })
  for (const [from,to] of [['hektor-demo.chapters.vtt','chapters.vtt'],['hektor-demo.sv.vtt','captions.vtt']]) copyFileSync(resolve(root,'evidence/hektor-agent',from),resolve(root,dir,to))
  const sources = ['evidence/hektor-agent/recording.json','evidence/hektor-agent/storyboard.json']
  writeFileSync(resolve(root,dir,'recording.json'), JSON.stringify({demo:'hektor',language:'sv',recordedAt:original.recordedAt,method:'Original completed Hektor recording and all 14 slide images reused byte-for-byte. No redesign or re-encoding.',sourceRepository:original.sourceRepository,sourceRevision:original.sourceRevision,durationSeconds:original.durationSeconds,width:original.width,height:original.height,audio:false,sourceHashNormalization:'UTF-8 with LF line endings',sources:Object.fromEntries(sources.map(p=>[p,hash(p,true)])),videoSha256:original.videoSha256,slides},null,2)+'\n')
  console.log('Restored original Swedish Hektor: 14 slides, 150 seconds; original video/image hashes verified.')
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) restoreHektor()
