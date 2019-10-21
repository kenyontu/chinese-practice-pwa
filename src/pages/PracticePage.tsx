import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import queryString from 'query-string'
import { Word } from 'types'

import styles from './PracticePage.module.css'
import Header from '../components/Header'
import SpeechButton from '../components/SpeechButton'
import { getWordList } from '../data'
import { shuffle } from '../utils'

const filterWords = (words: Word[], query: string) => {
  const { start, end } = queryString.parse(query, {
    parseNumbers: true,
  })

  if (typeof start === 'number' && typeof end === 'number' && start <= end) {
    return words.slice(start - 1, end)
  }

  return words
}

type Props = {} & RouteComponentProps<{ lesson_id: string }>

const PracticePage: React.FC<Props> = ({ match, location }) => {
  const lessonId = match.params.lesson_id
  const [words, setWords] = useState<Word[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const wordList = getWordList(lessonId)
    if (wordList !== null) {
      setWords(shuffle(filterWords(wordList.words, location.search)))
    }
  }, [lessonId, location.search])

  const handleAnswerClick = () => {
    setRevealed(true)
  }

  const handleNextClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation()
    setRevealed(false)

    if (currentWordIndex === words.length - 1) {
      const wordList = getWordList(lessonId)
      if (wordList !== null) {
        setWords(shuffle(filterWords(wordList.words, location.search)))
        setCurrentWordIndex(0)
      }
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
            <SpeechButton
              className={styles.speechBtn}
              iconClassName={styles.speechIcon}
              text={currentWord.name}
            />
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
              <FontAwesomeIcon icon="arrow-alt-circle-right" />
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
