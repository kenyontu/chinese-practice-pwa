declare module 'types' {
  export interface Word {
    name: string
    piyin: string
    description: string
  }

  export interface Lesson {
    id: string
    name: string
  }

  export interface Book {
    id: string
    name: string
    lessons: Lesson[]
  }
}
