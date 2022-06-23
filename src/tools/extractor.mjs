import { saveAs } from 'file-saver';

export async function extractSetup(file){
    let extractMessage = '';
    let wasFailed = false;
    let setupArray = []

    const byteBuffer = await file.arrayBuffer();
    const fileExtension = file.name.split('.')[1]

    if(fileExtension != 'rpl'){
        extractMessage = 'Failed. Only .rpl files are supported.'
        wasFailed = true;
    }
    else{

        const byteArray = new Uint8Array(byteBuffer);
        const setupIndexes = findSetupIndex(byteArray);

        if(setupIndexes.start == 0 || setupIndexes.end == 0){
            extractMessage = 'Failed. No setup found in this replay.'
            wasFailed = true;
        }
        else{
            setupArray = byteArray.slice(setupIndexes.start, setupIndexes.end);
            extractMessage = 'Success. Setup was extracted.'
        }
    }
    
    return {
        data: setupArray, 
        message: extractMessage,
        failed: wasFailed
    }
}

function findSetupIndex(byteArray){
    const startBytes = [0x28, 0x28, 0x22];
    const endBytes = [0x29, 0x0A, 0x20, 0x29, 0x29];
    const maxSearchRange = byteArray.byteLength;
    let currentStart = [];
    let currentEnd = [];

    let startIndex = 0;
    let endIndex = 0;

    for (let index = 0; index < maxSearchRange; index++) {
        for (let i = 0; i < 3; i++)
        {
            currentStart[i] = byteArray[index + i];
        }

        if (isArrayEqual(startBytes, currentStart))
        {
            startIndex = index;
            break;
        }
    }

    for (let index = startIndex; index < maxSearchRange; index++)
    {
        for (let i = 0; i < 5; i++)
        {
            currentEnd[i] = byteArray[index + i];
        }

        if (isArrayEqual(endBytes, currentEnd))
        {
            endIndex = index + 5;
            break;
        }
    }

    return {
        start: startIndex,
        end: endIndex
    }

}

function isArrayEqual(a, b)
  {    
    // If length is not equal
    if(a.length!=b.length){
        return "False";
    }
    else{
    // Comparing each element of array
        for(var i=0;i<a.length;i++){
            if(a[i]!=b[i]){
                return false;
            }
        }
    return true;
    }
  }