import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import styles from './Tabs.module.css'

interface Tab {
  id: string
  icon?: IconProp
  text: string
}

interface Props {
  tabs: Tab[]
  openTabId: string
  className?: string
  onTabClick: (tabId: string) => void
}

const Tabs: React.FC<Props> = ({ tabs, openTabId, className, onTabClick }) => {
  return (
    <div className={classNames(styles.container, className)}>
      {tabs.map(tab => (
        <div
          key={tab.id}
          className={classNames(styles.tab, {
            [styles.selected]: openTabId === tab.id,
          })}
          onClick={() => onTabClick(tab.id)}
        >
          {tab.icon && (
            <FontAwesomeIcon icon={tab.icon} className={styles.icon} />
          )}
          <span className={styles.text}>{tab.text}</span>
        </div>
      ))}
    </div>
  )
}

export default Tabs
