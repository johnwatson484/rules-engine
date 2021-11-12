const { getOrganisations } = require('../data/organisations')
const runSFIEligibilityRules = require('./sfi')

async function getSFIEligibleOrganisations (facts) {
  const eligibleOrganisations = []
  const organisations = getOrganisations(facts.crn, ['Amend'])
  for (const organisation of organisations) {
    const result = await runSFIEligibilityRules(organisation)
    if (!result.failureEvents.length) {
      eligibleOrganisations.push(organisation)
    }
  }
  return eligibleOrganisations
}

module.exports = getSFIEligibleOrganisations
