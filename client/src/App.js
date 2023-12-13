import "./App.css";

import abi from "./contract/Chai.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x4a5B09EF55Fcef35DB8359ea544EeEe34F45424F";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });
        }
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        setState({ provider, signer, contract });
      } catch (error) {}
    };
  }, []);

  return <div className="App"></div>;
}

export default App;
