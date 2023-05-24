/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const Message = ({ message, onReply, onDelete, onEdit }) => {
  const [reply, setReply] = useState('');

  const handleReply = () => {
    onReply(message.id, reply);
    setReply('');
  };

  const handleDelete = () => {
    onDelete(message.id);
  };

  const handleEdit = () => {
    const updatedContent = prompt('Enter the updated message:', message.content);
    if (updatedContent !== null) {
      onEdit(message.id, updatedContent);
    }
  };

  return (
    <div className="message">
      <div className="message-content">
        <p>{message.content}</p>
        {message.reply && <p className="reply">Reply: {message.reply}</p>}
        <p className="time">{message.timestamp}</p>
      </div>
      <div className="message-actions">
        <button onClick={handleReply}>Reply</button>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Message;
