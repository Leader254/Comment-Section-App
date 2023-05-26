/* eslint-disable react/prop-types */
import { useState } from 'react';
import julio from '../images/avatars/image-juliusomo.webp';

const MessageForm = ({ onSend }) => {
  // State variables
  const [inputValue, setInputValue] = useState(''); // Holds the value of the message input field
  const [reply, setReply] = useState(''); // Holds the value of the reply input field

  const handleSend = () => {
    if (inputValue.trim() !== '') { // Check if the input value is not empty
      onSend(inputValue, reply); // Call the onSend function with the input value and reply
      setInputValue(''); // Clear the message input field
      setReply(''); // Clear the reply input field
    } else {
      console.log('Input is empty. Please enter a message.'); // Log an error message if the input value is empty
    }
  };

  return (
    <div className="input-area">
      <img style={{ height: '35px', marginRight: '6px' }} src={julio} alt="" /> {/* Display an image */}
      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSend}>Send</button> {/* Send button */}
    </div>
  );
};

export default MessageForm;
