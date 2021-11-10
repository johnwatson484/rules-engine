const sfiEligibleRule = {
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
}

module.exports = sfiEligibleRule
