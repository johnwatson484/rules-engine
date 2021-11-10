(async function () {
  const { getRules } = require('./rules')

  const message = {
    rule: 'sfi-eligibility'
  }

  const facts = {
    sbi: 123456789,
    organisationId: 1234567,
    callerId: 1234567
  }

  const rules = getRules(message.rule, facts)

  await rules.run(facts)
}())
