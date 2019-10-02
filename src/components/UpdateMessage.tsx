import React from 'react'
import classNames from 'classnames'

import { useUpdateContext } from '../context/updateContext'
import styles from './UpdateMessage.module.css'

const UpdateMessage: React.FC = () => {
  const { updateAvailable, updateApp } = useUpdateContext()
  const handleRefreshClick = () => {
    updateApp()
  }

  return (
    <div
      className={classNames(styles.container, {
        [styles.containerNotVisible]: !updateAvailable,
      })}
    >
      <p>Update ready, refresh to apply the changes</p>
      <button
        id="refresh"
        className={styles.refresh}
        onClick={handleRefreshClick}
      >
        refresh
      </button>
    </div>
  )
}

export default React.memo(UpdateMessage)
