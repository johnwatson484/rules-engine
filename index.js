(async function () {
  const { runRules } = require('./rules')
  const { getOrganisations } = require('./organisations')

  const ruleSetName = 'sfi-eligibility'
  const crn = 1234567890

  const organisations = getOrganisations(crn)

  for (const organisation of organisations) {
    await runRules(ruleSetName, organisation)
  }
}())
