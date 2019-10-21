import React, { useState, useContext, useEffect } from 'react'
import { AppUpdateReadyEvent } from '../index'

const UpdateContext = React.createContext({
  updateAvailable: false,
  updateApp: () => {},
})

export const UpdateProvider: React.FC = ({ children }) => {
  const [updateAvailable, setUpdateAvailable] = useState(false)
  // The value is a function that returns another function
  // because when useState receives a function, it gets executed
  // and its return value is used as the state value
  const [updateApp, setUpdateApp] = useState(() => () => {})

  useEffect(() => {
    const handleUpdateReady = (event: AppUpdateReadyEvent) => {
      const skipWaiting = event.detail.skipWaiting
      setUpdateApp(() => () => {
        skipWaiting()
      })
      setUpdateAvailable(true)
    }

    window.addEventListener(
      'appUpdateReady',
      handleUpdateReady as EventListener
    )

    return () => {
      window.removeEventListener(
        'appUpdateReady',
        handleUpdateReady as EventListener
      )
    }
  }, [])

  useEffect(() => {
    const onControllerChange = () => {
      window.location.reload()
    }

    navigator.serviceWorker.addEventListener(
      'controllerchange',
      onControllerChange
    )

    return () => {
      navigator.serviceWorker.removeEventListener(
        'controllerchange',
        onControllerChange
      )
    }
  }, [])

  const value = { updateAvailable, updateApp }

  return (
    <UpdateContext.Provider value={value}>{children}</UpdateContext.Provider>
  )
}

export const useUpdateContext = () => {
  const updateContext = useContext(UpdateContext)
  return updateContext
}
