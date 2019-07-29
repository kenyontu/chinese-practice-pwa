import B1L1 from './B1L1';
import B1L2 from './B1L2';
import B1L3 from './B1L3';
import B1L4 from './B1L4';
import B1L5 from './B1L5';
import B1L6 from './B1L6';
import B1L7 from './B1L7';
import B1L8 from './B1L8';
import B1L9 from './B1L9';
import B1L10 from './B1L10';
import B1L11 from './B1L11';
import B1L12 from './B1L12';
import B3L3 from './B3L3';
import B3L4 from './B3L4';
import B3L5 from './B3L5';
import B3L6 from './B3L6';

const wordsPerLesson = {
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
  B3L6
};

export const books = [
  {
    id: 'B1',
    name: 'Book 1',
    lessons: [
      {
        id: 'B1L1',
        name: 'Lesson 1',
        wordCount: B1L1.length
      },
      {
        id: 'B1L2',
        name: 'Lesson 2',
        wordCount: B1L2.length
      },
      {
        id: 'B1L3',
        name: 'Lesson 3',
        wordCount: B1L3.length
      },
      {
        id: 'B1L4',
        name: 'Lesson 4',
        wordCount: B1L4.length
      },
      {
        id: 'B1L5',
        name: 'Lesson 5',
        wordCount: B1L5.length
      },
      {
        id: 'B1L6',
        name: 'Lesson 6',
        wordCount: B1L6.length
      },
      {
        id: 'B1L7',
        name: 'Lesson 7',
        wordCount: B1L7.length
      },
      {
        id: 'B1L8',
        name: 'Lesson 8',
        wordCount: B1L8.length
      },
      {
        id: 'B1L9',
        name: 'Lesson 9',
        wordCount: B1L9.length
      },
      {
        id: 'B1L10',
        name: 'Lesson 10',
        wordCount: B1L10.length
      },
      {
        id: 'B1L11',
        name: 'Lesson 11',
        wordCount: B1L11.length
      },
      {
        id: 'B1L12',
        name: 'Lesson 12',
        wordCount: B1L12.length
      }
    ]
  },
  {
    id: 'B3',
    name: 'Book 3',
    lessons: [
      {
        id: 'B3L3',
        name: 'Lesson 3',
        wordCount: B3L3.length
      },
      {
        id: 'B3L4',
        name: 'Lesson 4',
        wordCount: B3L4.length
      },
      {
        id: 'B3L5',
        name: 'Lesson 5',
        wordCount: B3L5.length
      },
      {
        id: 'B3L6',
        name: 'Lesson 6',
        wordCount: B3L6.length
      }
    ]
  }
];

export const getWordsByLesson = lessonId =>
  lessonId ? wordsPerLesson[lessonId] : [];
