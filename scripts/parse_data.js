const fs = require('fs')

const LINE_SPLIT_CHAR = '|'
const SOURCE_DATA_FOLDER = './source_data'
const DATA_FOLDER = './src/data'

const files = fs.readdirSync(SOURCE_DATA_FOLDER)

files.forEach(file => {
  const filePath = `${SOURCE_DATA_FOLDER}/${file}`

  fs.readFile(filePath, 'utf8', (err, contents) => {
    const lines = contents.split('\n')

    const words = lines.map(line => {
      const [id, name, piyin, description] = line.split(LINE_SPLIT_CHAR)

      return {
        id,
        name,
        piyin,
        description,
      }
    })

    const content = `import { Word } from 'types'

    const ${file}: Word[] = ${JSON.stringify(words, null, 2)}
    
    export default ${file}
    `

    fs.writeFile(`${DATA_FOLDER}/${file}.ts`, content, error =>
      console.log(error)
    )
  })
})
