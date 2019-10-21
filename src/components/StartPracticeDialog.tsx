import React, { useMemo } from 'react'

import styles from './StartPracticeDialog.module.css'
import { Dialog } from './dialog'
import { getPracticeOptions } from '../utils'

interface Props {
  isOpen: boolean
  wordCount: number
  practiceOptionSelected: (start: number, end: number) => void
  onClose: () => void
  closeOnBackdropClick?: boolean
}

const StartPracticeDialog: React.FC<Props> = ({
  isOpen,
  wordCount,
  practiceOptionSelected,
  onClose,
  closeOnBackdropClick = false,
}) => {
  const practiceOptions = useMemo(() => {
    return getPracticeOptions(wordCount)
  }, [wordCount])

  return (
    <Dialog
      isOpen={isOpen}
      onBackdropClick={closeOnBackdropClick ? onClose : () => {}}
    >
      <h2 className={styles.header}>Practice options</h2>
      {practiceOptions.map(([start, end]) => (
        <button
          key={`${start}${end}`}
          onClick={() => practiceOptionSelected(start, end)}
          className={styles.practiceOptionBtn}
        >
          <div>
            <span>{start}</span> to <span>{end}</span>
          </div>
        </button>
      ))}
      <button className={styles.closeBtn} onClick={onClose}>
        Close
      </button>
    </Dialog>
  )
}

export default StartPracticeDialog
