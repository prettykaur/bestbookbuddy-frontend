export function capitalizeFirst([firstLetter, ...remaining]) {
  // convert the first letter to uppercase and return as string
  return [firstLetter.toUpperCase(), ...remaining].join("");
}
