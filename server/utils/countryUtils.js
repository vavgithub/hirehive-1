import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { countries } from 'countries-list'

export function getCountryNameFromPhoneNumber(phoneNumber) {
  try {
    const parsed = parsePhoneNumberFromString(phoneNumber)

    if (!parsed || !parsed.country) {
      return 'Invalid phone number or unknown country'
    }

    const countryCode = parsed.country // e.g., 'US'
    const countryName = countries[countryCode]?.name

    return countryName || 'Country name not found'
  } catch (error) {
    return `Error: ${error.message}`
  }
}