import React, { useState, useEffect } from 'react';
import '../css/styles.css';

function Mail() {
  const [users, setUsers] = useState([]);
  const [receiver, setReceiver] = useState('');
  const [topic, setTopic] = useState('');
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    // Fetch users when the component mounts
    getUsers();
  }, []);

  const getUsers = () => {
    fetch('http://localhost/api/getUsers.php') // Replace with your actual PHP script
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      // Add your logic to send the message with the selected receiver, topic, and messageText
      const response = await fetch('http://localhost/api/sendMessage.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `receiver=${encodeURIComponent(receiver)}&message=${encodeURIComponent(messageText)}`,
      });

      if (response.ok) {
        console.log('Message sent successfully');
      } else {
        console.error('Error sending message:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }

    // After sending the message, you may want to clear the form fields
    setReceiver('');
    setTopic('');
    setMessageText('');
  };

  return (
    <div className='containerStorage-mar'>
      <div className="topBar-mar"><span className='spanTop-mar'>STORAGE</span></div>
      <div className="messageContainer-mar">
        <div className='storageContainerHeading'>YOURr MESSAGESs</div>
        
      </div>

      <div className="storageContainer-mar">
        <div className='storageContainerHeading'>SEND A MESSAGE</div>
        <div className='MailBox'>
          <form className='mailForm' onSubmit={sendMessage}>
            <div className='mailheading'>RECEIVER</div>
            <select
              className='formSelect'
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
            >
              <option value="" disabled>Select Receiver</option>
              {users.map(user => (
                <option key={user.id} value={user.username}>{user.username}</option>
              ))}
            </select>
            <div className='mailheading'>TOPIC</div>
            <input
              className='formText'
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <div className='mailheading'>MESSAGE</div>
            <input
              className='formMessage'
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <button type="submit" className='botStorageButton'>SEND</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Mail;
