const runSFIEligibility = require('./sfi')

function runEligibilityRules (facts) {
  if (facts.scheme === 'sfi') {
    return runSFIEligibility(facts)
  }
  throw new Error(`Unknown scheme: ${facts.scheme}`)
}

module.exports = {
  runEligibilityRules
}
