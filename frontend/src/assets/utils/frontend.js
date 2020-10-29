import React, { useState } from "react";
import { generateNewContract } from "./randomWinner.js";

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
    const [result, setResult] = useState([]);

    const genNewContract = async function genContract() {
        const result = await generateNewContract();
        console.log(result);
        setResult(result);
    };

    return (
    <div>
        <h1 style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            }}>Random Winner with Chainlink VRF</h1>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            }}>
        <button
            width={[1, "auto", "auto"]}
            mt={2}
            mb={2}
            onClick={genNewContract}
        >
        Select Winners
      </button>
      </div>
      <Result token={result}/>
    </div>
    );
};


export default RandomWinner;
