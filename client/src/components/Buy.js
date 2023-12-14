import { useState } from "react";

export default function Buy({ state }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  async function buyChai() {
    const { contract } = state;
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
