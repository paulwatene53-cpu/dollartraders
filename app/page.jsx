"use client";

import { useState } from "react";

const tools = [
  {
    id: 1,
    name: "Bot Builder",
    icon: "🤖",
    description: "Create and customize your own trading bot",
  },
  {
    id: 2,
    name: "Free Bot",
    icon: "🆓",
    description: "Use our free automated trading bot",
  },
  {
    id: 3,
    name: "Premium AI Bot",
    icon: "🧠",
    description: "Advanced AI-powered trading automation",
  },
  {
    id: 4,
    name: "Signal AI",
    icon: "📡",
    description: "AI market signals and trade setups",
  },
  {
    id: 5,
    name: "Manual Trader",
    icon: "🎯",
    description: "Place trades manually with full control",
  },
  {
    id: 6,
    name: "Bulk Trader",
    icon: "⚡",
    description: "Manage multiple trades efficiently",
  },
  {
    id: 7,
    name: "Copy Trader",
    icon: "👥",
    description: "Copy selected trading strategies",
  },
  {
    id: 8,
    name: "Analysis Tool",
    icon: "📊",
    description: "Analyze digits, trends and market data",
  },
  {
    id: 9,
    name: "Chart",
    icon: "📈",
    description: "View live market charts and movement",
  },
];

