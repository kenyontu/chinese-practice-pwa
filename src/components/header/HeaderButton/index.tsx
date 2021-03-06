import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import styles from './HeaderButton.module.css'

interface Props {
  icon: IconProp
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const HeaderButton: React.FC<Props> = ({ icon, onClick, ...props }) => {
  return (
    <button {...props} className={styles.button} onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </button>
  )
}

export default HeaderButton
