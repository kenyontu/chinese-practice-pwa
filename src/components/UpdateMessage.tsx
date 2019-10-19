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
        [styles.visible]: updateAvailable,
      })}
    >
      <div className={styles.content}>
        <h3>Update ready</h3>
        <p>
          Changes will be applied the next time you open the app. You can click
          on reload to apply them now.
        </p>

        <button
          id="reload"
          className={styles.reload}
          onClick={handleRefreshClick}
        >
          Reload
        </button>
      </div>
    </div>
  )
}

export default React.memo(UpdateMessage)
