const { getEligibleOrganisations } = require('../eligibility')

function processEligibilityMessage (message) {
  return getEligibleOrganisations(message)
}

module.exports = processEligibilityMessage
