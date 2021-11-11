const { runEligibilityRules } = require('../rules/eligibility')

function processEligibilityMessage (message) {
  return runEligibilityRules(message)
}

module.exports = processEligibilityMessage
