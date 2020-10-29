import React, { useEffect, useState } from "react";
import { ethEnabled } from "../../utils/web3";

const useWeb3 = () => {
  const [account, setAccount] = useState("");
  const [web3, setWeb3] = useState({});

  useEffect(() => {
    ethEnabled();
  }, []);

  return { web3, account };
};

export default useWeb3;
