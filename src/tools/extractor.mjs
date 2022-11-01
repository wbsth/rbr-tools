import { findSetupIndex } from "./misc.mjs";

export async function extractSetup(file) {
  let extractMessage = "";
  let wasFailed = false;
  let setupArray = [];

  const byteBuffer = await file.arrayBuffer();
  const fileExtension = file.name.split(".").slice(-1)[0];

  if (fileExtension != "rpl") {
    extractMessage = "Failed. Only .rpl files are supported.";
    wasFailed = true;
  } else {
    const byteArray = new Uint8Array(byteBuffer);
    const setupIndexes = findSetupIndex(byteArray);

    if (setupIndexes.start == 0 || setupIndexes.end == 0) {
      extractMessage = "Failed. No setup found in this replay.";
      wasFailed = true;
    } else {
      setupArray = byteArray.slice(setupIndexes.start, setupIndexes.end);
      extractMessage = "Success. Setup was extracted.";
    }
  }

  return {
    data: setupArray,
    message: extractMessage,
    failed: wasFailed,
  };
}
