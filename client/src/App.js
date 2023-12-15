import "./App.css";

import abi from "./contract/Chai.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("None");

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x4a5B09EF55Fcef35DB8359ea544EeEe34F45424F";
      const contractABI = abi.abi;
      try {
        if (window.ethereum) {
          const account = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(account);

          // metamask code for reloading
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          // metamask code for reloading
          window.ethereum.on("accountChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );

          setState({ provider, signer, contract });
        } else {
          alert("Please install a wallet like metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };

    connectWallet();
  }, []);
  console.log("This is the State variable:", state);

  return (
    <div className="App">
      <Buy state={state} />
      <p>Connected account - {account}</p>
      <Memos state={state} />
    </div>
  );
}

export default App;
