import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import Message from "./components/Message";
import UserInput from "./components/UserInput";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleUserMessage = async (message) => {
    const newMessages = [...messages, { text: message, sender: "user" }];
    setMessages(newMessages);

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/chat", {
        message,
        data,
      });
      const aiMessage = response.data;
      console.log(response);
      setMessages([...newMessages, { text: aiMessage, sender: "Nuusero-ai" }]);
    } catch (error) {
      console.error("Error fetching response from OpenAI:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleData = async () => {
    const response = await axios.post("http://localhost:3000/shopify", {});
    const products = response.data.products.map((product) => product.title);
    setData(products);
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} text={msg.text} />
        ))}
        {isLoading && <div className="loading">AI is typing...</div>}
      </div>
      <UserInput onSendMessage={handleUserMessage} />
    </div>
  );
};

export default App;
