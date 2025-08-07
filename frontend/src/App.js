
import React, { useEffect, useRef, useState } from "react";
import "./App.css";

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
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Crypto Trading Platform</h1>
      </header>
      <div className="dashboard-main">
        <section className="dashboard-prices">
          <h2>Live Crypto Prices</h2>
          {/* Example prices, replace with real data */}
          <ul>
            <li>BTC/USD: $29,000</li>
            <li>ETH/USD: $1,800</li>
            <li>SOL/USD: $25</li>
          </ul>
        </section>
        <section className="dashboard-chart">
          <h2>Trading Chart</h2>
          {/* Placeholder for chart */}
          <div className="chart-placeholder">[Chart Area]</div>
        </section>
        <section className="dashboard-orderbook">
          <h2>Order Book</h2>
          {/* Example order book, replace with real data */}
          <div className="orderbook">
            <div>
              <strong>Bids</strong>
              <ul>
                <li>29,000.5 - 0.5 BTC</li>
                <li>28,999.0 - 1.2 BTC</li>
              </ul>
            </div>
            <div>
              <strong>Asks</strong>
              <ul>
                <li>29,001.0 - 0.3 BTC</li>
                <li>29,002.5 - 0.8 BTC</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="dashboard-trades">
          <h2>Recent Trades</h2>
          {/* Example trades, replace with real data */}
          <ul>
            <li>Buy 0.2 BTC @ $29,000</li>
            <li>Sell 0.1 BTC @ $29,001</li>
          </ul>
        </section>
        <section className="dashboard-buy-sell">
          <h2>Buy/Sell Panel</h2>
          <button onClick={sendMessage}>Buy</button>
          <button onClick={sendMessage}>Sell</button>
        </section>
        <section className="dashboard-portfolio">
          <h2>User Portfolio</h2>
          {/* Example portfolio, replace with real data */}
          <ul>
            <li>BTC: 1.5</li>
            <li>ETH: 10</li>
            <li>SOL: 100</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default App;
