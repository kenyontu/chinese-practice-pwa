import React from 'react'
import classNames from 'classnames'

import styles from './Header.module.css'
import useIsHeaderVisible from '../../../hooks/useIsHeaderVisible'
import HeaderButton from '../HeaderButton'

interface Props {
  title: string
  hasNavigateBack?: boolean
  right?: React.ReactNode
  hideOnScroll?: boolean
  bottom?: React.ReactNode
}

const Header: React.FC<Props> = ({
  title,
  right,
  hasNavigateBack = false,
  hideOnScroll = false,
  bottom,
}) => {
  const { isHeaderVisible } = useIsHeaderVisible()

  const handleNavBackClick = () => {
    window.history.back()
  }

  return (
    <div
      className={classNames(styles.container, {
        [styles.hideHeader]: hideOnScroll && !isHeaderVisible,
      })}
    >
      <div className={styles.header}>
        {hasNavigateBack && (
          <HeaderButton
            data-testid="nav-back-btn"
            onClick={handleNavBackClick}
            icon="arrow-left"
          />
        )}

        <h1 className={styles.title}>{title}</h1>
        <div className={styles.rightContainer}>{right}</div>
      </div>
      {bottom}
    </div>
  )
}

export default Header
