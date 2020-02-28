import React from 'react'
import { Category } from 'types'
import { Link } from 'react-router-dom'

import styles from './CategoriesPage.module.css'

interface Props {
  category: Category & { wordCount: number }
}

const CategoryListItem: React.FC<Props> = ({ category }) => {
  return (
    <Link className={styles.item} to={`/categories/${category.id}`}>
      <span className={styles.itemName}>{category.name}</span>
      <span className={styles.wordCount}>{`${category.wordCount} words`}</span>
    </Link>
  )
}

export default React.memo(CategoryListItem)
