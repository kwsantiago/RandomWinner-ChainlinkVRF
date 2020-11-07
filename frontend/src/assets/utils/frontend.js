import React, { useState } from "react";
import { newRandomWinnerContract, newWinner } from "./smartContract.js"
import { Form, EthAddress, Textarea, Box, Button, Heading, Text } from "rimble-ui";

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
        <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        }}>
            <Textarea placeholder='["address1","address2"]' rows={4} />
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
        <EthAddress address={contract} textLabels />
        <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        }}>
        <Button mt={3} mb={3} onClick={getNewWinner}>
            Get New Winner
        </Button>
        </div>
        <EthAddress address={winner} textLabels />
      </Box>
    );
};


export default RandomWinner;
