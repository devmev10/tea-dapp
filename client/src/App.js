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

  const [isSepoliaNetwork, setIsSepoliaNetwork] = useState(false);

  const [account, setAccount] = useState(null);
  const [metaMaskInstalled, setMetaMaskInstalled] = useState(true);

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x4a5B09EF55Fcef35DB8359ea544EeEe34F45424F";
      const contractABI = abi.abi;
      try {
        if (window.ethereum) {
          // Check if selected metamask network is Sepolia
          const SEPOLIA_CHAIN_ID = 11155111;
          const chainId = await window.ethereum.request({
            method: "eth_chainId",
          });
          setIsSepoliaNetwork(parseInt(chainId, 16) === SEPOLIA_CHAIN_ID);

          if (parseInt(chainId, 16) !== SEPOLIA_CHAIN_ID) {
            try {
              await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: SEPOLIA_CHAIN_ID }], // Switch to Sepolia network
              });
              window.location.reload();
            } catch (error) {
              console.error("Failed to switch network:", error);
            }
          }
          // end of sepolia network check logic

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
          setMetaMaskInstalled(false); // Set MetaMask installed to false
          console.log("MetaMask not installed.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    connectWallet();
  }, []);

  return (
    <div className="App">
      {!metaMaskInstalled && (
        <div>
          <h1>MetaMask Required</h1>
          <p>
            To use this DApp, please install MetaMask.
            <br />
            <a
              href="https://metamask.io/download.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download MetaMask
            </a>
          </p>
        </div>
      )}
      {metaMaskInstalled && !isSepoliaNetwork && (
        <h1>Please Switch to SEPOLIA Test Network</h1>
      )}
      {metaMaskInstalled && isSepoliaNetwork && (
        <div>
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
            <p>© 2023 Tea Dapp. All rights reserved.</p>
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;
