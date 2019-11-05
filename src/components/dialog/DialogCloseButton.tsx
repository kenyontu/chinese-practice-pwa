import React from 'react'

import styles from './Dialog.module.css'

interface Props {
  onClick: () => void
}

const DialogCloseButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button className={styles.closeButton} onClick={onClick}>
      Close
    </button>
  )
}

export default DialogCloseButton
