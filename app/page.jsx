"use client";

import { useState } from "react";
import EvenOddBot from "./components/EvenOddBot";

const tools = [
  {
    id: 1,
    name: "Bot Builder",
    icon: "🤖",
    description: "Create and customize trading bots",
  },
  {
    id: 2,
    name: "Free Bot",
    icon: "🎁",
    description: "Free automated trading tools",
  },
  {
    id: 3,
    name: "Premium AI Bot",
    icon: "👑",
    description: "Advanced AI trading system",
  },
  {
    id: 4,
    name: "Signal AI",
    icon: "◉",
    description: "AI-powered market signals",
  },
  {
    id: 5,
    name: "Manual Trader",
    icon: "☝",
    description: "Trade manually",
  },
  {
    id: 6,
    name: "Bulk Trader",
    icon: "▱",
    description: "Multiple trades at once",
  },
  {
    id: 7,
    name: "Copy Trader",
    icon: "♙",
    description: "Copy selected traders",
  },
  {
    id: 8,
    name: "Analysis Tool",
    icon: "⌁",
    description: "Advanced market analysis",
  },
  {
    id: 9,
    name: "Chart",
    icon: "↗",
    description: "Advanced live charts",
  },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [showEvenOdd, setShowEvenOdd] = useState(false);

  const connectDeriv = () => {
    window.location.href = "/api/auth/login";
  };

  const selectTool = (tool) => {
    setSelectedTool(tool);

    if (tool.id === 8) {
      setShowEvenOdd(true);
    }
  };

  return (
    <main className="site">

      {/* ================================
          SIDEBAR
      ================================= */}

      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>

        <div className="brand">

          <div className="brand-logo">
            DT
          </div>

          <div>
            <div className="brand-name">
              <span>DOLLAR</span>TRADERS
            </div>

            <div className="brand-tagline">
              AI TRADING PLATFORM
            </div>
          </div>

        </div>

        <div className="navigation-title">
          TRADING TOOLS
        </div>

        <nav>

          <button
            className="nav-item active"
            onClick={() => {
              setSelectedTool(null);
              setShowEvenOdd(false);
            }}
          >
            <span className="nav-icon home">
              ⌂
            </span>

            <span>
              <strong>Dashboard</strong>
              <small>Overview</small>
            </span>
          </button>

          {tools.map((tool) => (
            <button
              key={tool.id}
              className="nav-item"
              onClick={() => selectTool(tool)}
            >

              <span className={`nav-number n${tool.id}`}>
                {tool.id}
              </span>

              <span>
                <strong>{tool.name}</strong>
                <small>{tool.description}</small>
              </span>

              <b>›</b>

            </button>
          ))}

        </nav>

        <div className="demo-card">

          <div className="demo-symbol">
            ◆
          </div>

          <div>
            <strong>DEMO MODE</strong>

            <p>
              Test your strategies before
              using real funds.
            </p>
          </div>

        </div>

      </aside>

      {/* ================================
          MAIN
      ================================= */}

      <section className="main">

        {/* TOP BAR */}

        <header className="topbar">

          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <div className="market-status">

            <span className="live-dot" />

            <strong>
              MARKET LIVE
            </strong>

          </div>

          <div className="top-actions">

            <button
              className="connect-button"
              onClick={connectDeriv}
            >
              ↪ CONNECT DERIV
            </button>

            <div className="account-box">

              <span className="user-symbol">
                ♙
              </span>

              <div>
                <small>ACCOUNT</small>
                <strong>
                  Demo Account
                </strong>
              </div>

              <span>⌄</span>

            </div>

            <div className="balance-box">

              <small>BALANCE</small>

              <strong>
                10,000.00 USD
              </strong>

            </div>

            <div className="avatar">
              DT
            </div>

          </div>

        </header>

        {/* PAGE CONTENT */}

        <div className="content">

          {/* WELCOME */}

          <section className="welcome">

            <div>

              <span>
                DOLLARTRADERS AI
              </span>

              <h1>
                Intelligent Trading
                <br />
                Dashboard
              </h1>

              <p>
                Analyze the market, generate signals
                and manage your trading strategies
                from one powerful platform.
              </p>

            </div>

            <div className="welcome-status">

              <span className="live-dot" />

              SYSTEM OPERATIONAL

            </div>

          </section>

          {/* MARKET CARDS */}

          <div className="market-grid">

            <div className="panel market-card">

              <div className="card-title">
                <span>
                  ◈ MARKET OVERVIEW
                </span>

                <em>
                  LIVE
                </em>
              </div>

              <h3>
                Volatility 100 (1s) Index
              </h3>

              <div className="price">
                734.44
                <span>↑</span>
              </div>

              <div className="positive">
                +2.35 (+0.32%)
              </div>

              <div className="market-details">

                <div>
                  <small>HIGH</small>
                  <strong>735.62</strong>
                </div>

                <div>
                  <small>LOW</small>
                  <strong>730.81</strong>
                </div>

                <div>
                  <small>CHANGE</small>
                  <strong>+0.32%</strong>
                </div>

              </div>

              <div className="wave">
                <svg
                  viewBox="0 0 500 100"
                  preserveAspectRatio="none"
                >
                  <polyline
                    points="
                    0,70
                    30,62
                    55,68
                    85,42
                    110,55
                    140,25
                    170,47
                    200,20
                    230,37
                    260,12
                    290,35
                    320,23
                    350,48
                    380,20
                    410,38
                    440,17
                    470,28
                    500,14
                    "
                    fill="none"
                    stroke="#16e58a"
                    strokeWidth="3"
                  />
                </svg>
              </div>

            </div>

            <div className="panel account-card">

              <div className="card-title">
                <span>
                  ♙ ACCOUNT OVERVIEW
                </span>

                <em className="purple">
                  DEMO
                </em>
              </div>

              <div className="account-grid">

                <div>
                  <small>BALANCE</small>
                  <strong className="green">
                    10,000.00 USD
                  </strong>
                </div>

                <div>
                  <small>PROFIT / LOSS</small>
                  <strong className="green">
                    +0.00 USD
                  </strong>
                </div>

                <div>
                  <small>EQUITY</small>
                  <strong>
                    10,000.00 USD
                  </strong>
                </div>

                <div>
                  <small>AVAILABLE</small>
                  <strong>
                    10,000.00 USD
                  </strong>
                </div>

              </div>

              <button className="details-button">
                ACCOUNT DETAILS ↗
              </button>

            </div>

          </div>

          {/* QUICK ACCESS */}

          <section className="panel quick-access">

            <div className="section-heading">

              <div>
                <span>⚡</span>

                <div>
                  <h2>
                    Quick Access
                  </h2>

                  <p>
                    Select a trading module
                  </p>
                </div>
              </div>

            </div>

            <div className="tools-grid">

              {tools.map((tool) => (

                <button
                  key={tool.id}
                  className={`tool-card tool-${tool.id}`}
                  onClick={() => selectTool(tool)}
                >

                  <div className="tool-icon">
                    {tool.icon}
                  </div>

                  <div className="tool-number">
                    {String(tool.id).padStart(2, "0")}
                  </div>

                  <div className="tool-info">

                    <strong>
                      {tool.name}
                    </strong>

                    <small>
                      {tool.description}
                    </small>

                  </div>

                  <span className="tool-arrow">
                    ›
                  </span>

                </button>

              ))}

            </div>

          </section>

          {/* SIGNAL + DIGIT */}

          <div className="analysis-grid">

            <section className="panel signal-card">

              <div className="card-title">
                <span>
                  ◉ AI SIGNAL
                </span>

                <em>
                  72% CONFIDENCE
                </em>
              </div>

              <div className="signal-main">

                <div>

                  <small>
                    CURRENT SIGNAL
                  </small>

                  <h2>
                    WAIT
                  </h2>

                  <p>
                    Waiting for stronger market
                    conditions.
                  </p>

                </div>

                <div className="confidence-circle">
                  72%
                </div>

              </div>

              <div className="signal-row">

                <span>
                  Market
                </span>

                <strong>
                  Volatility 100 (1s)
                </strong>

              </div>

              <div className="signal-row">

                <span>
                  Expiry
                </span>

                <strong>
                  1 Tick
                </strong>

              </div>

              <button
                className="signal-button"
                onClick={() =>
                  selectTool({
                    id: 4,
                    name: "Signal AI",
                    icon: "◉",
                    description:
                      "AI-powered market signals",
                  })
                }
              >
                VIEW SIGNAL DETAILS
                <span>›</span>
              </button>

            </section>

            <section className="panel digit-card">

              <div className="card-title">

                <span>
                  ⌁ DIGIT ANALYSIS
                </span>

                <em>
                  LAST 1000 TICKS
                </em>

              </div>

              <div className="digits">

                {[
                  ["0", "9.8%"],
                  ["1", "11.3%"],
                  ["2", "8.8%"],
                  ["3", "10.2%"],
                  ["4", "10.0%"],
                  ["5", "8.4%"],
                  ["6", "10.9%"],
                  ["7", "10.2%"],
                  ["8", "12.6%"],
                  ["9", "7.8%"],
                ].map(([digit, percentage]) => (

                  <div
                    key={digit}
                    className={
                      digit === "8"
                        ? "digit hot"
                        : digit === "9"
                        ? "digit cold"
                        : "digit"
                    }
                  >

                    <strong>
                      {digit}
                    </strong>

                    <span>
                      {percentage}
                    </span>

                    <div className="digit-line">
                      <i
                        style={{
                          width: percentage,
                        }}
                      />
                    </div>

                  </div>

                ))}

              </div>

            </section>

          </div>

          {/* LIVE CHART */}

          <section className="panel chart-card">

            <div className="card-title">

              <span>
                ↗ LIVE MARKET CHART
              </span>

              <div className="chart-buttons">
                <button>1s</button>
                <button>⌁</button>
                <button>⛶</button>
              </div>

            </div>

            <div className="chart">

              <div className="chart-grid">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <svg
                viewBox="0 0 1000 300"
                preserveAspectRatio="none"
              >

                <defs>

                  <linearGradient
                    id="area"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopColor="#16e58a"
                      stopOpacity="0.25"
                    />

                    <stop
                      offset="100%"
                      stopColor="#16e58a"
                      stopOpacity="0"
                    />

                  </linearGradient>

                </defs>

                <polygon
                  points="
                  0,260
                  50,245
                  100,255
                  150,220
                  200,230
                  250,190
                  300,205
                  350,155
                  400,180
                  450,145
                  500,165
                  550,125
                  600,150
                  650,115
                  700,135
                  750,95
                  800,120
                  850,82
                  900,105
                  950,70
                  1000,85
                  1000,300
                  0,300
                  "
                  fill="url(#area)"
                />

                <polyline
                  points="
                  0,260
                  50,245
                  100,255
                  150,220
                  200,230
                  250,190
                  300,205
                  350,155
                  400,180
                  450,145
                  500,165
                  550,125
                  600,150
                  650,115
                  700,135
                  750,95
                  800,120
                  850,82
                  900,105
                  950,70
                  1000,85
                  "
                  fill="none"
                  stroke="#16e58a"
                  strokeWidth="3"
                />

              </svg>

              <div className="chart-price">
                734.44
              </div>

            </div>

          </section>

          {/* =================================
              EVEN ODD BOT
          ================================= */}

          {showEvenOdd && (
            <div className="bot-section">

              <div className="bot-section-heading">

                <div>

                  <span>
                    AI TRADING BOT
                  </span>

                  <h2>
                    Even / Odd Strategy
                  </h2>

                  <p>
                    Statistical digit analysis
                    and signal generation.
                  </p>

                </div>

                <button
                  onClick={() => setShowEvenOdd(false)}
                >
                  CLOSE ×
                </button>

              </div>

              <EvenOddBot />

            </div>
          )}

          {/* FOOTER */}

          <footer>

            <div>

              <small>
                SYSTEM STATUS
              </small>

              <strong>
                <span className="live-dot" />
                All systems operational
              </strong>

            </div>

            <div>

              <small>
                DERIV API
              </small>

              <strong>
                Awaiting connection
              </strong>

            </div>

            <div>

              <small>
                MODE
              </small>

              <strong>
                DEMO
              </strong>

            </div>

            <div>

              <small>
                RISK NOTICE
              </small>

              <strong>
                Trading involves financial risk.
              </strong>

            </div>

          </footer>

        </div>

      </section>

      {/* ================================
          TOOL MODAL
      ================================= */}

      {selectedTool &&
        selectedTool.id !== 8 && (
          <div
            className="modal-background"
            onClick={() => setSelectedTool(null)}
          >

            <div
              className="modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedTool(null)
                }
              >
                ×
              </button>

              <div className="modal-icon">
                {selectedTool.icon}
              </div>

              <h2>
                {selectedTool.name}
              </h2>

              <p>
                {selectedTool.description}
              </p>

              <div className="coming">
                MODULE READY
              </div>

              <p className="modal-note">
                This module is prepared for
                connection to the Deriv API.
              </p>

              <button
                className="modal-connect"
                onClick={connectDeriv}
              >
                CONNECT DERIV ACCOUNT
              </button>

            </div>

          </div>
        )}

      {/* =================================
          STYLES
      ================================= */}

      <style jsx>{`

        * {
          box-sizing: border-box;
        }

        .site {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 50% -20%,
              rgba(0,229,138,.08),
              transparent 35%
            ),
            #02070e;
          color: #eef4f8;
          fo
