import React from "react";
import useWeb3 from "./assets/shared/hooks/useWeb3";
import RandomWinner from "./assets/utils/frontend";

const App = (props) => {
  const { account, web3 } = useWeb3();
  return (
      <RandomWinner />
  );
};

export default App;
