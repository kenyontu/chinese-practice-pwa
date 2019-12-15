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
import B2L11 from './B2L11'
import B2L12 from './B2L12'
import B2L13 from './B2L13'

// B3
import B3L1 from './B3L1'
import B3L2 from './B3L2'
import B3L3 from './B3L3'
import B3L4 from './B3L4'
import B3L5 from './B3L5'
import B3L6 from './B3L6'
import B3L7 from './B3L7'
import B3L8 from './B3L8'
import B3L9 from './B3L9'
import B3L10 from './B3L10'
import B3L11 from './B3L11'
import B3L12 from './B3L12'
import B3L13 from './B3L13'
import B3L14 from './B3L14'

// TOCFL
import tocfl1 from './tocfl1'
import tocfl2 from './tocfl2'
import tocfl3 from './tocfl3'
import tocfl4 from './tocfl4'
import tocfl5 from './tocfl5'
import tocfl6 from './tocfl6'
import tocfl7 from './tocfl7'

// ETC
import chengyu from './chengyu'
import extra from './extra'

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
    wordLists: [
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
      B2L11,
      B2L12,
      B2L13,
    ],
  },
  '3': {
    id: '3',
    name: 'Book 3',
    wordLists: [
      B3L1,
      B3L2,
      B3L3,
      B3L4,
      B3L5,
      B3L6,
      B3L7,
      B3L8,
      B3L9,
      B3L10,
      B3L11,
      B3L12,
      B3L13,
      B3L14
    ],
  },
  tocfl: {
    id: 'tocfl',
    name: 'TOCFL',
    wordLists: [tocfl1, tocfl2, tocfl3, tocfl4, tocfl5, tocfl6, tocfl7],
  },
  etc: {
    id: 'etc',
    name: 'Etc',
    wordLists: [chengyu, extra],
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
  B2L11,
  B2L12,
  B2L13,
  B3L1,
  B3L2,
  B3L3,
  B3L4,
  B3L5,
  B3L6,
  B3L7,
  B3L8,
  B3L9,
  B3L10,
  B3L11,
  B3L12,
  B3L13,
  B3L14,
  tocfl1,
  tocfl2,
  tocfl3,
  tocfl4,
  tocfl5,
  tocfl6,
  tocfl7,
  chengyu,
  extra,
}

export const getWordList = (wordListId: string): WordList | null =>
  wordListId ? wordLists[wordListId] : null
