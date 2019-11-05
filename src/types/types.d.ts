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

  export interface Group {
    id: string
    name: string
    wordLists: WordList[]
  }

  export type PracticeSettingHiddenKeys = 'characters' | 'piyin' | 'description'

  export interface PracticeSettings {
    hidden: {
      [key: string]: boolean
      characters: boolean
      piyin: boolean
      description: boolean
    }
  }
}
