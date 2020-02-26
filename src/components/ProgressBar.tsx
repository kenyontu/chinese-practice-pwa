import React from 'react'
import styles from './ProgressBar.module.css'

interface Props {
  max: number
  current: number
}

const ProgressBar: React.FC<Props> = ({ max, current }) => {
  return (
    <div className={styles.progressBar}>
      <div
        className={styles.progress}
        style={{ width: `${(current / max) * 100}%` }}
      ></div>
    </div>
  )
}

export default ProgressBar
