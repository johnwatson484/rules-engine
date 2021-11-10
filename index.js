(async function () {
  const { Engine } = require('json-rules-engine')
  const engine = new Engine()
  const sfiEligibleRule = require('./sets/sfi-eligibility')

  const facts = {
    bpsEntitlements: 6,
    bpsEligibleHectares: 5
  }

  engine.addRule(sfiEligibleRule)
  const result = await engine.run(facts)
  console.log(result)
}())
