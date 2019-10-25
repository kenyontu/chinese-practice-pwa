import React from 'react'
import classNames from 'classnames'
import { useSpring, animated } from 'react-spring'

import styles from './Dialog.module.css'

interface Props {
  isOpen: boolean
  onBackdropClick?: () => void
}

const Dialog: React.FC<Props> = ({ children, isOpen, onBackdropClick }) => {
  const dialogSpring = useSpring({
    config: { duration: 200, delay: 100 },
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0)' : 'translateY(50%)',
  })

  return (
    <div
      data-testid="dialog-backdrop"
      className={classNames(styles.backdrop, { [styles.open]: isOpen })}
      onClick={onBackdropClick}
    >
      <animated.div style={dialogSpring} className={styles.dialog}>
        {isOpen ? children : null}
      </animated.div>
    </div>
  )
}

export default Dialog
