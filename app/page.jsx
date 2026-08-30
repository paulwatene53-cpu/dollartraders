"use client";

import { useEffect, useState } from "react";

const tools = [
  {
    id: 1,
    name: "Bot Builder",
    icon: "🤖",
    color: "purple",
    description: "Create and customize your own trading bot",
  },
  {
    id: 2,
    name: "Free Bot",
    icon: "🎁",
    color: "blue",
    description: "Use powerful free trading bots",
  },
  {
    id: 3,
    name: "Premium AI Bot",
    icon: "👑",
    color: "orange",
    description: "Advanced AI bots with higher accuracy",
  },
  {
    id: 4,
    name: "Signal AI",
    icon: "◉",
    color: "green",
    description: "AI generated trading signals",
  },
  {
    id: 5,
    name: "Manual Trader",
    icon: "☝",
    color: "yellow",
    description: "Trade manually with full control",
  },
  {
    id: 6,
    name: "Bulk Trader",
    icon: "▱",
    color: "pink",
    description: "Execute multiple trades at once",
  },
  {
    id: 7,
    name: "Copy Trader",
    icon: "♙",
    color: "cyan",
    description: "Copy and follow top performing traders",
  },
  {
    id: 8,
    name: "Analysis Tool",
    icon: "⌁",
    color: "purple",
    description: "Powerful market analysis tools",
  },
  {
    id: 9,
    name: "Chart",
    icon: "↗",
    color: "blue",
    description: "Advanced charts and indicators",
  },
];

const digits = [
  { digit: 0, value: "9.8%" },
  { digit: 1, value: "11.3%" },
  { digit: 2, value: "8.8%" },
  { digit: 3, value: "10.2%" },
  { digit: 4, value: "10.0%" },
  { digit: 5, value: "8.4%" },
  { digit: 6, value: "10.9%" },
  { digit: 7, value: "10.2%" },
  { digit: 8, value: "12.6%" },
  { digit: 9, value: "7.8%" },
];

