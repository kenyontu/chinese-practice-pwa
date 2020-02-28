import React from 'react'
import { Dialog, DialogHeader, DialogCloseButton } from '../dialog'

import styles from './ActionDialog.module.css'

interface Props {
  isOpen: boolean
  onClose: () => void
  actions: Array<{ id: string; label: string; onClick: () => void }>
}

const ActionDialog: React.FC<Props> = ({ isOpen, onClose, actions }) => {
  return (
    <Dialog isOpen={isOpen}>
      <DialogHeader title="Actions" />
      <div className={styles.container}>
        {actions.map(action => (
          <div
            key={action.id}
            className={styles.action}
            onClick={action.onClick}
          >
            {action.label}
          </div>
        ))}
      </div>
      <DialogCloseButton onClick={onClose} />
    </Dialog>
  )
}

export default ActionDialog
