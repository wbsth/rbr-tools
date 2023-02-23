export function findSetupIndex(byteArray) {
  const startBytes = [0x28, 0x28, 0x22];
  const endBytes = [0x29, 0x0a, 0x20, 0x29, 0x29];
  const maxSearchRange = byteArray.byteLength;
  let currentStart = [];
  let currentEnd = [];

  let startIndex = 0;
  let endIndex = 0;

  for (let index = 0; index < maxSearchRange; index++) {
    for (let i = 0; i < 3; i++) {
      currentStart[i] = byteArray[index + i];
    }

    if (isArrayEqual(startBytes, currentStart)) {
      startIndex = index;
      break;
    }
  }

  for (let index = startIndex; index < maxSearchRange; index++) {
    for (let i = 0; i < 5; i++) {
      currentEnd[i] = byteArray[index + i];
    }

    if (isArrayEqual(endBytes, currentEnd)) {
      endIndex = index + 4;
      break;
    }
  }

  return {
    start: startIndex,
    end: endIndex,
  };
}

function isArrayEqual(a, b) {
  // If length is not equal
  if (a.length != b.length) {
    return "False";
  } else {
    // Comparing each element of array
    for (var i = 0; i < a.length; i++) {
      if (a[i] != b[i]) {
        return false;
      }
    }
    return true;
  }
}

export function isNumber(char) {
  if (typeof char !== "string") {
    return false;
  }

  if (char.trim() === "") {
    return false;
  }

  return !isNaN(char);
}

export function isCharacterALetter(char) {
  return char.toLowerCase() != char.toUpperCase();
}
