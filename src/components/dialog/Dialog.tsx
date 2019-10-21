import React from 'react'
import classNames from 'classnames'

import styles from './Dialog.module.css'

interface Props {
  isOpen: boolean
  onBackdropClick?: () => void
}

const Dialog: React.FC<Props> = ({ children, isOpen, onBackdropClick }) => {
  return (
    <div
      className={classNames(styles.backdrop, { [styles.open]: isOpen })}
      onClick={onBackdropClick}
    >
      <div className={styles.dialog}>{children}</div>
    </div>
  )
}

export default Dialog
