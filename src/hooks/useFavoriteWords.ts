import { useEffect } from 'react'
import useLocalStorage from './useLocalStorage'

const useFavoriteWords = (categoryId: string) => {
  const [favoriteWords, setFavoriteWords] = useLocalStorage<{
    [key: string]: { [key: string]: boolean }
  }>('favoriteWords', {})

  useEffect(() => {
    if (favoriteWords[categoryId] === undefined) {
      setFavoriteWords({ ...favoriteWords, [categoryId]: {} })
    }
  }, [categoryId, setFavoriteWords, favoriteWords])

  const markAsFavorite = (wordId: string | string[]) => {
    if (Array.isArray(wordId)) {
      const favorites: { [key: string]: boolean } = {}
      for (let i = 0; i < wordId.length; i++) {
        favorites[wordId[i]] = true
      }

      setFavoriteWords({
        ...favoriteWords,
        [categoryId]: favorites,
      })
    } else {
      setFavoriteWords({
        ...favoriteWords,
        [categoryId]: { ...favoriteWords[categoryId], [wordId]: true },
      })
    }
  }

  const unmarkAsFavorite = (wordId: string) => {
    delete favoriteWords[categoryId][wordId]
    setFavoriteWords({ ...favoriteWords })
  }

  const removeAllFavorites = () => {
    setFavoriteWords({ ...favoriteWords, [categoryId]: {} })
  }

  return {
    favorites: favoriteWords[categoryId] || {},
    markAsFavorite,
    unmarkAsFavorite,
    removeAllFavorites,
  }
}

export default useFavoriteWords
