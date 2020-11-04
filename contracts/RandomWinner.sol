// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "https://github.com/smartcontractkit/chainlink/blob/develop/evm-contracts/src/v0.6/VRFConsumerBase.sol";

contract RandomWinnerFactory {
    using SafeMath for uint;
    
    IERC20 linkToken;
    RandomWinner randomWinner;
    address public randomWinnerAddress;
    address[] winners;
    
    constructor() public {
        linkToken = IERC20(0x01BE23585060835E02B77ef475b0Cc51aA1e0709);
    }
    
    function createRandomWinner(address[] calldata _addresses) external {
        uint _amount = 0.3 * 10 ** 18; // 0.3 LINK
        uint blockValue = uint256(blockhash(block.number.sub(1)));
        randomWinner = new RandomWinner();
        linkToken.transfer(address(randomWinner), _amount);
        randomWinner.getRandomNumber(blockValue);
        randomWinner.updateAddressList(_addresses);
        randomWinnerAddress = address(randomWinner);
    }
    
    function selectWinners(uint256 count) external {
        randomWinner.selectWinners(count);
        winners = randomWinner.getWinners();
    }
    
    function getWinners() public view returns (address[] memory) {
        return winners;
    }
}

contract RandomWinner is Ownable, VRFConsumerBase {

    event WinnerSelected(uint256 timestamp, address winner);

    address[] addressList;
    uint256 public addressCount;
    
    address[] winners;
    mapping(address => bool) winnersMapping;
    uint256 public winnerCount;
    
    bool winnersSelected = false;

    bytes32 internal keyHash;
    uint256 internal randomFee;
    
    uint256 public randomResult;
    uint256 public previousWinnerSeed;
    
    
    /**
     * Constructor inherits VRFConsumerBase
     * 
     * Network: Rinkeby
     * Chainlink VRF Coordinator address: 0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B
     * LINK token address:                0x01BE23585060835E02B77ef475b0Cc51aA1e0709
     * Key Hash: 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311
     */
    constructor() 
        VRFConsumerBase(
            0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B, // VRF Coordinator
            0x01BE23585060835E02B77ef475b0Cc51aA1e0709  // LINK Token
        ) public
    {
        keyHash = 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311;
        randomFee = 0.1 * 10 ** 18; // 0.1 LINK
    }
    
    
    /** 
     * Requests randomness from a user-provided seed
     */
    function getRandomNumber(uint256 userProvidedSeed) external onlyOwner returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) > randomFee, "Not enough LINK - fill contract with faucet");
        return requestRandomness(keyHash, randomFee, userProvidedSeed);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomResult = randomness;
    }
    
    function updateAddressList(address[] memory _addresses) public onlyOwner {
        require(!winnersSelected);
        for (uint256 i = 0; i < _addresses.length; i++) {
    		addressList.push(_addresses[i]);
    		addressCount++;
        }
    }
    
    function selectWinners(uint256 count) public onlyOwner {
        require(randomResult != 0);
        require((count + winnerCount) < addressCount);

        if (previousWinnerSeed == 0) {
            previousWinnerSeed = randomResult;
        }
        
        for (uint256 i = 0; i < count; i++) {
            
            uint256 winnerSeed;
            uint256 winnerIndex;
            address winner;
            
            bool winnerSelected = false;
            uint256 nonce = 0;
            do {
                winnerSeed = uint256(keccak256(abi.encodePacked(previousWinnerSeed, i, nonce));
                winnerIndex =  winnerSeed % addressCount;
                winner = addressList[winnerIndex];
                nonce++;
                
                winnerSelected = !winnersMapping[winner];
            } while (!winnerSelected);
            
            winners.push(winner);
            winnersMapping[winner] = true;
            previousWinnerSeed = winnerSeed;

            emit WinnerSelected(block.timestamp, winner);

            winnerCount++;
        }
        
        winnersSelected = true;
    }
    
    function getAddressList() public view returns (address[] memory) {
        return addressList;
    }
    
    function getWinners() public view returns (address[] memory) {
        return winners;
    }
    
    function isWinner(address _address) public view returns (bool) {
        return winnersMapping[_address];
    }
}
