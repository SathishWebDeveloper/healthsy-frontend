export const filteredData = (arr = []) => {
  const uniqueEntries = new Set();
  return arr.filter(entry => {
    const entryKey = JSON.stringify([entry.value, entry.type]);
    const isUnique = !uniqueEntries.has(entryKey);
    if (isUnique) {
      uniqueEntries.add(entryKey);
    }
    return isUnique;
  });

} 