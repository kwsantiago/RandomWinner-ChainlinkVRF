import React, { useState } from "react";
import { newRandomWinnerContract, newWinner } from "./smartContract.js"
import { Textarea, Box, Button, Heading, Text } from "rimble-ui";

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
    const [winner, setWinner] = useState([]);

    const genNewContract = async function genContract() {
        const contract = await newRandomWinnerContract();
        setContract(contract);
    };

    const getNewWinner = async function genWinner() {
        const winner = await newWinner();
        setWinner(winner);
    };

    return (
      <Box mt={3}>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        }}>
            <Heading>Random Winner with Chainlink VRF</Heading>
        </div>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        }}>
            <label for="addressList">Address List:</label>
            <Textarea placeholder='["address1","address2"]' lineHeight={3}></Textarea>
        </div>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        }}>
        <Button mt={3} onClick={genNewContract}>
            Create New Contract
        </Button>
        </div>
        <Result token={contract}/>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        }}>
        <Button mt={2} onClick={getNewWinner}>
            Get New Winner
        </Button>
        </div>
        <Result token={winner}/>
      </Box>
    );
};


export default RandomWinner;
