import React, { useEffect, useRef, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000/ws");
    ws.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };
    return () => ws.current.close();
  }, []);

  const sendMessage = () => {
    if (ws.current) {
      ws.current.send("Hello from frontend!");
    }
  };

  return (
    <div>
      <h1>Crypto Trading Platform</h1>
      <button onClick={sendMessage}>Send Message</button>
      <ul>
        {messages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
