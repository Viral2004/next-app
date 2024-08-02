"use client"
import React, { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';

const Page = () => {
  const [chat, setChat] = useState({ chating: '' });
  const { data: session } = useSession();
  const [user, setUser] = useState([]);
  const messagesRef = useRef(null);

  useEffect(() => {
    if (session) {
      fetchMessage();
    }
  }, [session]);

  const handleChange = (e) => {
    setChat({ ...chat, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const chatData = new FormData();
    if (session) {
      chatData.append('name', session.user.name);
      chatData.append('email', session.user.email);
      chatData.append('chating', chat.chating);
    }

    try {
      const response = await fetch('/api/chatSend', {
        method: 'POST',
        body: chatData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      // Update the user state with the new message
      setUser([...user, { id: Date.now(), chating: chat.chating }]);

      setChat({ chating: '' }); // Clear the input field

      // Scroll to the new message
      setTimeout(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }, 100);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const fetchMessage = async () => {
    try {
      let res = await fetch('/api/userMessege', {
        method: 'GET',
        headers: {
          'userEmail': session.user.email,
        },
      });
      let data = await res.json();
      console.log(data);
      setUser(data);
    } catch (error) {
      console.log('error is coming');
    }
  };

  return (
    <>
      <div className="dashboard w-full flex flex-col justify-between h-screen bg-slate-300">
        <div
          ref={messagesRef}
          className="chat px-4 py-2 flex-1 overflow-auto border border-red-800"
        >
          <div className="messages flex flex-col gap-2">
            {user.map((user) => (
              <div
                key={user._id}
                className={`message p-2 my-2 rounded-lg shadow-md bg-gray-100 self-end max-w-lg`}
              >
                <p className="break-words">{user.chating}</p>
              </div>
            ))}
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="chatbox w-full flex justify-between items-center gap-2 px-4 sticky bottom-0 bg-slate-700 py-4"
        >
          <input
            onChange={handleChange}
            value={chat.chating}
            name="chating"
            type="text"
            placeholder="Type message here"
            className="w-full px-3 py-2 border rounded-lg"
          />
          <button disabled={chat.chating.length === 0}
            type="submit" 
            className="disabled:bg-slate-900 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default Page;