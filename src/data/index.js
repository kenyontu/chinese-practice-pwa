import B3L3 from './B3L3';
import B3L4 from './B3L4';
import B3L5 from './B3L5';

const wordsPerLesson = {
  B3L3,
  B3L4,
  B3L5
};

export const books = [
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
      }
    ]
  }
];

export const getWordsByLesson = lessonId =>
  lessonId ? wordsPerLesson[lessonId] : [];
