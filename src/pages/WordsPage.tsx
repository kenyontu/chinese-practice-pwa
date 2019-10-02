import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Word } from 'types'

import { getWordsByLesson } from '../data'
import styles from './WordsPage.module.css'
import Header from '../components/Header'
import HeaderButton from '../components/HeaderButton'

type Props = {} & RouteComponentProps<{ lesson_id: string }>

const WordsPage: React.FC<Props> = ({ match, history }) => {
  const lessonId = match.params.lesson_id
  const [words, setWords] = useState<Word[]>([])

  useEffect(() => {
    const lessonWords = getWordsByLesson(match.params.lesson_id)
    setWords(lessonWords)
  }, [match.params.lesson_id])

  const handlePracticeClick = () => {
    history.push(`/lessons/${lessonId}/practice`)
  }

  return (
    <div className={styles.container}>
      <Header
        title={`Lesson ${lessonId.substr(3)}`}
        right={<HeaderButton onClick={handlePracticeClick} icon="dumbbell" />}
        hasNavigateBack
        hideOnScroll
      />

      {words.map(word => (
        <div key={`${word.name}${word.description}`} className={styles.word}>
          <p className={styles.name}>
            {word.name}
            <span>{word.piyin}</span>
          </p>
          <p className={styles.description}>{word.description}</p>
        </div>
      ))}
    </div>
  )
}

export default WordsPage
