export function parse(
  text: string,
  values: any,
  startDelimiter = "{",
  endDelimiter = "}"
): string {
  let finalString = "";
  let i = 0;

  if (!text) return "";

  while (i < text.length) {
    if (text[i] === startDelimiter) {
      let endPoint = i + 1;
      while (text[endPoint] !== endDelimiter && endPoint < text.length) {
        endPoint++;
      }
      if (text[endPoint] === endDelimiter) {
        const keys = text.slice(i + 1, endPoint).split(".");
        let localValues = values;
        for (const key of keys) {
          localValues = localValues[key];
          if (localValues === undefined) {
            console.warn(`Key not found: ${key}`);
            break;
          }
        }
        finalString +=
          localValues !== undefined
            ? localValues
            : `${startDelimiter}${keys.join(".")}${endDelimiter}`;
        i = endPoint + 1;
      } else {
        finalString += text[i];
        i++;
      }
    } else {
      finalString += text[i];
      i++;
    }
  }

  return finalString;
}
