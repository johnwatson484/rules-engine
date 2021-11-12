(async function () {
  const processEligibilityMessage = require('./messaging/process-eligibility-message')
  const processValidationMessage = require('./messaging/process-validation-message')

  const message = {
    scheme: 'sfi',
    crn: 1234567890
  }

  await processEligibilityMessage(message)

  const result = await processValidationMessage({ scheme: 'sfi', sbi: 1234567891 })
  console.log(result)
}())
