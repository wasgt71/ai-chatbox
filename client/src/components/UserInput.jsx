import React, { useState } from "react";
import '../App.css';
const UserInput = ({ onSendMessage }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-input">
      <input className="text-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask us anything..."
      />
      <button className="send-button" type="submit">Send</button>
    </form>
  );
};

export default UserInput;
