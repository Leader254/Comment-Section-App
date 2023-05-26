import { useState, useEffect } from 'react';
import Message from './Message';
import MessageForm from './MessageForm';
import data from '../data.json';
import '../App.css'

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    setMessages(data);
  }, []);

  const handleSend = (content, reply) => {
  const newMessage = {
    id: Math.random().toString(),
    content,
    timestamp: new Date().toLocaleString(),
    reply,
  };

  setMessages([...messages, newMessage]);
};


  const handleReply = (updatedMessage) => {
    const updatedMessages = messages.map((message) =>
      message.id === updatedMessage.id ? updatedMessage : message
    );
    setMessages(updatedMessages);
  };
  

  const handleDelete = (id) => {
    // filter method to create a new array called updatedMessages that includes all 
    // messages except the one with the matching id. 
    const updatedMessages = messages.filter((message) => message.id !== id);
    setMessages(updatedMessages);
  };

  const handleEdit = (id, content) => {
    const updatedMessages = messages.map((message) =>
    // if statement to check if the message id is present
    // if yes, spread the message and set content else just retain the message
      message.id === id ? { ...message, content } : message
    );
    setMessages(updatedMessages);
  };

  return (
    <div className="chat-app">
      <div className="messages">
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            onReply={handleReply}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
      <MessageForm onSend={handleSend} />
    </div>
  );
};

export default ChatApp;
