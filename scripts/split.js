const fs = require('fs')

const SOURCE_DATA_FOLDER = './source_data'
const n = '7'

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

const split = async () => {
  const contents = (await readFile(`${SOURCE_DATA_FOLDER}/tocfl${n}`)).split(
    '\n'
  )
  let i = 0
  let j = contents.length > 99 ? 99 : contents.length - 1
  let file = 1
  let merged = `${n}.${file}\n`

  while (i < contents.length) {
    merged += contents[i] + (i === j ? '' : '\n')

    if (i === j) {
      console.log(`${SOURCE_DATA_FOLDER}/T${n}-${file}`)
      fs.writeFile(`${SOURCE_DATA_FOLDER}/T${n}-${file}`, merged, error =>
        console.log(error)
      )
      j = contents.length > j + 100 ? j + 100 : contents.length - 1
      file++
      merged = `${n}.${file}\n`
    }

    i++
  }
}

split()
