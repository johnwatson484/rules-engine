const sfiEligibility = require('./sfi-eligibility')

function runRules (ruleSetName, facts) {
  if (ruleSetName === 'sfi-eligibility') {
    return sfiEligibility(facts)
  }
  throw new Error('Unknown rule')
}

module.exports = {
  runRules
}
