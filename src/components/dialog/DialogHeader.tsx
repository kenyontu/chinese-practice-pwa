import React from 'react'

import styles from './Dialog.module.css'

interface Props {
  title: string
}

const DialogHeader: React.FC<Props> = ({ title }) => {
  return <h2 className={styles.header}>{title}</h2>
}

export default React.memo(DialogHeader)
