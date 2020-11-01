const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider);
const { eth } = web3;
const id = x => x;
// Set up contract instance
const abi = [
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "_addresses",
				"type": "address[]"
			}
		],
		"name": "createRandomWinner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "randomWinnerAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const factoryAddress = "0x2378325eB989DAf28D61E0dABd3c52325b20ACe0";
const factoryContract = new eth.Contract(abi, factoryAddress);

const testAddressList = ["0x6a717a5c747c091AFC5958891c2cd452c7A5beD2","0x6da74A271C51ac4B7B5A81a30059B38D5481FF73","0x033F6B3147eBa5ab0913409D46aC3082FCDb5cF8","0x9C65C5A69e69C67E8e340e893CfCa9A0844d4800","0x0cb510E2F16C36ce039Ee3164330D5F00ECf9eAC","0xe63Cd3474b504435c9F44f8b8135deb6459b32C7"];

const tx = {
  from: null,
  to: factoryAddress,
  // gas limit for createRandomWinner
  data: factoryContract.methods.createRandomWinner(testAddressList).encodeABI()
};

async function generateNewContract(){
    await window.web3.eth.getAccounts().then(async e => {
        if(!e[0]){
            window.ethereum && window.ethereum.enable();
            return;
        }
        tx.from = e[0];
        var result = await window.web3.eth.sendTransaction(tx);
        return result;
    })
}

const newRandomWinnerContract = async () => {
    await generateNewContract();
    return await factoryContract.methods.randomWinnerAddress().call();
}

export { newRandomWinnerContract };
