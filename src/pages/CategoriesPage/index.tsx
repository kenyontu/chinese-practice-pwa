import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

import { useGetData } from '../../context/dataContext'
import useLocalStorage from '../../hooks/useLocalStorage'
import styles from './CategoriesPage.module.css'
import Header from '../../components/header/Header'
import HeaderButton from '../../components/header/HeaderButton'
import Tabs from '../../components/Tabs'
import CategoryListItem from './CategoryListItem'

const booksTabId = 'books'
const tocflTabId = 'tocfl'

const CategoriesPage: React.FC = () => {
  const [openTabId, setOpenTabId] = useLocalStorage(
    'categoriesPageOpenTabId',
    booksTabId
  )
  const categoryGroups = useCategoryGroups(openTabId)
  const { closedGroups, openGroup, closeGroup } = useClosedGroups()

  const handleCategoryChevronClick = (categoryId: string) => () => {
    if (closedGroups[categoryId] === true) {
      openGroup(categoryId)
    } else {
      closeGroup(categoryId)
    }
  }

  return (
    <div className={styles.container}>
      <Header
        title="Categories"
        bottom={
          <Tabs
            openTabId={openTabId}
            onTabClick={tabId => setOpenTabId(tabId)}
            tabs={[
              {
                id: booksTabId,
                text: 'Books',
                icon: 'book',
              },
              {
                id: tocflTabId,
                text: 'TOCFL',
                icon: 'list-alt',
              },
            ]}
          />
        }
      />
      {/* right={<HeaderButton icon="cog" onClick={() => {}} />} */}
      {categoryGroups.map(categoryGroup => {
        return (
          <div key={categoryGroup.id} className={styles.group}>
            <div
              className={classNames(styles.groupHeader, {
                [styles.closed]: closedGroups[categoryGroup.id] === true,
              })}
              onClick={handleCategoryChevronClick(categoryGroup.id)}
            >
              <FontAwesomeIcon
                icon="chevron-down"
                className={classNames(styles.groupChevron, {
                  [styles.openChevron]: !closedGroups[categoryGroup.id],
                })}
              />
              <h3 className={styles.groupTitle}>{categoryGroup.name}</h3>
            </div>
            <div
              className={classNames(styles.itemsGrid, {
                [styles.closed]: closedGroups[categoryGroup.id] === true,
              })}
            >
              {categoryGroup.categories.map(category => (
                <CategoryListItem key={category.id} category={category} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

const useCategoryGroups = (openTabId: string) => {
  return useGetData(data => {
    let groups: string[] = []

    if (openTabId === booksTabId) {
      groups = data.bookGroups
    } else if (openTabId === tocflTabId) {
      groups = data.tocflGroups
    }

    return groups.map(group => ({
      ...data.groupsById[group],
      categories: data.categoriesByGroup[group].map(category => ({
        ...data.categoriesById[category],
        wordCount: data.wordsByCategory[category].length,
      })),
    }))
  })
}

const useClosedGroups = () => {
  const [closedGroups, setClosedGroups] = useLocalStorage<{
    [key: string]: boolean
  }>('closed-groups', {})

  const openGroup = (groupId: string) => {
    setClosedGroups({ ...closedGroups, [groupId]: false })
  }

  const closeGroup = (groupId: string) => {
    setClosedGroups({ ...closedGroups, [groupId]: true })
  }

  return {
    closedGroups,
    openGroup,
    closeGroup,
  }
}

export default CategoriesPage
