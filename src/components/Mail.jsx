import React, { useState, useEffect } from 'react';
import '../css/styles.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Mail() {
  const [users, setUsers] = useState([]);
  const [receiver, setReceiver] = useState('');
  const [topic, setTopic] = useState('');
  const [messageText, setMessageText] = useState('');
  const [userMessages, setUserMessages] = useState([]);

  const username = Cookies.get('username');
  const role = Cookies.get('role');
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'admin' && role !== 'kartotajs' && role !== 'darbinieks') {
      navigate('../login');
    }
  }, [navigate, role]);

  useEffect(() => {
    getUsers();
    getUserMessages();
  }, [username]);

  const getUsers = () => {
    fetch('http://localhost:8888/storageAPI/getUsers.php')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  };

  const getUserMessages = async () => {
    try {
      const response = await fetch(`http://localhost:8888/storageAPI/selectUsersMail.php?username=${encodeURIComponent(username)}`);
      if (response.ok) {
        const responseData = await response.json();
        setUserMessages(responseData);
        console.log('User Messages:', responseData);
      } else {
        console.error('Error fetching user messages:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user messages:', error);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      const response = await fetch(`http://localhost:8888/storageAPI/deleteMessage.php?id=${encodeURIComponent(messageId)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          console.log('Message deleted successfully');
          getUserMessages(); // Refresh messages after deletion
        } else {
          console.error('Error deleting message:', responseData.error);
        }
      } else {
        console.error('Error deleting message:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8888/storageAPI/sendMessage.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `sender=${encodeURIComponent(username)}&receiver=${encodeURIComponent(receiver)}&topic=${encodeURIComponent(topic)}&message=${encodeURIComponent(messageText)}`,
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          console.log('Message sent successfully');
          getUserMessages(); // Refresh messages after sending
        } else {
          console.error('Error sending message:', responseData.error);
        }
      } else {
        console.error('Error sending message:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setReceiver('');
    setTopic('');
    setMessageText('');
  };

  return (
    <div className='containerStorage-mar'>
      <div className="topBar-mar"><span className='spanTop-mar'>MAIL</span></div>
      <div className="messageContainer-mar">
        <div className='storageContainerHeading'>YOURr MESSAGESs</div>
        {userMessages.map((message, index) => (
          <div key={index} className='messageRow'>
            <button className='deleteButton' onClick={() => deleteMessage(message.id)}>X</button>
            <div className='rowAuthor'><span className='spanBold'>Sender:  </span>{message.sender}</div>
            <div className='rowTitle'><span className='spanBold'>Topic:  </span> {message.title}</div>
            <div className='rowMessage'><span className='spanBold'>Message:  </span>{message.message}</div>
          </div>
        ))}
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
