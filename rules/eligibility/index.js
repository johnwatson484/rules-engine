const runSFIEligibilityRules = require('./sfi')

async function runEligibilityRules (facts) {
  if (facts.scheme === 'sfi') {
    return runSFIEligibilityRules(facts)
  }
  throw new Error(`Unknown scheme: ${facts.scheme}`)
}

module.exports = {
  runEligibilityRules
}
