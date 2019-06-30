import B3L3 from './B3L3';
import B3L4 from './B3L4';

const wordsPerLesson = {
  B3L3,
  B3L4
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
      }
    ]
  }
];

export const getWordsByLesson = lessonId =>
  lessonId ? wordsPerLesson[lessonId] : [];
