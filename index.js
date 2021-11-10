(async function () {
  const { Engine } = require('json-rules-engine')
  const { getRule } = require('./rules')
  const engine = new Engine()

  const message = {
    rule: 'sfi-eligibility'
  }

  const rule = getRule(message.rule)

  engine.addRule(rule)

  const facts = {
    bpsEntitlements: 6,
    bpsEligibleHectares: 5
  }

  await engine.run(facts)
}())
