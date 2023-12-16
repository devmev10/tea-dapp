import "./App.css";
import styled from "styled-components";

import abi from "./contract/Chai.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";

const HeaderWrapper = styled.header`
  background-color: #007bff;
  color: white;
  padding: 20px;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Heading = styled.h1`
  margin: 0;
  text-align: center;
`;

const WalletStatus = styled.p`
  margin: 0;

  @media screen and (max-width: 600px) {
    text-align: center;
  }
`;

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState(null);

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
      <HeaderWrapper>
        <HeaderContent>
          <Heading>Welcome to Tea Dapp</Heading>
          <WalletStatus>
            {account !== null
              ? `Connected to: ${account[0]}`
              : "Please connect your wallet"}
          </WalletStatus>
        </HeaderContent>
      </HeaderWrapper>
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
