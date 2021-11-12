(async function () {
  const processEligibilityMessage = require('./messaging/process-eligibility-message')

  const message = {
    scheme: 'sfi',
    crn: 1234567890
  }

  const result = await processEligibilityMessage(message)
  console.log(result)
}())