export default function Home() {
  const [selectedTool, setSelectedTool] = useState(null);

  return (
    <main className="dashboard">
      {/* HEADER */}
      <header className="topbar">
        <div className="brand">
          <div className="logo">₿</div>

          <div>
            <h1>dollertraders</h1>
            <span>AI Trading Platform</span>
          </div>
        </div>

        <div className="header-actions">
          <button className="theme-btn">☀️</button>
          <button className="login-btn">Log in</button>
          <button className="signup-btn">Sign up</button>
        </div>
      </header>

      {/* WELCOME */}
      <section className="welcome">
        <div>
          <p className="small-title">WELCOME TO DOLLERTRADERS</p>
          <h2>
            Smart Trading.
            <br />
            <span>Powered by AI.</span>
          </h2>

          <p className="welcome-text">
            Choose a trading tool below to start analyzing the market,
            building bots or managing your trades.
          </p>
        </div>

        <div className="market-status">
          <span className="status-dot"></span>
          <div>
            <strong>Market Online</strong>
            <small>Live system connected</small>
          </div>
        </div>
      </section>

      {/* TOOL GRID */}
      <section className="tools-section">
        <div className="section-heading">
          <div>
            <h3>Trading Dashboard</h3>
            <p>Select a tool to continue</p>
          </div>

          <div className="live">
            <span></span> LIVE
          </div>
        </div>

        <div className="tool-grid">
          {tools.map((tool) => (
            <button
              key={tool.id}
              className={`tool-card ${
                selectedTool === tool.id ? "active" : ""
              }`}
              onClick={() => setSelectedTool(tool.id)}
            >
              <div className="tool-number">{tool.id}</div>

              <div className="tool-icon">{tool.icon}</div>

              <div className="tool-content">
                <h4>{tool.name}</h4>
                <p>{tool.description}</p>
              </div>

              <div className="arrow">→</div>
            </button>
          ))}
        </div>
      </section>

      {/* QUICK MARKET PANEL */}
      <section className="market-panel">
        <div className="market-title">
          <div>
            <span className="live-dot"></span>
            LIVE MARKET
          </div>

          <span>Volatility Indices</span>
        </div>

        <div className="market-grid">
          <div>
            <small>MARKET</small>
            <strong>Volatility 100</strong>
          </div>

          <div>
            <small>LAST DIGIT</small>
            <strong>4</strong>
          </div>

          <div>
            <small>PRICE</small>
            <strong>734.44</strong>
          </div>

          <div>
            <small>STATUS</small>
            <strong className="green">ACTIVE</strong>
          </div>
        </div>
      </section>

      {/* SELECTED TOOL */}
      {selectedTool && (
        <div className="selected-panel">
          <div>
            <span>SELECTED TOOL</span>
            <h3>
              {tools.find((tool) => tool.id === selectedTool)?.name}
            </h3>
          </div>

          <button onClick={() => setSelectedTool(null)}>
            Close
          </button>
        </div>
      )}

      {/* FOOTER */}
      <footer>
        <div>
          <strong>dollertraders</strong>
          <span>AI Trading Platform</span>
        </div>

        <p>Powered by modern trading technology</p>
      </footer>

      {/* PAGE STYLES */}
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: #f6f7f9;
          color: #111;
        }

        button {
          font-family: inherit;
          cursor: pointer;
        }

        .dashboard {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at top right,
              rgba(0, 0, 0, 0.04),
              transparent 30%
            ),
            #f6f7f9;
        }

        /* TOP BAR */

        .topbar {
          height: 78px;
          background: white;
          border-bottom: 1px solid #e8e8e8;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
          position: sticky;
          top: 0;
          z-index: 20;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: #050505;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 21px;
        }

        .brand h1 {
          margin: 0;
          font-size: 21px;
          text-transform: lowercase;
        }

        .brand span {
          display: block;
          color: #777;
          font-size: 11px;
          margin-top: 3px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .theme-btn,
        .login-btn,
        .signup-btn {
          border-radius: 25px;
          padding: 11px 18px;
          border: 1px solid #ddd;
          background: white;
          font-size: 14px;
        }

        .theme-btn {
          border: none;
          font-size: 17px;
        }

        .signup-btn {
          background: #050505;
          color: white;
          border-color: #050505;
        }

        /* WELCOME */

        .welcome {
          max-width: 1200px;
          margin: auto;
          padding: 70px 5% 45px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 30px;
        }

        .small-title {
          font-size: 12px;
          letter-spacing: 2px;
          font-weight: bold;
          color: #777;
          margin-bottom: 12px;
        }

        .welcome h2 {
          font-size: clamp(40px, 6vw, 66px);
          line-height: 0.98;
          margin: 0;
          letter-spacing: -3px;
        }

        .welcome h2 span {
          color: #666;
        }

        .welcome-text {
          max-width: 560px;
          color: #666;
          line-height: 1.6;
          margin-top: 22px;
        }

        .market-status {
          min-width: 210px;
          background: white;
          border: 1px solid #e5e5e5;
          border-radius: 18px;
          padding: 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
        }

        .status-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: #20c997;
        }

        .market-status strong,
        .market-status small {
          display: block;
        }

        .market-status small {
          color: #888;
          margin-top: 4px;
          font-size: 11px;
        }

        /* TOOLS */

        .tools-section {
          max-width: 1200px;
          margin: auto;
          padding: 20px 5% 40px;
        }

        .section-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .section-heading h3 {
          margin: 0;
          font-size: 25px;
        }

        .section-heading p {
          color: #888;
          margin: 5px 0 0;
          font-size: 13px;
        }

        .live {
          font-size: 11px;
          font-weight: bold;
          display: flex;
          gap: 7px;
          align-items: center;
        }

        .live span,
        .live-dot {
          width: 8px;
          height: 8px;
          display: inline-block;
          background: #20c997;
          border-radius: 50%;
        }

        .tool-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
        }

        .tool-card {
          position: relative;
          min-height: 155px;
          border: 1px solid #e5e5e5;
          background: white;
          border-radius: 20px;
          padding: 20px;
          text-align: left;
          transition: 0.2s ease;
          overflow: hidden;
        }

        .tool-card:hover,
        .tool-card.active {
          transform: translateY(-3px);
          border-color: #111;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
        }

        .tool-number {
          position: absolute;
          top: 14px;
          right: 16px;
          font-size: 11px;
          color: #aaa;
        }

        .tool-icon {
          font-size: 30px;
          margin-bottom: 14px;
        }

        .tool-content h4 {
          margin: 0 0 7px;
          font-size: 17px;
        }

        .tool-content p {
          margin: 0;
          color: #888;
          font-size: 12px;
          line-height: 1.5;
          max-width: 220px;
        }

        .arrow {
          position: absolute;
          right: 18px;
          bottom: 17px;
          font-size: 20px;
        }

        /* MARKET */

        .market-panel {
          max-width: 1200px;
          margin: 0 auto 40px;
          background: #101010;
          color: white;
          border-radius: 24px;
          padding: 25px;
          width: 90%;
        }

        .market-title {
          display: flex;
          justify-content: space-between;
          margin-bottom: 25px;
          font-size: 12px;
          color: #aaa;
        }

        .market-title div {
          display: flex;
          gap: 8px;
          align-items: center;
          color: white;
          font-weight: bold;
        }

        .market-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .market-grid small {
          display: block;
          color: #777;
          font-size: 10px;
          margin-bottom: 7px;
        }

        .market-grid strong {
          font-size: 18px;
        }

        .green {
          color: #20c997;
        }

        /* SELECTED */

        .selected-panel {
          max-width: 1200px;
          width: 90%;
          margin: 0 auto 35px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 18px;
          padding: 18px 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .selected-panel span {
          font-size: 10px;
          color: #999;
        }

        .selected-panel h3 {
          margin: 5px 0 0;
        }

        .selected-panel button {
          border: 1px solid #ddd;
          background: white;
          padding: 9px 15px;
          border-radius: 20px;
        }

        /* FOOTER */

        footer {
          border-top: 1px solid #e5e5e5;
          padding: 30px 5%;
          display: flex;
          justify-content: space-between;
          color: #777;
          font-size: 12px;
          background: white;
        }

        footer strong {
          display: block;
          color: #111;
          font-size: 15px;
        }

        footer span {
          display: block;
          margin-top: 4px;
        }

        /* MOBILE */

        @media (max-width: 800px) {
          .topbar {
            padding: 0 18px;
          }

          .login-btn {
            display: none;
          }

          .welcome {
            padding-top: 45px;
            flex-direction: column;
            align-items: flex-start;
          }

          .market-status {
            width: 100%;
          }

          .tool-grid {
            grid-template-columns: 1fr;
          }

          .market-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .welcome h2 {
            font-size: 45px;
          }

          footer {
            flex-direction: column;
            gap: 15px;
          }
        }
      `}</style>
    </main>
  );
  }
