export function tryParseJSON(value: any) {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value; // return original value if JSON parsing fails
    }
  }
  return value;
}