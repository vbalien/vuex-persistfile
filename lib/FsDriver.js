const fs = require('fs')

class FsDriver {
  write(path, data) {
    try {
      if (path === null) return
      fs.writeFileSync(path, data, 'utf8')
    } catch (e) {
      console.log(e)
    }
  }

  read(path) {
    try {
      if (path === null) return '{}'
      return fs.readFileSync(path, 'utf8')
    } catch (e) {
      console.log(e)
      return '{}'
    }
  }
}

module.exports = FsDriver
