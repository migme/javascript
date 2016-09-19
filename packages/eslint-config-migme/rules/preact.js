const preactRules = Object.assign({}, require('./react'))

preactRules['settings'] = {
  "react": {
    "createClass": "h", // Regex for Component Factory to use, default to "createClass"
    "pragma": "preact",  // Pragma to use, default to "React"
    "version": "15.0" // React version, default to the latest React stable release
  }
}

module.exports = preactRules
