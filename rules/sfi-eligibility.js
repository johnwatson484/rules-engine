const { Engine } = require('json-rules-engine')
const { getBpsEntitlements, getBpsEligibleLandInHectares } = require('../bps')

function getRules (facts) {
  const engine = new Engine()

  engine.addFact('bpsEntitlements', async (params, almanac) => {
    return getBpsEntitlements(facts.sbi)
  })

  engine.addFact('bpsEligibleHectares', async (params, almanac) => {
    return getBpsEligibleLandInHectares(facts.sbi)
  })

  engine.addRule({
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
    onSuccess: async function (event, almanac) {
      almanac.addRuntimeFact('sfiEligible', true)
      console.log('Pass')
    },
    onFailure: function (event, almanac) {
      almanac.addRuntimeFact('sfiEligible', false)
      console.log('Fail')
    }
  })

  return engine
}

module.exports = getRules
