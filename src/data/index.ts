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
    B4: ['B4L1', 'B4L2'],
    others: ['chengyu', 'extra'],
    T1: ['tocfl1'],
    T2: ['tocfl2'],
    T3: ['tocfl3'],
    T4: ['tocfl4'],
    T5: ['tocfl5'],
    T6: ['tocfl6'],
    T7: ['tocfl7'],
  },
  bookGroups: ['B1', 'B2', 'B3', 'B4', 'others'],
  tocflGroups: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
}

export default data
