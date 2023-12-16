import { useState } from "react";
import { ethers } from "ethers";
import styled from "styled-components";
import Confetti from "react-confetti";

// Styled components
const Container = styled.div`
  background-color: #004d40; /* Dark green background */
  color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #fff; /* White label for better contrast */
`;

const Input = styled.input`
  width: 100%; /* Full width of the container */
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #333;
  background-color: #fff; /* White input background */
  color: #333; /* Dark text for readability */
  box-sizing: border-box; /* Include padding and border in the element's width and height */
`;

const SubmitButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #00796b; /* Lighter green for button */
  color: #ffffff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #004d40; /* Dark green on hover */
  }

  &:disabled {
    background-color: #888888;
    cursor: not-allowed;
  }
`;

export default function Buy({ state }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  async function buyChai(e) {
    e.preventDefault();
    setIsLoading(true); // Start loading
    const { contract } = state;

    try {
      // send transaction
      if (!contract) {
        return;
      }
      const transaction = await contract.buyChai(name, message, {
        value: ethers.parseEther("0.05"),
      });

      // wait for transaction to be mined
      const reciept = await transaction.wait();
      console.log("transaction is mined. Receipt:", reciept);

      setIsLoading(false);
      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
        window.location.reload();
      }, 5000); // Show confetti for 5 seconds, then reload
    } catch (error) {
      setIsLoading(false);

      if (error.code === 4001) {
        console.log("Transaction rejected by user");
      } else {
        console.error("Transaction error:", error);
      }
    }
  }

  return (
    <Container>
      {isLoading && <p>Hold on...</p>}
      {/* Replace with spinner component later */}
      {showConfetti && (
        <>
          <Confetti /> <p>Transaction Successful!</p>
        </>
      )}
      <Form onSubmit={buyChai} style={{ maxWidth: "100%" }}>
        <InputContainer>
          <Label htmlFor="name">Name:</Label>
          <Input
            type="text"
            id="name"
            required
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="message">Message:</Label>
          <Input
            type="text"
            id="message"
            required
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </InputContainer>
        <SubmitButton type="submit" disabled={!state.contract || isLoading}>
          Pay
        </SubmitButton>
      </Form>
    </Container>
  );
}
