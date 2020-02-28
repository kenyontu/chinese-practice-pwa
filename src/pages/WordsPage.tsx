import React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

import styles from './WordsPage.module.css'
import { useGetData } from '../context/dataContext'
import Header from '../components/header/Header'
import HeaderButton from '../components/header/HeaderButton'
import Tabs from '../components/Tabs/index'
import useLocalStorage from '../hooks/useLocalStorage'
import useFavoriteWords from '../hooks/useFavoriteWords'

const allTabId = 'all'
const favoritesTabId = 'fav'

type Props = {} & RouteComponentProps<{ category_id: string }>

const WordsPage: React.FC<Props> = ({ match, history }) => {
  const categoryId = match.params.category_id
  const { category, words } = useGetData(data => ({
    category: data.categoriesById[categoryId],
    words: data.wordsByCategory[categoryId].map(
      wordId => data.wordsById[wordId]
    ),
  }))
  const [openTabId, setOpenTabId] = useOpenTabId()
  const {
    favorites,
    markAsFavorite,
    unmarkAsFavorite,
    removeAllFavorites,
  } = useFavoriteWords(categoryId)

  const handleTabClick = (tabId: string) => {
    setOpenTabId(tabId)
  }

  const handlePracticeClick = () => {
    history.push(`/categories/${categoryId}/practice`)
  }

  const handleAddAllToFavoritesClick = () => {
    markAsFavorite(words.map(w => w.id))
  }

  const handleRemoveAllFavoritesClick = () => {
    removeAllFavorites()
  }

  const wordsToRender =
    openTabId === allTabId ? words : words.filter(w => favorites[w.id])

  return (
    <div className={styles.container}>
      <Header
        title={category.name}
        right={<HeaderButton onClick={handlePracticeClick} icon="dumbbell" />}
        hasNavigateBack
        bottom={
          <Tabs
            openTabId={openTabId}
            onTabClick={handleTabClick}
            tabs={[
              { id: allTabId, text: 'All words' },
              { id: favoritesTabId, text: 'Favorites', icon: 'star' },
            ]}
          />
        }
      />

      {wordsToRender.map(word => (
        <Link key={word.id} className={styles.word} to={`/words/${word.id}`}>
          <div className={styles.wordInfoContainer}>
            <div className={styles.nameContainer}>
              <p className={styles.name}>
                {word.name} <span className={styles.piyin}>{word.piyin}</span>
              </p>
            </div>
            <p className={styles.description}>{word.description}</p>
          </div>
          <button
            className={classNames(styles.favButton, {
              [styles.favButtonActive]: favorites[word.id],
            })}
            onClick={event => {
              event.preventDefault()
              if (favorites[word.id]) {
                unmarkAsFavorite(word.id)
              } else {
                markAsFavorite(word.id)
              }
            }}
          >
            <FontAwesomeIcon icon="star" />
          </button>
        </Link>
      ))}
    </div>
  )
}

const useOpenTabId = () => {
  return useLocalStorage<string>('wordsPageOpenTabId', allTabId)
}

export default WordsPage
