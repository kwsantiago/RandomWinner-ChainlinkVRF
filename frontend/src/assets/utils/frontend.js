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

    const genNewContract = async function genContract() {
        const contract = await newRandomWinnerContract();
        setContract(contract);
    };

    const getNewWinner = async function genWinner() {
        const winner = await newWinner(contract);
        setWinner(winner);
    };

    return (
      <Box mt={3}>
        <form>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        }}>
            <textarea rows="10" cols="50"></textarea>
        </div>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        }}>
        <Button mt={3} mb={3} onClick={genNewContract}>
            Create New Contract
        </Button>
        </div>
        </form>
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
