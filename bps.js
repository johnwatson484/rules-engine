async function getBpsEntitlements (sbi) {
  return sbi === 123456789 ? 5 : 4
}

async function getBpsEligibleLandInHectares (sbi) {
  return 5
}

module.exports = {
  getBpsEntitlements,
  getBpsEligibleLandInHectares
}
