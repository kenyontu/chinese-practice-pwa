import React, { useMemo } from 'react'

import styles from './StartPracticeDialog.module.css'
import { Dialog, DialogHeader } from './dialog'
import { getPracticeOptions } from '../utils'

interface Props {
  wordCount: number
  onPracticeOptionSelected: (start: number, end: number) => void
  isOpen: boolean
  onClose: () => void
  closeOnBackdropClick?: boolean
}

const StartPracticeDialog: React.FC<Props> = ({
  isOpen,
  wordCount,
  onPracticeOptionSelected,
  onClose,
  closeOnBackdropClick = true,
}) => {
  const practiceOptions = useMemo(() => {
    return getPracticeOptions(wordCount)
  }, [wordCount])

  const handleOnCloseClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation()
    onClose()
  }

  return (
    <Dialog
      isOpen={isOpen}
      onBackdropClick={closeOnBackdropClick ? onClose : () => {}}
    >
      <DialogHeader title="Practice options" />

      {practiceOptions.map(([start, end]) => (
        <button
          key={`${start}${end}`}
          data-testid="practice-option"
          onClick={() => onPracticeOptionSelected(start, end)}
          className={styles.practiceOptionBtn}
        >
          <div>
            <span className={styles.wordNumber}>{start}</span>
            <span className={styles.to}>to</span>
            <span className={styles.wordNumber}>{end}</span>
          </div>
        </button>
      ))}
      <button className={styles.closeBtn} onClick={handleOnCloseClick}>
        Close
      </button>
    </Dialog>
  )
}

export default StartPracticeDialog
