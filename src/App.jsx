import React, { useState, useRef } from 'react';
import Chat3DScene from './components/Chat3DScene';
import ChatbotAvatar from './components/ChatbotAvatar';
import ChatInput from './components/ChatInput';
import MessageBubble3D from './components/MessageBubble3D';
import SessionControl from './components/SessionControl';
import './styles/chat3d.scss';

export default function App() {
  const [history, setHistory] = useState([]);

  const [messages, setMessages] = useState([
    { id: 'welcome', text: 'Hi! Ask me about the latest news.', sender: 'bot' },
  ]);
  const containerRef = useRef(null);

  async function handleSend(text) {
    if (!text.trim()) return;
     setHistory(prev => [...new Set([text, ...prev])]);

    const userMsg = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);

    try {
      const res = await fetch(`https://knews-bot.onrender.com/api/news?search=${encodeURIComponent(text)}`);


      const data = await res.json();

      if (data.news.length > 0) {
        const newsMessages = data.news.map(article => ({
          id: article.id,
          text: (
            <>
              <strong>{article.title}</strong>
              <br />
              {article.content}
              <br />
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </>
          ),
          sender: 'bot',
        }));
        setMessages(prev => [...prev, ...newsMessages]);
      } else {
        setMessages(prev => [
          ...prev,
          { id: Date.now() + 1, text: 'No relevant news articles found.', sender: 'bot' },
        ]);
      }
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, text: 'Sorry, failed to fetch news.', sender: 'bot' },
      ]);
      console.error('Failed to fetch news:', error);
    }
  }

  function handleReset() {
    setMessages([{ id: 'welcome', text: 'Hi! Ask me about the latest news.', sender: 'bot' }]);
  }

  return (
    <div className="app-container" ref={containerRef} style={{ height: '100vh', overflowY: 'auto' }}>
      <ChatbotAvatar />
      <Chat3DScene messages={messages}>
        {messages.map(msg => (
          <MessageBubble3D key={msg.id} message={msg} />
        ))}
      </Chat3DScene>
      <ChatInput onSend={handleSend} placeholder="Type your message..." history={history} />
      <SessionControl onReset={handleReset} />
    </div>
  );
}
