export const shuffle = <T = {}>(source: T[]): T[] => {
  const array = Array.from(source)

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  return array
}

export const getPracticeOptions = (wordCount: number) => {
  const practiceOptions = [[1, wordCount]]
  let a = 1

  if (wordCount <= 13) {
    return practiceOptions
  }

  while (wordCount > 0) {
    if (wordCount >= 13) {
      practiceOptions.push([a, a + 9])
      a += 10
      wordCount -= 10
      continue
    }

    practiceOptions.push([a, a + wordCount - 1])
    break
  }

  return practiceOptions
}
