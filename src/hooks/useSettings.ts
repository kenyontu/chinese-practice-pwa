import { Settings } from 'types'

import useLocalStorage from './useLocalStorage'

const defaultSettings: Settings = {
  practice: {
    mode: 'cc',
    display: 'a',
  },
}

const useSettings = () => {
  return useLocalStorage<Settings>('settings', defaultSettings)
}

export default useSettings
