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
        if (window.ethereum) {
          const account = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        setState({ provider, signer, contract });
      } catch (error) {}
    };

    connectWallet();
  }, []);
  console.log("This is the State variable:", state);

  return <div className="App"></div>;
}

export default App;
