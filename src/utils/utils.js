export function capitalizeFirst([firstLetter, ...remaining]) {
  // convert the first letter to uppercase and return as string
  return [firstLetter.toUpperCase(), ...remaining].join("");
}

export function getUniqueObjects(friendsList, requestsList) {
  const newArray = requestsList.filter(
    ({ senderId }) => !friendsList.some((e) => e.id === senderId)
  );

  return newArray;
}
