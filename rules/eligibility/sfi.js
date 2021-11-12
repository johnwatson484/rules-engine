const { Engine } = require('json-rules-engine')
const { getBpsEntitlements, getBpsEligibleLandInHectares } = require('../../data/bps')
const { getOrganisations } = require('../../data/organisations')

async function getEligibleOrganisations (facts) {
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

async function runSFIEligibilityRules (organisation) {
  const engine = new Engine()

  engine.addFact('bpsEntitlements', (params, almanac) => {
    return getBpsEntitlements(organisation.sbi)
  })

  engine.addFact('bpsEligibleHectares', (params, almanac) => {
    return getBpsEligibleLandInHectares(organisation.sbi)
  })

  engine.addRule({
    name: 'BPS entitlements',
    conditions: {
      all: [{
        name: 'BPS entitlements',
        fact: 'bpsEntitlements',
        operator: 'greaterThanInclusive',
        value: 5
      }]
    },
    event: {
      type: 'bps-entitlements',
      params: {
        message: 'Has sufficient BPS entitlements'
      }
    }
  })

  engine.addRule({
    name: 'BPS eligible land',
    conditions: {
      all: [{
        name: 'BPS eligible hectares',
        fact: 'bpsEligibleHectares',
        operator: 'greaterThanInclusive',
        value: 5
      }]
    },
    event: {
      type: 'bps-land',
      params: {
        message: 'Has sufficient eligible land'
      }
    }
  })

  engine.on('success', async (event, almanac, ruleResult) => {
    almanac.addRuntimeFact('sfiEligible', true)
    const sbi = await almanac.factValue('sbi')
    render(`SBI ${sbi} passed SFI eligibility rule: ${event.params.message}`, ruleResult)
  })

  engine.on('failure', async (event, almanac, ruleResult) => {
    almanac.addRuntimeFact('sfiEligible', false)
    const sbi = await almanac.factValue('sbi')
    render(`SBI ${sbi} failed SFI eligibility rule: ${ruleResult.name} - `, ruleResult)
  })

  return engine.run(organisation)
}

function render (message, ruleResult) {
  // if rule succeeded, render success message
  if (ruleResult.result) {
    return console.log(`${message}`)
  }
  // if rule failed, iterate over each failed condition to determine why
  const detail = ruleResult.conditions.all.filter(condition => !condition.result)
    .map(condition => {
      switch (condition.operator) {
        case 'equal':
          return `was not an ${condition.fact}`
        case 'greaterThanInclusive':
          return `${condition.name} of ${condition.factResult} was too low`
        default:
          return ''
      }
    }).join(' and ')
  console.log(`${message} ${detail}`)
}

module.exports = getEligibleOrganisations
