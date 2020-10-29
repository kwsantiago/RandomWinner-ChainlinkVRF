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
	}
]

const factoryAddress = "0xa50134F4d9E31C4081A134088019Fd30176eaFFe";
const factoryContract = new eth.Contract(abi, factoryAddress);

const tx = {
  from: null,
  // Factory Contract
  to: factoryAddress,
  // gas limit for createRandomWinner
  data: factoryContract.methods.createRandomWinner().encodeABI()
};

const newRandomWinnerContract = async () => {
    var allowed = true;
    await window.web3.eth.getAccounts().then(async e => {
        if(!e[0]){
            window.ethereum && window.ethereum.enable();
            allowed = false;
            return;
        }
        tx.from = e[0];
        var result = await window.web3.eth.sendTransaction(tx);
        return result;
    })
    if(!allowed)
        return [];
    var result = await factoryContract.methods.createRandomWinner().call();
    return result;
}

export { newRandomWinnerContract };
