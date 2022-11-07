import { findSetupIndex, isCharacterALetter, isNumber } from "./misc.mjs";

export async function replaceSetup(replayFile, setupFile) {
  let errorMessage = "";
  try {
    let wasFailed = false;
    let returnArray = [];

    const replayfileExtension = replayFile.name.split(".").slice(-1)[0];
    const setupFileExtension = setupFile.name.split(".").slice(-1)[0];
    const decoder = new TextDecoder();

    // check for correct file extensions
    if (replayfileExtension != "rpl") {
      throw "Replay load failed. Only .rpl files are supported.";
    }

    if (setupFileExtension != "lsp") {
      throw "Setup load failed. Only .lsp files are supported.";
    }

    if (!wasFailed) {
      // loading replay and setups files into arrays
      const replayFileByteBuffer = await replayFile.arrayBuffer();
      const setupFileByteBuffer = await setupFile.arrayBuffer();

      const replayByteArray = new Uint8Array(replayFileByteBuffer);
      const setupyByteArray = new Uint8Array(setupFileByteBuffer);

      // find setup file byte index (where it starts, where it ends)
      const setupIndexes = findSetupIndex(replayByteArray);

      // prepare strings
      let replayString = decoder.decode(replayByteArray.slice(setupIndexes.start, setupIndexes.end));
      let setupString = decoder.decode(setupyByteArray);

      // extract values from both setups
      let replayIntegers = ExtractIntegers(replayString);
      let setupIntegers = ExtractIntegers(setupString);

      // check if number of extracted values matches
      if (replayIntegers.values.Count != setupIntegers.values.Count){
        throw 'Replay setup and provided setup have different structure'
      }
      
      returnArray = Replace(replayByteArray, replayIntegers, setupIntegers, setupIndexes);

      return {
        data: returnArray,
        message: errorMessage,
        failed: false,
      };
    }

    return {
      data: returnArray,
      message: errorMessage,
      failed: true,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      message: error,
      failed: true,
    };
  }
}

function ExtractIntegers(text) {
  let extractedValuesList = [];
  let indexes = [];
  let tempString = "";
  let indexStart = -1;

  // iterate through provided string
  for (let i = 0; i < text.length; i++) {
    // if character is a digit, or a decimal sign, write it to temporary string
    if (isNumber(text[i]) || text[i] == ".") {
      tempString += text[i];
      if (indexStart == -1) indexStart = i;
    }
    // if not, check if there is any data in temporary string
    else if (tempString.length > 0) {
      // make sure that numerical value is not a part of text
      if (!isCharacterALetter(text[indexStart - 1]) && text[indexStart - 1] != "_") {
        extractedValuesList.push(tempString);
        indexes.push(indexStart);
      }
      tempString = "";
      indexStart = -1;
    }
  }

  return {
    values: extractedValuesList,
    indexes: indexes,
  };
}

function Replace(replayByteArray, replayIntegers, setupIntegers, setupIndexes)
{
    let encoder = new TextEncoder();
    // iterate through values extracted from replay file
    for (let i = 0; i < replayIntegers.values.length; i++)
    {
        // if value should be changed (because it differs from the provided setup value)
        if (replayIntegers.values[i] != setupIntegers.values[i])
        {
            //if values are of the same length, simply copy it
            if (replayIntegers.values[i].length == setupIntegers.values[i].length)
            {
                let temp = encoder.encode(setupIntegers.values[i]);

                for(let ti = 0; ti < temp.length; ti++){
                  replayByteArray[ti + setupIndexes.start + replayIntegers.indexes[i]] = temp[ti];
                }
                //Array.Copy(temp, 0, replayByteArray, setupIndexes.start + replayIntegers.indexes[i], temp.length);
            }
            // if values length is different, some parsing is needed
            else if (setupIntegers.values[i].includes('.') && replayIntegers.values[i].includes('.'))
            {
                let lengthDifference = setupIntegers.values[i].length - replayIntegers.values[i].length;
                let zeroes = setupIntegers.values[i].split('.')[1].length;
                let parsed = parseFloat(setupIntegers.values[i]);
                let formatted = parsed.toFixed(zeroes - lengthDifference);
                let temp = encoder.encode(formatted);

                for(let ti = 0; ti < temp.length; ti++){
                  replayByteArray[ti + setupIndexes.start + replayIntegers.indexes[i]] = temp[ti];
                }
            }
        }

    }
    return replayByteArray;
}
