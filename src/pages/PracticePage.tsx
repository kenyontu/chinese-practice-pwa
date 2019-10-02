import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Word } from 'types'

import styles from './PracticePage.module.css'
import Header from '../components/Header'
import { getWordsByLesson } from '../data'
import { shuffle } from '../utils'

type Props = {} & RouteComponentProps<{ lesson_id: string }>

const PracticePage: React.FC<Props> = ({ match }) => {
  const lessonId = match.params.lesson_id
  const [words, setWords] = useState<Word[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const lessonWords = getWordsByLesson(lessonId)
    setWords(shuffle(lessonWords))
  }, [lessonId])

  const handleAnswerClick = () => {
    setRevealed(true)
  }

  const handleNextClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation()
    setRevealed(false)

    if (currentWordIndex === words.length - 1) {
      setWords(shuffle(getWordsByLesson(lessonId)))
      setCurrentWordIndex(0)
    } else {
      setCurrentWordIndex(currentWordIndex + 1)
    }
  }

  const currentWord = words[currentWordIndex]

  return (
    <div className={styles.container}>
      <Header
        title={`${currentWordIndex + 1}/${words.length}`}
        hasNavigateBack
      />
      {words.length > 0 ? (
        <>
          <div className={styles.questionContainer}>
            <p className={styles.word}>{currentWord.name}</p>
            <p className={styles.description}>{currentWord.description}</p>
          </div>
          <div className={styles.answerContainer}>
            <div
              className={classNames(styles.coverOverlay, {
                [styles.hideCoverOverlay]: revealed,
              })}
              onClick={handleAnswerClick}
            >
              Reveal
            </div>
            <div className={styles.answerContent}>
              <p className={styles.answer}>{currentWord.piyin}</p>
            </div>

            <button className={styles.nextBtn} onClick={handleNextClick}>
              Next <FontAwesomeIcon icon="chevron-right" />
            </button>
          </div>
        </>
      ) : (
        <p>There are no words on this lesson</p>
      )}
    </div>
  )
}

export default PracticePage
