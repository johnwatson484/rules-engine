(async function () {
  const processEligibilityMessage = require('./messaging/process-eligibility-message')

  const message = {
    scheme: 'sfi',
    crn: 1234567890,
    callerId: 1234567
  }

  const result = await processEligibilityMessage(message)
  console.log(result)
}())
