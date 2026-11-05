export const UNKNOWN_PROFILE_PICTURE_URL_DARK = 'https://d2zc0gy08nitgj.cloudfront.net/uploads/Dark_Profile.png'
export const UNKNOWN_PROFILE_PICTURE_URL_LIGHT = 'https://d2zc0gy08nitgj.cloudfront.net/uploads/Light_Profile.png'

const PROFILE_PLACEHOLDERS = new Set([
  UNKNOWN_PROFILE_PICTURE_URL_DARK,
  UNKNOWN_PROFILE_PICTURE_URL_LIGHT,
])

export function resolveProfilePicture(url) {
  if (!url || PROFILE_PLACEHOLDERS.has(url)) return UNKNOWN_PROFILE_PICTURE_URL_LIGHT
  return url
}