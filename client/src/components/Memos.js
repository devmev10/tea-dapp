import { useEffect, useState } from "react";
import styled from "styled-components";

const DarkDiv = styled.div`
  background-color: #222;
  color: #fff;
  padding: 20px;
  border-radius: 5px;
  max-width: 800px;
  margin: 0 auto;
`;

const MessagesHeading = styled.p`
  font-size: 1.2rem;
  margin-bottom: 15px;
  text-align: center;
`;

const MemoContainer = styled.div`
  border: 1px solid #444;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
`;

const MemoDetails = styled.p`
  margin: 5px 0;
  line-height: 1.5;
`;

const MemoProperty = styled.span`
  font-weight: bold;
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

  return (
    <DarkDiv>
      <MessagesHeading>Messages:</MessagesHeading>
      {memos &&
        memos.map((memo) => (
          <MemoContainer key={memo.timestamp}>
            <MemoDetails>
              <MemoProperty>Name:</MemoProperty> {memo.name}
            </MemoDetails>
            <MemoDetails>
              <MemoProperty>Message:</MemoProperty> {memo.message}
            </MemoDetails>
            <MemoDetails>
              <MemoProperty>Timestamp:</MemoProperty> {String(memo.timestamp)}
            </MemoDetails>
            <MemoDetails>
              <MemoProperty>From:</MemoProperty> {memo.from}
            </MemoDetails>
          </MemoContainer>
        ))}
    </DarkDiv>
  );
}
