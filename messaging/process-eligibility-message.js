const { runEligibilityRules } = require('../eligibility')

function processEligibilityMessage (message) {
  return runEligibilityRules(message)
}

module.exports = processEligibilityMessage