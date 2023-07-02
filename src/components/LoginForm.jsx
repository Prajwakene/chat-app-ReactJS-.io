import { useState } from 'react';
import axios from 'axios';

const projectID = 'faf53fd7-5f94-4957-9ce9-d09483807862';

const Modal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
//using asynchronous code
  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': password };
          //ist that works out -> user log in

    try {
      //username | password matmches => chatengine -->message
      await axios.get('https://api.chatengine.io/chats', { headers: authObject });

      //everytime we visit the page no need to log in everytime
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      //for reloading the page
      window.location.reload();
      setError('');
      // if not -> try with new username

    } catch (err) {
      setError('Oops, incorrect credentials.');
    }
  };

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Chat App</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
          <div align="center">
            <button type="submit" className="button">
              <span>Start chatting</span>
            </button>
          </div>
        </form>
        <h1>{error}</h1>
      </div>
    </div>

  );
};

export default Modal;
