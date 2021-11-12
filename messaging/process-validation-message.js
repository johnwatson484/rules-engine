const { runValidation } = require('../validation')

function processValidationMessage (message) {
  return runValidation(message)
}

module.exports = processValidationMessage
