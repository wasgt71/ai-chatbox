import React from "react";
import "../App.css";

const Message = ({ sender, text }) => {
  return <p className={sender}>{text}</p>;
};

export default Message;
