declare module 'types' {
  export interface Word {
    id: string
    name: string
    piyin: string
    description: string
  }

  export interface WordList {
    id: string
    name: string
    words: Word[]
  }

  export interface Category {
    id: string
    name: string
  }

  export interface Group {
    id: string
    name: string
  }

  export type PracticeSettingModes = 'cc' | 'p' | 'd'
  export type PracticeSettingDisplay = 'a' | 'f'

  export interface PracticeSettings {
    mode: PracticeSettingModes
    display: PracticeSettingDisplay
  }

  export interface Settings {
    practice: PracticeSettings
  }

  export interface PartialData {
    wordsById: { [key: string]: Word }
    categoriesById: { [key: string]: Category }
    wordsByCategory: { [key: string]: string[] }
  }

  export interface Data extends PartialData {
    categoriesByGroup: { [key: string]: string[] }
    groupsById: { [key: string]: Group }
    bookGroups: string[]
    tocflGroups: string[]
  }
}

declare module 'hanzi-writer' {
  export interface Writer {
    animateCharacter: () => {}
  }

  interface CreateWriterOptions {
    width?: number
    height?: number
    padding?: number
    showOutline?: boolean
    charDataLoader?: () => string
    strokeAnimationSpeed?: number
    delayBetweenStrokes?: number
  }

  interface HanziWriterType {
    create: (
      elmentId: string,
      character: string,
      options: CreateWriterOptions
    ) => Writer
  }

  const HanziWriter: HanziWriterType

  export default HanziWriter
}

declare module 'hanzi-writer-data' {
  type HanziWriterDataType = { [key: string]: string }

  const HanziWriterData: HanziWriterDataType

  export default HanziWriterData
}
