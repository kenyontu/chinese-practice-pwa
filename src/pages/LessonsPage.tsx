import React from 'react'
import { Link } from 'react-router-dom'

import { groups } from '../data'
import styles from './LessonsPage.module.css'
import Header from '../components/Header'

const LessonsPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header title="Lessons 1" hideOnScroll />

      {Object.keys(groups).map(groupKey => {
        const wordLists = groups[groupKey].wordLists

        return (
          <div key={groupKey} className={styles.group}>
            <div className={styles.groupHeader}>
              <h2 className={styles.groupTitle}>{groups[groupKey].name}</h2>
            </div>
            <div className={styles.wordLists}>
              {wordLists.map(wordList => {
                const splitted = wordList.name.split(' ')
                return (
                  <Link
                    key={wordList.id}
                    className={styles.wordList}
                    to={`/lessons/${wordList.id}`}
                  >
                    {splitted.length === 2 ? (
                      <>
                        {splitted[0]} <span>{splitted[1]}</span>
                      </>
                    ) : (
                      <span>{splitted[0]}</span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default LessonsPage
