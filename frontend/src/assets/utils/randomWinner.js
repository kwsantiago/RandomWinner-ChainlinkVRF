import { newRandomWinnerContract } from "./smartContract"

async function generateNewContract(){
    var randomWinnerContract = await newRandomWinnerContract();
    return randomWinnerContract;
}

export { generateNewContract };
