/**
 *
 * @param str
 * @returns formated string
 * @description normalizes input to supported path and file name format.
 * Changes camelCase strings to kebab-case, replaces spaces with dash and keeps underscores.
 */
export function normalizeToKebabOrSnakeCase(str: string) {
  console.log(str)
  const STRING_DASHERIZE_REGEXP = /\s/g
  const STRING_DECAMELIZE_REGEXP = /([a-z\d])([A-Z])/g
  return str
    ?.trim()
    ?.replace(STRING_DECAMELIZE_REGEXP, '$1-$2')
    ?.toLowerCase()
    ?.replace(STRING_DASHERIZE_REGEXP, '-')
}
