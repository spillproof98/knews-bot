import React, { useState } from 'react';

export default function ChatInput({ onSend, placeholder, history }) {
  const [text, setText] = useState("");

  function handleSend() {
    if (text.trim()) {
      onSend(text.trim());
      setText("");
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSend();
    }
  }

  return (
    <div className="chat-input">
      <input
        list="search-history"
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={placeholder || "Type a message"}
      />
      <datalist id="search-history">
        {history.map((item, i) => (
          <option key={i} value={item} />
        ))}
      </datalist>
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
