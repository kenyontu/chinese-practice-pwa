import React from 'react'
import { Link } from 'react-router-dom'

import { lessonsByBook } from '../data'
import styles from './LessonsPage.module.css'

const LessonsPage: React.FC = () => {
  return (
    <div className={styles.container}>
      {Object.keys(lessonsByBook).map(bookKey => {
        const lessons = lessonsByBook[bookKey]

        return (
          <div key={bookKey} className={styles.book}>
            <div className={styles.bookHeader}>
              <h2 className={styles.bookTitle}>Book {bookKey}</h2>
            </div>
            <div className={styles.lessons}>
              {lessons.map(lesson => (
                <Link
                  key={lesson.id}
                  className={styles.lesson}
                  to={`/lessons/${lesson.id}`}
                >
                  lesson <span>{lesson.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default LessonsPage
