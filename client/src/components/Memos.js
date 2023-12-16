import { useEffect, useState } from "react";
import styled from "styled-components";

const DarkDiv = styled.div`
  background-color: #1c1c1c; /* Dark theme background */
  color: #e0e0e0; /* Light text for better visibility */
  padding: 20px;
  border-radius: 5px;
  max-width: 800px;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const MessagesHeading = styled.p`
  font-size: 1.4rem; /* Slightly larger for better readability */
  margin-bottom: 15px;
  text-align: center;
  font-weight: bold;
`;

const MemoContainer = styled.div`
  border: 1px solid #333;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #fff; /* White background for contrast */
  color: #333; /* Dark text for readability */
`;

const MemoDetails = styled.p`
  margin: 5px 0;
  line-height: 1.5;
  word-break: break-all; /* Break long words */
  text-align: left; /* Align text to the left */
`;

const MemoProperty = styled.span`
  font-weight: bold;
  display: inline-block;
  min-width: 100px; /* Set minimum width for the property label */
`;

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
    }

    memosMessage();
  }, [contract]);

  // format the timestamp
  const formattedDateTime = (timestamp) => {
    const date = new Date(Number(timestamp) * 1000); // Convert BigInt to number and seconds to milliseconds
    return date.toLocaleString("en-GB"); // Use 'en-GB' locale to format the date in DD/MM/YYYY format
  };

  // Create a reversed copy of the memos array
  const reversedMemos = [...memos].reverse();

  return (
    <DarkDiv>
      <MessagesHeading>Messages:</MessagesHeading>
      {memos &&
        reversedMemos.map((memo) => (
          <MemoContainer key={memo.timestamp}>
            <MemoDetails>
              <MemoProperty>Name:</MemoProperty> {memo.name}
            </MemoDetails>
            <MemoDetails>
              <MemoProperty>Message:</MemoProperty> {memo.message}
            </MemoDetails>
            <MemoDetails>
              <MemoProperty>Timestamp:</MemoProperty>{" "}
              {formattedDateTime(memo.timestamp)}
            </MemoDetails>
            <MemoDetails>
              <MemoProperty>From:</MemoProperty> {memo.from}
            </MemoDetails>
          </MemoContainer>
        ))}
    </DarkDiv>
  );
}
