import React from 'react'
import produce from 'immer'
import { Settings, PracticeSettingModes, PracticeSettingDisplay } from 'types'

import styles from './PracticeSettingsPage.module.css'
import Header from '../../components/header/Header'
import ListSetting from '../../components/settings/ListSetting'
import useSettings from '../../hooks/useSettings'

interface Props {}

const PracticeSettingsPage: React.FC<Props> = () => {
  const [settings, setSettings] = useSettings()
  const handleModeChange = (mode: PracticeSettingModes) => {
    setSettings(
      produce(settings, (draft: Settings) => {
        draft.practice.mode = mode
      })
    )
  }
  const handleDisplayChange = (display: PracticeSettingDisplay) => {
    setSettings(
      produce(settings, (draft: Settings) => {
        draft.practice.display = display
      })
    )
  }

  return (
    <div className={styles.container}>
      <Header title="Practice Settings" hasNavigateBack />
      <h2 className={styles.settingHeader}>MODE</h2>
      <ListSetting<PracticeSettingModes>
        value={settings.practice.mode}
        onChange={handleModeChange}
        options={[
          {
            id: 'cc',
            name: 'Chinese character',
            description: 'Only the chinese character is shown',
          },
          {
            id: 'p',
            name: 'Pinyin',
            description: 'Only the pinyin is shown',
          },
          {
            id: 'd',
            name: 'Description',
            description: 'Only the description is shown',
          },
        ]}
      />
      <h2 className={styles.settingHeader}>DISPLAY</h2>
      <ListSetting<PracticeSettingDisplay>
        value={settings.practice.display}
        onChange={handleDisplayChange}
        options={[
          {
            id: 'a',
            name: 'Show all',
            description: 'Display all words',
          },
          {
            id: 'f',
            name: 'Only favorites',
            description: 'Display only favorite words',
          },
        ]}
      />
    </div>
  )
}

export default PracticeSettingsPage
