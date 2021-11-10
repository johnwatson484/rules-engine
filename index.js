(async function () {
  const { runRules } = require('./rules')

  const ruleSetName = 'sfi-eligibility'

  const organisations = [{
    sbi: 123456789,
    organisationId: 1234567,
    callerId: 1234567
  }, {
    sbi: 123456781,
    organisationId: 1234561,
    callerId: 1234561
  }]

  for (const organisation of organisations) {
    await runRules(ruleSetName, organisation)
  }
}())
