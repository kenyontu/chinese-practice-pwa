import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './ListSetting.module.css'

interface Props<T> {
  value: T
  options: Array<{
    id: T
    name: string
    description: string
  }>
  onChange: (value: T) => void
}

const ListSetting = <T extends string>({
  value,
  options,
  onChange,
}: React.PropsWithChildren<Props<T>>): React.ReactElement<Props<T>> => {
  return (
    <div className={styles.container}>
      {options.map(option => (
        <div
          className={styles.settingContainer}
          key={option.id}
          onClick={() => onChange(option.id)}
        >
          <div className={styles.settingDescriptionContainer}>
            <p className={styles.settingName}>{option.name}</p>
            <p className={styles.settingDescription}>{option.description}</p>
          </div>
          {option.id === value && (
            <FontAwesomeIcon className={styles.checkIcon} icon="check" />
          )}
        </div>
      ))}
    </div>
  )
}

export default ListSetting
