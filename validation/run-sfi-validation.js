const runSFIValidationRules = require('./sfi')

async function runSFIValidation (facts) {
  const warnings = []
  const result = await runSFIValidationRules(facts)
  result.failureEvents.forEach((failure) => warnings.push(failure))
  return warnings
}

module.exports = runSFIValidation
