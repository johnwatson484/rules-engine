const sfiEligibility = require('./sfi-eligibility')

function getRules (rules, facts) {
  if (rules === 'sfi-eligibility') {
    return sfiEligibility(facts)
  }
  throw new Error('Unknown rule')
}

module.exports = {
  getRules
}
