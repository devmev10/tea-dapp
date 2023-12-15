import { useEffect, useState } from "react";

export default function Memos({ state }) {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    async function memosMessage() {
      if (!contract) {
        console.log("Contract has not initialised yet");
        return;
      }

      const memosFromContract = await contract.getMemos();
      setMemos(memosFromContract);
      console.log("This is memosFromContract:", memosFromContract);
    }

    memosMessage();
    console.log("This is memos:", memos);
  }, [contract]);

  return (
    <div>
      <p>Messages:</p>
      {memos &&
        memos.map((memo) => (
          <table key={memo.timestamp}>
            <tbody>
              <tr>
                <td>{memo.name}</td>
                <td>{memo.message}</td>
                <td>{String(memo.timestamp)}</td>
                <td>{memo.from}</td>
              </tr>
            </tbody>
          </table>
        ))}
    </div>
  );
}
