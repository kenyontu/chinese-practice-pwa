import React from 'react'
import produce from 'immer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Dialog, DialogHeader, DialogCloseButton } from './dialog'
import { PracticeSettings, PracticeSettingHiddenKeys } from 'types'
import styles from './PracticeSettingsDialog.module.css'

interface Props {
  isOpen: boolean
  onClose?: () => void
  closeOnBackdropClick?: boolean
  settings: PracticeSettings
  onSettingsChange: (settings: PracticeSettings) => void
}

const PracticeSettingsDialog: React.FC<Props> = ({
  isOpen = false,
  onClose = () => {},
  closeOnBackdropClick = true,
  settings,
  onSettingsChange,
}) => {
  const onHiddenSettingChange = (property: PracticeSettingHiddenKeys) => () => {
    const newValue = !settings.hidden[property]
    const count = Object.keys(settings.hidden).reduce(
      (a, k) => (settings.hidden[k] === newValue ? a + 1 : a),
      0
    )

    if (count < 2) {
      onSettingsChange(
        produce(settings, draft => {
          draft.hidden[property] = !settings.hidden[property]
        })
      )
    }
  }

  return (
    <Dialog
      isOpen={isOpen}
      onBackdropClick={closeOnBackdropClick ? onClose : () => {}}
    >
      <DialogHeader title="Practice settings" />
      <div className={styles.content}>
        <h3 className={styles.settingHeader}>Hidden</h3>
        <div className={styles.settingHiddenOption}>
          <label htmlFor="hide-characters">Characters</label>
          <input
            id="hide-characters"
            type="checkbox"
            checked={settings.hidden.characters}
            onChange={onHiddenSettingChange('characters')}
          />
          <span
            className={styles.checkbox}
            onClick={onHiddenSettingChange('characters')}
          >
            <FontAwesomeIcon icon="check" />
          </span>
        </div>
        <div className={styles.settingHiddenOption}>
          <label htmlFor="hide-piyin">Piyin</label>
          <input
            id="hide-piyin"
            type="checkbox"
            checked={settings.hidden.piyin}
            onChange={onHiddenSettingChange('piyin')}
          />
          <span
            className={styles.checkbox}
            onClick={onHiddenSettingChange('piyin')}
          >
            <FontAwesomeIcon icon="check" />
          </span>
        </div>
        <div className={styles.settingHiddenOption}>
          <label htmlFor="hide-description">Description</label>
          <input
            id="hide-description"
            type="checkbox"
            checked={settings.hidden.description}
            onChange={onHiddenSettingChange('description')}
          />
          <span
            className={styles.checkbox}
            onClick={onHiddenSettingChange('description')}
          >
            <FontAwesomeIcon icon="check" />
          </span>
        </div>
      </div>
      <DialogCloseButton onClick={onClose} />
    </Dialog>
  )
}

export default PracticeSettingsDialog
