import React, { useState } from "react";
import { newRandomWinnerContract, newWinner } from "./smartContract.js"
import { EthAddress, Box, Button } from "rimble-ui";

const Result = ({ token }) => (
    <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    }}>
        { token }
    </div>
);

const RandomWinner = () => {
    const [contract, setContract] = useState([]);
    const [addressList, setAddressList] = useState([]);
    const [winner, setWinner] = useState([]);

    const handleChange = (event) => {
        setAddressList(event.target.value.split(/(\s+)/).filter( function(e) { return e.trim().length > 0;}));
        console.log(addressList);
    }

    const genNewContract = async function genContract() {
        const contract = await newRandomWinnerContract(addressList);
        setContract(contract);
    };

    const getNewWinner = async function genWinner() {
        const winner = await newWinner(contract);
        setWinner(winner);
    };

    return (
      <Box>
        <form>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        }}>
            <textarea rows="10" cols="50" placeholder="0x4eaC9A8c7a6c3a869CDBff4E06cb552148749206 0x3808C441402D0418C52237B697bBC5D18c84839A 0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa 0x0cb510E2F16C36ce039Ee3164330D5F00ECf9eAC 0x6a717a5c747c091AFC5958891c2cd452c7A5beD2 0x6da74A271C51ac4B7B5A81a30059B38D5481FF73 0x033F6B3147eBa5ab0913409D46aC3082FCDb5cF8 0x9C65C5A69e69C67E8e340e893CfCa9A0844d4800 0x0cb510E2F16C36ce039Ee3164330D5F00ECf9eAC" onChange={handleChange}></textarea>
        </div>
        </form>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        }}>
        <Button mt={3} mb={3} onClick={genNewContract}>
            Create New Contract
        </Button>
        </div>
        <EthAddress address={contract} />
        <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        }}>
        <Button mt={3} mb={3} onClick={getNewWinner}>
            Get New Winner
        </Button>
        </div>
        <EthAddress address={winner} />
      </Box>
    );
};


export default RandomWinner;
