import { Word, Lesson } from 'types'

import B1L1 from './B1L1'
import B1L2 from './B1L2'
import B1L3 from './B1L3'
import B1L4 from './B1L4'
import B1L5 from './B1L5'
import B1L6 from './B1L6'
import B1L7 from './B1L7'
import B1L8 from './B1L8'
import B1L9 from './B1L9'
import B1L10 from './B1L10'
import B1L11 from './B1L11'
import B1L12 from './B1L12'
import B3L3 from './B3L3'
import B3L4 from './B3L4'
import B3L5 from './B3L5'
import B3L6 from './B3L6'
import B3L7 from './B3L7'
import B3L10 from './B3L10'

const wordsPerLesson: { [key: string]: Word[] } = {
  B1L1,
  B1L2,
  B1L3,
  B1L4,
  B1L5,
  B1L6,
  B1L7,
  B1L8,
  B1L9,
  B1L10,
  B1L11,
  B1L12,
  B3L3,
  B3L4,
  B3L5,
  B3L6,
  B3L7,
  B3L10,
}

export const lessonsByBook: { [key: string]: Lesson[] } = Object.keys(
  wordsPerLesson
).reduce((a: { [key: string]: { id: string; name: string }[] }, lesson) => {
  const bookId = lesson.substr(1, 1)
  if (!a[bookId]) {
    a[bookId] = []
  }

  a[bookId].push({
    id: lesson,
    name: lesson.substring(3),
  })

  return a
}, {})

export const getWordsByLesson = (lessonId: string) =>
  lessonId ? wordsPerLesson[lessonId] : []
