const fs = require('fs')

const LINE_SPLIT_CHAR = '|'
const SOURCE_DATA_FOLDER = './source_data'
const DATA_PATH = './src/data/partialData.ts'

const readFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, content) => {
      if (err) {
        reject(err)
      } else {
        resolve(content)
      }
    })
  })

const parse = async () => {
  const files = fs.readdirSync(SOURCE_DATA_FOLDER)

  const wordsById = {}
  const categoriesById = {}
  const wordsByCategory = {}

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const filePath = `${SOURCE_DATA_FOLDER}/${file}`

    const contents = await readFile(filePath)

    const [categoryName, ...lines] = contents.split('\n')

    categoriesById[file] = {
      id: file,
      name: categoryName,
    }

    wordsByCategory[file] = []

    for (let i = 0; i < lines.length; i++) {
      const [id, name, piyin, description] = lines[i].split(LINE_SPLIT_CHAR)
      if (!id) continue

      wordsById[id] = {
        id,
        name,
        piyin,
        description,
      }

      wordsByCategory[file].push(id)
    }
  }

  const content = `import { PartialData } from 'types'

  const partialData: PartialData = {
    wordsById: ${JSON.stringify(wordsById, null, 2)},
    categoriesById: ${JSON.stringify(categoriesById, null, 2)},
    wordsByCategory: ${JSON.stringify(wordsByCategory, null, 2)}
  }
  
  export default partialData
  `
  fs.writeFile(DATA_PATH, content, error => console.log(error))
}

parse()
