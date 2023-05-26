import { useState, useEffect } from 'react';
import Message from './Message';
import MessageForm from './MessageForm';
import data from '../data.json';
import '../App.css';

const ChatApp = () => {
  // State variable to store the messages
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Set the initial messages using the data from the JSON file
    setMessages(data);
  }, []);

  // Function to handle sending a new message
  const handleSend = (content, reply) => {
    // Create a new message object
    const newMessage = {
      id: Math.random().toString(),
      content,
      timestamp: new Date().toLocaleString(),
      reply,
    };

    // Update the messages state by adding the new message
    setMessages([...messages, newMessage]);
  };

  // Function to handle replying to a message
  const handleReply = (updatedMessage) => {
    // Update the messages state by replacing the updated message
    const updatedMessages = messages.map((message) =>
      message.id === updatedMessage.id ? updatedMessage : message
    );
    setMessages(updatedMessages);
  };

  // Function to handle deleting a message
  const handleDelete = (id) => {
    // Update the messages state by removing the message with the specified ID
    const updatedMessages = messages.filter((message) => message.id !== id);
    setMessages(updatedMessages);
  };

  // Function to handle editing a message
  const handleEdit = (id, content) => {
    // Update the messages state by modifying the content of the message with the specified ID
    const updatedMessages = messages.map((message) =>
      message.id === id ? { ...message, content } : message
    );
    setMessages(updatedMessages);
  };

  return (
    <div className="chat-app">
      <div className="messages">
        {/* Render each message component */}
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
      {/* Render the message form component */}
      <MessageForm onSend={handleSend} />
    </div>
  );
};

export default ChatApp;
