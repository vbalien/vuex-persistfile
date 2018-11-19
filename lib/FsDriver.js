const fs = require('fs')

class FsDriver {
  write(path, data) {
    try {
      fs.writeFileSync(path, data, 'utf8')
    } catch (e) {
      console.log(e)
    }
  }

  read(path) {
    try {
      return fs.readFileSync(path, 'utf8')
    } catch (e) {
      console.log(e)
      return {}
    }
  }
}

module.exports = FsDriver