export default function HomePage() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [balanceOpen, setBalanceOpen] = useState(false);
  const [isLive, setIsLive] = useState(true);
  const [price, setPrice] = useState(734.44);
  const [change, setChange] = useState(2.35);
  const [signalConfidence, setSignalConfidence] = useState(72);
  const [seconds, setSeconds] = useState(2);
  const [chartPoints, setChartPoints] = useState([
    733.1,
    733.6,
    733.4,
    734.0,
    734.7,
    734.3,
    735.0,
    734.6,
    734.1,
    733.8,
    733.4,
    733.0,
    732.7,
    733.2,
    733.8,
    734.1,
    733.9,
    734.5,
    735.1,
    734.6,
    733.8,
    733.2,
    732.9,
    733.4,
    733.9,
    734.44,
  ]);

  // Simulated live market movement for the visual dashboard.
  // Real Deriv data should be connected later through the API/WebSocket.
  useEffect(() => {
    const interval = setInterval(() => {
      setPrice((oldPrice) => {
        const movement = (Math.random() - 0.47) * 0.55;
        return Number((oldPrice + movement).toFixed(2));
      });

      setChange((oldChange) => {
        const movement = (Math.random() - 0.5) * 0.08;
        return Number((oldChange + movement).toFixed(2));
      });

      setSignalConfidence((old) => {
        const movement = Math.floor(Math.random() * 5) - 2;
        return Math.min(95, Math.max(55, old + movement));
      });

      setSeconds((old) => {
        if (old <= 1) return 2;
        return old - 1;
      });

      setChartPoints((oldPoints) => {
        const last = oldPoints[oldPoints.length - 1];
        const next = Number(
          (last + (Math.random() - 0.48) * 0.65).toFixed(2)
        );

        return [...oldPoints.slice(1), next];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const openTool = (tool) => {
    setSelectedTool(tool);
  };

  const closeTool = () => {
    setSelectedTool(null);
  };

  const login = () => {
    window.location.href = "/api/auth/login";
  };

  return (
    <main className="dashboard">
      {/* =========================
          SIDEBAR
      ========================== */}
      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">
            <span>D</span>
            <span>T</span>
          </div>

          <div>
            <div className="brand-name">
              <span>DOLLAR</span>TRADERS
            </div>
            <div className="brand-subtitle">
              AI TRADING PLATFORM
            </div>
          </div>
        </div>

        <nav className="side-nav">
          <button className="side-link active">
            <span className="side-number home-icon">⌂</span>
            <span>
              <strong>Dashboard</strong>
            </span>
          </button>

          {tools.map((tool) => (
            <button
              key={tool.id}
              className="side-link"
              onClick={() => openTool(tool)}
            >
              <span className={`side-number ${tool.color}`}>
                {tool.id}
              </span>

              <span className="side-text">
                <strong>{tool.name}</strong>
                <small>{tool.description}</small>
              </span>

              <span className="side-arrow">›</span>
            </button>
          ))}
        </nav>

        <div className="demo-box">
          <div className="demo-icon">◈</div>
          <div>
            <strong>DEMO MODE</strong>
            <p>All trading is currently in demo mode.</p>
          </div>
        </div>
      </aside>

      {/* =========================
          MAIN AREA
      ========================== */}
      <section className="main-area">

        {/* TOP BAR */}
        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            ☰
          </button>

          <div className="top-status">
            <span className={`status-dot ${isLive ? "online" : "offline"}`} />
            <strong>
              {isLive ? "MARKET LIVE" : "MARKET OFFLINE"}
            </strong>
          </div>

          <div className="top-actions">

            {/* LOGIN */}
            <button className="login-button" onClick={login}>
              <span>↪</span>
              Connect Deriv
            </button>

            {/* ACCOUNT */}
            <div className="dropdown-wrapper">
              <button
                className="top-account"
                onClick={() => setAccountOpen(!accountOpen)}
              >
                <span className="account-icon">♙</span>
                <span>
                  <small>Account</small>
                  <strong>Demo Account</strong>
                </span>
                <span>⌄</span>
              </button>

              {accountOpen && (
                <div className="dropdown">
                  <button onClick={login}>
                    Connect Deriv Account
                  </button>
                  <button>Account Details</button>
                  <button>Logout</button>
                </div>
              )}
            </div>

            {/* BALANCE */}
            <div className="dropdown-wrapper">
              <button
                className="balance-box"
                onClick={() => setBalanceOpen(!balanceOpen)}
              >
                <span>
                  <small>Balance</small>
                  <strong>10,000.00 USD</strong>
                </span>
                <span>⌄</span>
              </button>

              {balanceOpen && (
                <div className="dropdown balance-dropdown">
                  <div>
                    <small>Demo Balance</small>
                    <strong>10,000.00 USD</strong>
                  </div>
                  <div>
                    <small>Profit/Loss</small>
                    <strong className="green-text">
                      +0.00 USD
                    </strong>
                  </div>
                </div>
              )}
            </div>

            <div className="profile-circle">DT</div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="content">

          {/* MARKET + ACCOUNT ROW */}
          <div className="top-grid">

            {/* MARKET OVERVIEW */}
            <section className="panel market-panel">
              <div className="panel-heading">
                <div>
                  <span className="green-chart-icon">⌁</span>
                  <strong>Market Overview</strong>
                </div>

                <span className="live-label">
                  <span className="status-dot online" />
                  LIVE
                </span>
              </div>

              <div className="market-name">
                Volatility 100 (1s) Index
              </div>

              <div className="market-main">
                <div>
                  <div className="big-price">
                    {price.toFixed(2)}
                    <span className="up-arrow">↑</span>
                  </div>

                  <div className="positive">
                    +{change.toFixed(2)} ({Math.abs(change / 7.3).toFixed(2)}%)
                  </div>
                </div>

                <div className="market-stats">
                  <div>
                    <small>High</small>
                    <strong>735.62</strong>
                  </div>

                  <div>
                    <small>Low</small>
                    <strong>730.81</strong>
                  </div>

                  <div>
                    <small>24H Change</small>
                    <strong className="green-text">0.32%</strong>
                  </div>
                </div>

                <MiniWave />
              </div>
            </section>

            {/* ACCOUNT OVERVIEW */}
            <section className="panel account-panel">
              <div className="panel-heading">
                <div>
                  <span className="purple-icon">♙</span>
                  <strong>Account Overview</strong>
                </div>

                <span className="demo-label">Demo</span>
              </div>

              <div className="account-grid">
                <div>
                  <small>Balance</small>
                  <strong className="green-text">
                    10,000.00 USD
                  </strong>
                </div>

                <div>
                  <small>Profit/Loss</small>
                  <strong className="green-text">
                    +0.00 USD
                  </strong>
                </div>

                <div>
                  <small>Equity</small>
                  <strong>10,000.00 USD</strong>
                </div>

                <div>
                  <small>Available</small>
                  <strong>10,000.00 USD</strong>
                </div>
              </div>

              <button className="account-details">
                ACCOUNT DETAILS ↗
              </button>
            </section>
          </div>

          {/* QUICK ACCESS + SIGNAL */}
          <div className="middle-grid">

            {/* QUICK ACCESS */}
            <section className="panel quick-panel">
              <div className="section-title">
                <span>⚡</span>
                Quick Access
              </div>

              <div className="tool-grid">
                {tools.map((tool) => (
                  <button
                    key={tool.id}
                    className={`tool-card ${tool.color}`}
                    onClick={() => openTool(tool)}
                  >
                    <div className="tool-icon">
                      {tool.icon}
                    </div>

                    <div className="tool-number">
                      {tool.id}
                    </div>

                    <div className="tool-content">
                      <strong>{tool.name}</strong>
                      <small>{tool.description}</small>
                    </div>

                    <span className="tool-arrow">›</span>
                  </button>
                ))}
              </div>
            </section>

            {/* AI SIGNAL */}
            <section className="panel signal-panel">
              <div className="panel-heading">
                <div>
                  <span className="signal-icon">♧</span>
                  <strong>AI Signal</strong>
                </div>

                <small>Confidence</small>
              </div>

              <div className="signal-header">
                <div>
                  <h2>Matches</h2>
                  <p>Volatility 100 (1s) Index</p>
                </div>

                <div className="confidence">
                  <div
                    className="confidence-ring"
                    style={{
                      "--confidence": `${signalConfidence}%`,
                    }}
                  >
                    <span>{signalConfidence}%</span>
                  </div>
                </div>
              </div>

              <div className="signal-row">
                <span>Next Tick Prediction</span>
                <strong>{seconds} Seconds</strong>
              </div>

              <div className="signal-row">
                <span>Recommended Entry</span>
                <strong>734.40 - 734.60</strong>
              </div>

              <div className="signal-row">
                <span>Expiry</span>
                <strong>1 Tick</strong>
              </div>

              <button
                className="signal-button"
                onClick={() =>
                  setSelectedTool({
                    name: "Signal AI",
                    icon: "◉",
                    description:
                      "AI generated trading signal",
                  })
                }
              >
                VIEW SIGNAL DETAILS
                <span>›</span>
              </button>
            </section>
          </div>

          {/* CHART + DIGIT ANALYSIS */}
          <div className="bottom-grid">

            {/* CHART */}
            <section className="panel chart-panel">
              <div className="chart-header">
                <strong>Live Chart</strong>

                <div className="chart-controls">
                  <button>1s⌄</button>
                  <button>⌁⌄</button>
                  <button>⛶</button>
                  <button>×</button>
                </div>
              </div>

              <div className="chart-area">
                <div className="chart-y">
                  <span>736.00</span>
                  <span>735.00</span>
                  <span>734.00</span>
                  <span>733.00</span>
                  <span>732.00</span>
                  <span>731.00</span>
                </div>

                <div className="grid-lines">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <ChartLine points={chartPoints} />

                <div className="current-price">
                  {price.toFixed(2)}
                </div>

                <div className="chart-times">
                  <span>14:42:10</span>
                  <span>14:42:20</span>
                  <span>14:42:30</span>
                  <span>14:42:40</span>
                  <span>14:42:50</span>
                  <span>14:43:00</span>
                </div>
              </div>
            </section>

            {/* DIGIT ANALYSIS */}
            <section className="panel digit-panel">
              <div className="digit-heading">
                <strong>Digit Analysis</strong>
                <span>(Last 1000 Ticks)</span>
              </div>

              <div className="digit-grid">
                {digits.map((item) => (
                  <div
                    key={item.digit}
                    className={`digit-box ${
                      item.digit === 8
                        ? "hot-digit"
                        : item.digit === 9
                        ? "cold-digit"
                        : ""
                    }`}
                  >
                    <strong>{item.digit}</strong>
                    <span>{item.value}</span>

                    <div className="digit-bar">
                      <i
                        style={{
                          width: item.value,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="heat-labels">
                <span>Hot</span>

                <div className="heat-bar">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>

                <span>Cold</span>
              </div>

              <div className="neutral">Neutral</div>
            </section>
          </div>

          {/* SYSTEM STATUS */}
          <footer className="system-status">

            <div>
              <small>System Status</small>
              <strong>
                <span className="status-dot online" />
                All systems operational
              </strong>
            </div>

            <div>
              <small>Deriv API</small>
              <strong>
                <span className="status-dot" />
                Awaiting connection
              </strong>
            </div>

            <div>
              <small>Server Time</small>
              <strong>
                {new Date().toLocaleTimeString()}
              </strong>
            </div>

            <div>
              <small>Risk Disclaimer</small>
              <strong>
                Trading involves risk. Past performance is
                not indicative of future results.
              </strong>
            </div>

          </footer>
        </div>
      </section>

      {/* =========================
          TOOL MODAL
      ========================== */}
      {selectedTool && (
        <div className="modal-backdrop" onClick={closeTool}>
          <div
            className="modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" onClick={closeTool}>
              ×
            </button>

            <div className="modal-icon">
              {selectedTool.icon}
            </div>

            <h2>{selectedTool.name}</h2>

            <p>{selectedTool.description}</p>

            <div className="demo-notice">
              <span>●</span>
              Demo interface
            </div>

            <p className="modal-description">
              This module is ready for its trading functionality
              to be connected to the Deriv API.
            </p>

            <button
              className="modal-connect"
              onClick={login}
            >
              CONNECT DERIV ACCOUNT
            </button>
          </div>
        </div>
      )}

      {/* =========================
          STYLES
      ========================== */}
      <style jsx>{`

        * {
          box-sizing: border-box;
        }

        .dashboard {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 20% 0%,
              rgba(0, 255, 150, 0.045),
              transparent 28%
            ),
            #020710;
          color: #eef4ff;
          display: flex;
          font-family:
            Inter,
            Arial,
            Helvetica,
            sans-serif;
        }

        button {
          font-family: inherit;
        }

        /* SIDEBAR */

        .sidebar {
          width: 292px;
          min-height: 100vh;
          background: #030914;
          border-right: 1px solid #182334;
          padding: 14px 10px;
          flex-shrin
