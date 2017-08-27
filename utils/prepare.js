const fs = require('fs-extra')
const path = require('path')

// clean de dist folder
fs.emptyDirSync(path.join(__dirname, '../build'))

require('./generate_manifest')
