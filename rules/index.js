const sfiEligibility = require('./sfi-eligibility')

function getRule (ruleName) {
  if (ruleName === 'sfi-eligibility') {
    return sfiEligibility
  }
  throw new Error('Unknown rule')
}

module.exports = {
  getRule
}
