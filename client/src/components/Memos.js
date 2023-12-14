import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function Memos({ state }) {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    async function memosMessage() {
      const memosFromContract = await contract.getMemos();
      setMemos(memosFromContract);
    }

    memosMessage();
  }, [contract]);
  return <div>Memos</div>;
}
