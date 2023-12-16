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
          console.log("account:", account);

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
          alert("Please install metamask wallet");
        }
      } catch (error) {
        console.log(error);
      }
    };

    connectWallet();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Tea Dapp</h1>
      </header>
      <p>Connected to: {account[0]}</p>
      <main className="App-main">
        <section className="App-section">
          <Buy state={state} />
        </section>
        <section className="App-section">
          <Memos state={state} />
        </section>
      </main>
      <footer className="App-footer">
        <p>© 2023 Chai Purchase App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
