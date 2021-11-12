const { Engine } = require('json-rules-engine')
const { getBpsEntitlements, getBpsEligibleLandInHectares } = require('../../data/bps')
const { getOrganisations } = require('../../data/organisations')

async function runSFIEligibilityRules (facts) {
  const organisations = getOrganisations(facts.crn, ['Amend'])
  for (const organisation of organisations) {
    runRules(organisation)
  }
}

async function runRules (organisation) {
  const engine = new Engine()

  engine.addFact('bpsEntitlements', (params, almanac) => {
    return getBpsEntitlements(organisation.sbi)
  })

  engine.addFact('bpsEligibleHectares', (params, almanac) => {
    return getBpsEligibleLandInHectares(organisation.sbi)
  })

  engine.addRule({
    name: 'SFI eligible organisations',
    conditions: {
      all: [{
        name: 'BPS Entitlements',
        fact: 'bpsEntitlements',
        operator: 'greaterThanInclusive',
        value: 5
      }, {
        name: 'BPS Eligible Hectares',
        fact: 'bpsEligibleHectares',
        operator: 'greaterThanInclusive',
        value: 5
      }]
    },
    event: {
      type: 'Eligible for SFI'
    },
    onSuccess: async function (event, almanac) {
      almanac.addRuntimeFact('sfiEligible', true)
      const sbi = await almanac.factValue('sbi')
      console.log(`SBI ${sbi} is eligible for SFI`)
    },
    onFailure: async function (event, almanac) {
      almanac.addRuntimeFact('sfiEligible', false)
      const sbi = await almanac.factValue('sbi')
      console.log(`SBI ${sbi} is not eligible for SFI`)
    }
  })

  return engine.run(organisation)
}

module.exports = runSFIEligibilityRules
