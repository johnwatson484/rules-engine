const { Engine } = require('json-rules-engine')
const { getBpsEntitlements, getBpsEligibleLandInHectares } = require('../bps')
const { getOrganisations } = require('../organisations')

async function runRules (facts) {
  const organisations = getOrganisations(facts.crn)

  for (const organisation of organisations) {
    await runRule(organisation)
  }
}

async function runRule (organisation) {
  const engine = new Engine()

  engine.addFact('bpsEntitlements', (params, almanac) => {
    return getBpsEntitlements(organisation.sbi)
  })

  engine.addFact('bpsEligibleHectares', (params, almanac) => {
    return getBpsEligibleLandInHectares(organisation.sbi)
  })

  engine.addRule({
    name: 'SFI Eligibility',
    conditions: {
      all: [{
        fact: 'bpsEntitlements',
        operator: 'greaterThanInclusive',
        value: 5
      }, {
        fact: 'bpsEligibleHectares',
        operator: 'greaterThanInclusive',
        value: 5
      }]
    },
    event: {
      type: 'Eligible for SFI'
    },
    onSuccess: function (event, almanac) {
      almanac.addRuntimeFact('sfiEligible', true)
      console.log('Pass')
    },
    onFailure: function (event, almanac) {
      almanac.addRuntimeFact('sfiEligible', false)
      console.log('Fail')
    }
  })

  return engine.run(organisation)
}

module.exports = runRules
