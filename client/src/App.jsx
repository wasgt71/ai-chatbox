import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

import Message from "./components/Message";
import UserInput from "./components/UserInput";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [lock, setLock] = useState(false)

  const chatBox = useRef(null);

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
    console.log(response);
    setData(products);
  };

  useEffect(() => {
    handleData();
  }, []);

  useEffect(() => {
    if (chatBox.current) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
    {!lock && <button className="open-app" onClick={(e) => setLock(true)}>CHAT NOW</button>}
    {lock && (
        <>
        <div className="app">
        <button className="close-app" onClick={(e) => setLock(false)}>X</button>
        <div className="chat-box" ref={chatBox}>
    
          {messages.map((msg, index) => (
            <>
              {msg.sender === "Nuusero-ai" && (
                <>
                  <div className="ai-message">
                    <img className="logo" src="./logo.png"></img>{" "}
                    <p className="name">
                      Christa
                    </p>
                    <Message key={index} sender={msg.sender} text={msg.text} />
                  </div>
                </>
              )}
              <div className="user-message">
                {msg.sender !== "Nuusero-ai" && (
                  <Message key={index} sender={msg.sender} text={msg.text} />
                )}
              </div>
            </>
          ))}
          {isLoading && <div className="loading">Christa is typing...</div>}
        </div>

        <UserInput onSendMessage={handleUserMessage} />
      </div>
      </>
    )}
    </>
  );
};

export default App;
