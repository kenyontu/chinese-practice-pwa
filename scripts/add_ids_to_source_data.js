/**
 * Rewrites all files in the source_data folder, adding ids to words that
 * don't have it yet
 */

const fs = require('fs')
const shortid = require('shortid')

const SOURCE_DATA_FOLDER = './source_data'
const LINE_SPLIT_CHAR = '|'

const files = fs.readdirSync(SOURCE_DATA_FOLDER)

files.forEach(file => {
  const filePath = `${SOURCE_DATA_FOLDER}/${file}`

  fs.readFile(filePath, 'utf8', (err, contents) => {
    const lines = contents.split('\n')

    const newLines = lines.map(line => {
      const columns = line.split(LINE_SPLIT_CHAR)

      if (columns.length === 3) {
        return [shortid.generate(), ...columns].join('|')
      }

      return line
    })

    fs.writeFile(filePath, newLines.join('\n'), error => console.log(error))
  })
})
