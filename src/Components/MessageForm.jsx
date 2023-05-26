import { useState, useEffect } from 'react';
import julio from '../images/avatars/image-juliusomo.webp';

const MessageForm = ({ onSend }) => {
  const [inputValue, setInputValue] = useState('');
  const [reply, setReply] = useState('');

  useEffect(() => {
    const savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
      const { inputValue: savedInputValue, reply: savedReply } = JSON.parse(savedMessages);
      setInputValue(savedInputValue);
      setReply(savedReply);
    }
  }, []);

  const handleSend = () => {
    if (inputValue.trim() !== '') {
      onSend(inputValue, reply);
      setInputValue('');
      setReply('');
    } else {
      console.log('Input is empty. Please enter a message.');
    }
  };

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify({ inputValue, reply }));
  }, [inputValue, reply]);

  return (
    <div className="input-area">
      <img style={{ height: '35px', marginRight: '6px' }} src={julio} alt="" />
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
