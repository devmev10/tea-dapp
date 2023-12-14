import { useState } from "react";
import { ethers } from "ethers";

export default function Buy({ state }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  async function buyChai(e) {
    e.preventDefault();
    const { contract } = state;
    console.log(name, message, contract);

    const transaction = await contract.buyChai(name, message, {
      value: ethers.parseEther("0.05"),
    });
  }

  return (
    <div>
      <form onSubmit={buyChai}>
        <label>
          {" "}
          Name:
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          {" "}
          Message:
          <input
            type="text"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <button type="submit">Pay</button>
      </form>
    </div>
  );
}
