import { Group, WordList } from 'types'

// B1
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

// B2
import B2L1 from './B2L1'
import B2L2 from './B2L2'
import B2L3 from './B2L3'
import B2L4 from './B2L4'
import B2L5 from './B2L5'
import B2L6 from './B2L6'
import B2L7 from './B2L7'
import B2L8 from './B2L8'
import B2L9 from './B2L9'
import B2L10 from './B2L10'

// B3
import B3L3 from './B3L3'
import B3L4 from './B3L4'
import B3L5 from './B3L5'
import B3L6 from './B3L6'
import B3L7 from './B3L7'
import B3L10 from './B3L10'

// ETC
import chengyu from './chengyu'

export const groups: { [key: string]: Group } = {
  '1': {
    id: '1',
    name: 'Book 1',
    wordLists: [
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
    ],
  },
  '2': {
    id: '2',
    name: 'Book 2',
    wordLists: [B2L1, B2L2, B2L3, B2L4, B2L5, B2L6, B2L7, B2L8, B2L9, B2L10],
  },
  '3': {
    id: '3',
    name: 'Book 3',
    wordLists: [B3L3, B3L4, B3L5, B3L6, B3L7, B3L10],
  },
  etc: {
    id: 'etc',
    name: 'Etc',
    wordLists: [chengyu],
  },
}

const wordLists: { [key: string]: WordList } = {
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
  B2L1,
  B2L2,
  B2L3,
  B2L4,
  B2L5,
  B2L6,
  B2L7,
  B2L8,
  B2L9,
  B2L10,
  B3L3,
  B3L4,
  B3L5,
  B3L6,
  B3L7,
  B3L10,
  chengyu,
}

export const getWordList = (wordListId: string): WordList | null =>
  wordListId ? wordLists[wordListId] : null
