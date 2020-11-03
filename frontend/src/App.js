import React from "react";
import useWeb3 from "./assets/shared/hooks/useWeb3";
import RandomWinner from "./assets/utils/frontend";
import Card from "./assets/shared/UI/Card";

const App = (props) => {
  const { account, web3 } = useWeb3();
  return (
      <Card>
          <RandomWinner />
      </Card>
  );
};

export default App;
