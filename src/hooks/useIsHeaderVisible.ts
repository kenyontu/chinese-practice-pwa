import { useState, useEffect } from 'react'
import throttle from 'lodash/throttle'

const SCROLL_DELTA = 10
const HEADER_HEIGHT = 58

const useIsHeaderVisible = () => {
  const [previousScrollPos, setPreviousScrollPos] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const onScroll = throttle(() => {
      const currentScrollPos = window.pageYOffset

      if (Math.abs(previousScrollPos - currentScrollPos) <= SCROLL_DELTA) {
        return
      }

      if (
        currentScrollPos > previousScrollPos &&
        currentScrollPos > HEADER_HEIGHT
      ) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setPreviousScrollPos(currentScrollPos)
    }, 200)

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  })

  return {
    isHeaderVisible: isVisible,
  }
}

export default useIsHeaderVisible
