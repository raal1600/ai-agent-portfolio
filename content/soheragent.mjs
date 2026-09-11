import { story } from '../presentations/review/soheragent-story.mjs'

const pair = values => ({ en: values[0], sv: values[1] })
// Keep established chapter anchors, including the former evidence bookmark.
const ids = ['overview', 'problem', 'plan', 'coordinate', 'controls', 'review', 'use-cases', 'next-step']
const groups = [
  [[0], [1], [2], [3]],
  [[0,1], [2,3,4,5]],
  [[0,1,2,3], [4,5], [6,7]],
  [[0,1], [2,3], [4,5], [6,7]],
  [[0], [1,2,3,4,5,6,7], [8,9]],
  [[0,1,2,3,4,5,6], [7,8,9,10]],
  [[0,1,2,3,4,5,6], [7,8,9,10]],
  [[0,1], [2,3], [4,5]],
]

export const soherAgentSlides = story.map((s, index) => ({
  id: ids[index],
  ...(index === 6 ? { aliases: ['evidence'] } : {}),
  layout: 'story',
  title: pair(s.title),
  summary: pair(s.intro),
  seconds: 16,
  items: [
    ...groups[index].map(([heading, ...body]) => ({
      title: pair(s.labels[heading]),
      text: pair([0,1].map(lang => body.map(i => s.labels[i][lang]).join(' · '))),
    })),
    { title: { en: 'Context', sv: 'Sammanhang' }, text: pair(s.note) },
  ],
}))
