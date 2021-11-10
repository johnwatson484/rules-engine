(async function () {
  const { runRules } = require('./rules')
  const ruleSetName = 'sfi-eligibility'
  const facts = {
    crn: 1234567890
  }
  await runRules(ruleSetName, facts)
}())
