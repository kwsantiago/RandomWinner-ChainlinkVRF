const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider);
const { eth } = web3;
const id = x => x;
// Set up contract instance
const abi = [
	{
		"inputs": [],
		"name": "createRandomWinner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
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

const factoryAddress = "0xb277B2937Ad2c77548DdC3101E6f255DB3cd829a";
const factoryContract = new eth.Contract(abi, factoryAddress);

const tx = {
  from: null,
  to: factoryAddress,
  // gas limit for createRandomWinner
  data: factoryContract.methods.createRandomWinner().encodeABI()
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
