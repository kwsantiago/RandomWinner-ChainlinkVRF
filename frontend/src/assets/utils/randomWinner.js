import { newRandomWinnerContract } from "./smartContracts/genNewContract.js"

async function generateNewContract(){
    var randomWinnerContract = await newRandomWinnerContract();
    return randomWinnerContract;
}

export { generateNewContract };
