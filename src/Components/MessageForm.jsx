/* eslint-disable react/prop-types */
import { useState } from 'react';
import julio from '../images/avatars/image-juliusomo.webp'

const MessageForm = ({ onSend }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim() !== '') {
      onSend(inputValue);
      setInputValue('');
    }
  };

  return (

    <div  className="input-area">
      <img style={{height:"35px",marginRight:"6px"}} src={julio} alt="" />
      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default MessageForm;
