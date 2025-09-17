import React from 'react';

export default function MessageBubble3D({ message }) {
  const bubbleClass = message.sender === 'bot' ? 'bubble bot' : 'bubble user';
  return <div className={bubbleClass}>{message.text}</div>;
}
