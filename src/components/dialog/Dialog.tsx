import React from 'react'
import classNames from 'classnames'

import styles from './Dialog.module.css'

interface Props {
  isOpen: boolean
}

const Dialog: React.FC<Props> = ({ children, isOpen }) => {
  return (
    <div className={classNames(styles.container, { [styles.open]: isOpen })}>
      <div className={styles.dialog}>{children}</div>
    </div>
  )
}

export default Dialog
