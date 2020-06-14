import { Data } from 'types'
import partialData from './partialData'

// A single object for all data in the app
const data: Data = {
  wordsById: partialData.wordsById,
  categoriesById: partialData.categoriesById,
  wordsByCategory: partialData.wordsByCategory,
  groupsById: {
    B1: {
      id: 'B1',
      name: 'Book 1',
    },
    B2: {
      id: 'B2',
      name: 'Book 2',
    },
    B3: {
      id: 'B3',
      name: 'Book 3',
    },
    B4: {
      id: 'B4',
      name: 'Book 4',
    },
    others: {
      id: 'others',
      name: 'Others',
    },
    T1: {
      id: 'T1',
      name: 'Level 1',
    },
    T2: {
      id: 'T2',
      name: 'Level 2',
    },
    T3: {
      id: 'T3',
      name: 'Level 3',
    },
    T4: {
      id: 'T4',
      name: 'Level 4',
    },
    T5: {
      id: 'T5',
      name: 'Level 5',
    },
    T6: {
      id: 'T6',
      name: 'Level 6',
    },
    T7: {
      id: 'T7',
      name: 'Level 7',
    },
  },
  categoriesByGroup: {
    B1: [
      'B1L1',
      'B1L2',
      'B1L3',
      'B1L4',
      'B1L5',
      'B1L6',
      'B1L7',
      'B1L8',
      'B1L9',
      'B1L10',
      'B1L11',
      'B1L12',
    ],
    B2: [
      'B2L1',
      'B2L2',
      'B2L3',
      'B2L4',
      'B2L5',
      'B2L6',
      'B2L7',
      'B2L8',
      'B2L9',
      'B2L10',
      'B2L11',
      'B2L12',
      'B2L13',
    ],
    B3: [
      'B3L1',
      'B3L2',
      'B3L3',
      'B3L4',
      'B3L5',
      'B3L6',
      'B3L7',
      'B3L8',
      'B3L9',
      'B3L10',
      'B3L11',
      'B3L12',
      'B3L13',
      'B3L14',
    ],
    B4: [
      'B4L1',
      'B4L2',
      'B4L3',
      'B4L4',
      'B4L5',
      'B4L6',
      'B4L7',
      'B4L8',
      'B4L9',
      'B4L10',
      'B4L11',
    ],
    others: ['chengyu', 'extra'],
    T1: ['T1-1', 'T1-2'],
    T2: ['T2-1', 'T2-2'],
    T3: ['T3-1', 'T3-2'],
    T4: ['T4-1', 'T4-2', 'T4-3', 'T4-4', 'T4-5'],
    T5: [
      'T5-1',
      'T5-2',
      'T5-3',
      'T5-4',
      'T5-5',
      'T5-6',
      'T5-7',
      'T5-8',
      'T5-9',
      'T5-10',
      'T5-11',
      'T5-12',
    ],
    T6: [
      'T6-1',
      'T6-2',
      'T6-3',
      'T6-4',
      'T6-5',
      'T6-6',
      'T6-7',
      'T6-8',
      'T6-9',
      'T6-10',
      'T6-11',
      'T6-12',
      'T6-13',
      'T6-14',
      'T6-15',
      'T6-16',
      'T6-17',
      'T6-18',
      'T6-19',
      'T6-20',
      'T6-21',
    ],
    T7: [
      'T7-1',
      'T7-2',
      'T7-3',
      'T7-4',
      'T7-5',
      'T7-6',
      'T7-7',
      'T7-8',
      'T7-9',
      'T7-10',
      'T7-11',
      'T7-12',
      'T7-13',
      'T7-14',
      'T7-15',
      'T7-16',
      'T7-17',
      'T7-18',
      'T7-19',
      'T7-20',
      'T7-21',
      'T7-22',
      'T7-23',
      'T7-24',
      'T7-25',
      'T7-26',
      'T7-27',
    ],
  },
  bookGroups: ['B1', 'B2', 'B3', 'B4', 'others'],
  tocflGroups: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
}

export default data
