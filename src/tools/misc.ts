export interface FileOperationResult {
  data: Uint8Array;
  message: string;
  failed: boolean;
}

export interface findSetupIndexResult {
  start: number;
  end: number;
}

export function findSetupIndex(byteArray: Uint8Array): findSetupIndexResult {
  const startBytes = [0x28, 0x28, 0x22];
  const endBytes = [0x29, 0x0a, 0x20, 0x29, 0x29];
  const maxSearchRange = byteArray.byteLength;
  const currentStart: number[] = [];
  const currentEnd: number[] = [];

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

function isArrayEqual<T>(a: Array<T>, b: Array<T>): boolean {
  // If length is not equal
  if (a.length != b.length) {
    return false;
  } else {
    // Comparing each element of array
    for (let i = 0; i < a.length; i++) {
      if (a[i] != b[i]) {
        return false;
      }
    }
    return true;
  }
}

export function isNumber(char: string): boolean {
  if (char.trim() === "") {
    return false;
  }
  const converted = Number(char);
  return !isNaN(converted);
}

export function isCharacterALetter(char: string): boolean {
  return char.toLowerCase() != char.toUpperCase();
}
