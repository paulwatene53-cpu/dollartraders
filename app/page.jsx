"use client";

import { useEffect, useMemo, useState } from "react";

const tools = [
  {
    id: 1,
    name: "Bot Builder",
    icon: "🤖",
    color: "purple",
    description: "Create and customize your trading bot",
  },
  {
    id: 2,
    name: "Free Bot",
    icon: "🎁",
    color: "blue",
    description: "Use free trading strategies",
  },
  {
    id: 3,
    name: "Premium AI Bot",
    icon: "👑",
    color: "orange",
    description: "Advanced AI-assisted analysis",
  },
  {
    id: 4,
    name: "Signal AI",
    icon: "◉",
    color: "green",
    description: "AI-generated market signals",
  },
  {
    id: 5,
    name: "Manual Trader",
    icon: "☝",
    color: "yellow",
    description: "Trade manually with control",
  },
  {
    id: 6,
    name: "Bulk Trader",
    icon: "▱",
    color: "pink",
    description: "Prepare multiple trades",
  },
  {
    id: 7,
    name: "Copy Trader",
    icon: "♙",
    color: "cyan",
    description: "Follow selected traders",
  },
  {
    id: 8,
    name: "Analysis Tool",
    icon: "⌁",
    color: "purple",
    description: "Analyze market statistics",
  },
  {
    id: 9,
    name: "Chart",
    icon: "↗",
    color: "blue",
    description: "View market price movement",
  },
];

const initialDigits = [
  { digit: 0, value: 9.8 },
  { digit: 1, value: 11.3 },
  { digit: 2, value: 8.8 },
  { digit: 3, value: 10.2 },
  { digit: 4, value: 10.0 },
  { digit: 5, value: 8.4 },
  { digit: 6, value: 10.9 },
  { digit: 7, value: 10.2 },
  { digit: 8, value: 12.6 },
  { digit: 9, value: 7.8 },
];

function MiniWave() {
  return (
    <svg
      className="mini-wave"
      viewBox="0 0 220 80"
      preserveAspectRatio="none"
    >
      <polyline
        points="0,54 15,49 30,56 45,40 60,45 75,31 90,38 105,24 120,30 135,18 150,34 165,27 180,42 195,25 210,31 220,19"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}

function ChartLine({ points }) {
  if (!points || points.length === 0) return null;

  const min = Math.min(...points) - 0.5;
  const max = Math.max(...points) + 0.5;

  const width = 900;
  const height = 280;

  const coordinates = points
    .map((point, index) => {
      const x =
        (index / Math.max(points.length - 1, 1)) * width;

      const y =
        height -
        ((point - min) / Math.max(max - min, 0.001)) *
          height;

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      className="chart-svg"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <polyline
        points={coordinates}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default function HomePage() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [balanceOpen, setBalanceOpen] = useState(false);

  const [isLive, setIsLive] = useState(true);

  const [price, setPrice] = useState(734.44);
  const [change, setChange] = useState(2.35);
  const [confidence, setConfidence] = useState(72);

  const [lastDigit, setLastDigit] = useState(4);
  const [previousDigit, setPreviousDigit] = useState(8);

  const [evenCount, setEvenCount] = useState(512);
  const [oddCount, setOddCount] = useState(488);

  const [botRunning, setBotRunning] = useState(false);
  const [botStake, setBotStake] = useState(1);
  const [botDuration, setBotDuration] = useState(1);

  const [botResult, setBotResult] = useState(
    "Waiting for analysis"
  );

  const [ticks, setTicks] = useState([]);

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

  const [digits, setDigits] = useState(initialDigits);

  /*
   * Demonstration market stream.
   *
   * This intentionally does NOT claim to be a real Deriv
   * data connection. The Deriv WebSocket/API can be connected
   * later through the authentication/trading backend.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      const movement =
        (Math.random() - 0.48) * 0.55;

      setPrice((oldPrice) =>
        Number((oldPrice + movement).toFixed(2))
      );

      setChange((oldChange) =>
        Number(
          (
            oldChange +
            (Math.random() - 0.5) * 0.08
          ).toFixed(2)
        )
      );

      setConfidence((oldConfidence) => {
        const movement =
          Math.floor(Math.random() * 5) - 2;

        return Math.min(
          95,
          Math.max(50, oldConfidence + movement)
        );
      });

      const newDigit = Math.floor(
        Math.random() * 10
      );

      setPreviousDigit(lastDigit);
      setLastDigit(newDigit);

      if (newDigit % 2 === 0) {
        setEvenCount((value) => value + 1);
      } else {
        setOddCount((value) => value + 1);
      }

      setChartPoints((oldPoints) => {
        const last =
          oldPoints[oldPoints.length - 1];

        const next = Number(
          (
            last +
            (Math.random() - 0.48) * 0.65
          ).toFixed(2)
        );

        return [
          ...oldPoints.slice(1),
          next,
        ];
      });

      setDigits((oldDigits) =>
        oldDigits.map((item) => {
          let nextValue =
            item.value +
            (Math.random() - 0.5) * 0.45;

          nextValue = Math.max(
            5,
            Math.min(16, nextValue)
          );

          return {
            ...item,
            value: Number(
              nextValue.toFixed(1)
            ),
          };
        })
      );

      setTicks((oldTicks) => {
        const nextTick = {
          id: Date.now(),
          digit: newDigit,
          type:
            newDigit % 2 === 0
              ? "EVEN"
              : "ODD",
        };

        return [
          nextTick,
          ...oldTicks.slice(0, 9),
        ];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [lastDigit]);

  const evenPercentage = useMemo(() => {
    const total = evenCount + oddCount;

    if (!total) return 50;

    return Number(
      ((evenCount / total) * 100).toFixed(1)
    );
  }, [evenCount, oddCount]);

  const oddPercentage = useMemo(() => {
    const total = evenCount + oddCount;

    if (!total) return 50;

    return Number(
      ((oddCount / total) * 100).toFixed(1)
    );
  }, [evenCount, oddCount]);

  const strongestDigit = useMemo(() => {
    return [...digits].sort(
      (a, b) => b.value - a.value
    )[0];
  }, [digits]);

  const evenOddSignal = useMemo(() => {
    if (evenPercentage > oddPercentage) {
      return {
        direction: "EVEN",
        percentage: evenPercentage,
      };
    }

    return {
      direction: "ODD",
      percentage: oddPercentage,
    };
  }, [evenPercentage, oddPercentage]);

  function openTool(tool) {
    setSelectedTool(tool);
    setMenuOpen(false);
  }

  function closeTool() {
    setSelectedTool(null);
  }

  function login() {
    window.location.href =
      "/api/auth/login";
  }

  function runEvenOddBot() {
    if (botRunning) {
      setBotRunning(false);
      setBotResult("Bot stopped");
      return;
    }

    setBotRunning(true);
    setBotResult(
      `Analyzing ${botDuration} tick expiry...`
    );

    setTimeout(() => {
      const signal =
        evenPercentage >= oddPercentage
          ? "EVEN"
          : "ODD";

      setBotResult(
        `Analysis signal: ${signal}`
      );
    }, 1200);
  }

  return (
    <main className="dashboard">

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`sidebar ${
          menuOpen ? "sidebar-open" : ""
        }`}
      >
        <div className="brand">
          <div className="brand-mark">
            <span>D</span>
            <span>T</span>
          </div>

          <div>
            <div className="brand-name">
              DOLLARTRADERS
            </div>

            <div className="brand-subtitle">
              AI TRADING PLATFORM
            </div>
          </div>
        </div>

        <nav className="side-nav">
          <button
            className="side-link active"
            onClick={() => setMenuOpen(false)}
          >
            <span className="side-number home-icon">
              ⌂
            </span>

            <span className="side-text">
              <strong>Dashboard</strong>
              <small>Overview and market tools</small>
            </span>
          </button>

          {tools.map((tool) => (
            <button
              key={tool.id}
              className="side-link"
              onClick={() => openTool(tool)}
            >
              <span
                className={`side-number ${tool.color}`}
              >
                {tool.id}
              </span>

              <span className="side-text">
                <strong>{tool.name}</strong>
                <small>
                  {tool.description}
                </small>
              </span>

              <span className="side-arrow">
                ›
              </span>
            </button>
          ))}
        </nav>

        <div className="demo-box">
          <div className="demo-icon">
            ◈
          </div>

          <div>
            <strong>DEMO MODE</strong>

            <p>
              Market data shown here is for
              analysis/demo purposes.
            </p>
          </div>
        </div>
      </aside>

      {/* ================= MAIN AREA ================= */}

      <section className="main-area">

        {/* TOPBAR */}

        <header className="topbar">

          <button
            className="mobile-menu"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            aria-label="Open menu"
          >
            ☰
          </button>

          <div className="top-status">
            <span
              className={`status-dot ${
                isLive
                  ? "online"
                  : "offline"
              }`}
            />

            <strong>
              {isLive
                ? "MARKET LIVE"
                : "MARKET OFFLINE"}
            </strong>
          </div>

          <div className="top-actions">

            <button
              className="login-button"
              onClick={login}
            >
              <span>↪</span>
              Connect Deriv
            </button>

            <div className="dropdown-wrapper">
              <button
                className="top-account"
                onClick={() =>
                  setAccountOpen(
                    !accountOpen
                  )
                }
              >
                <span className="account-icon">
                  ♙
                </span>

                <span>
                  <small>Account</small>
                  <strong>
                    Demo Account
                  </strong>
                </span>

                <span>⌄</span>
              </button>

              {accountOpen && (
                <div className="dropdown">
                  <button onClick={login}>
                    Connect Deriv Account
                  </button>

                  <button>
                    Account Details
                  </button>

                  <button
                    onClick={() =>
                      setAccountOpen(false)
                    }
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

            <div className="dropdown-wrapper">
              <button
                className="balance-box"
                onClick={() =>
                  setBalanceOpen(
                    !balanceOpen
                  )
                }
              >
                <span>
                  <small>Balance</small>

                  <strong>
                    10,000.00 USD
                  </strong>
                </span>

                <span>⌄</span>
              </button>

              {balanceOpen && (
                <div className="dropdown balance-dropdown">
                  <div>
                    <small>
                      Demo Balance
                    </small>

                    <strong>
                      10,000.00 USD
                    </strong>
                  </div>

                  <div>
                    <small>
                      Profit/Loss
                    </small>

                    <strong className="green-text">
                      +0.00 USD
                    </strong>
                  </div>
                </div>
              )}
            </div>

            <div className="profile-circle">
              DT
            </div>
          </div>
        </header>

        {/* CONTENT */}

        <div className="content">

          {/* MARKET OVERVIEW */}

          <div className="top-grid">

            <section className="panel market-panel">

              <div className="panel-heading">
                <div>
                  <span className="green-chart-icon">
                    ⌁
                  </span>

                  <strong>
                    Market Overview
                  </strong>
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

                    <span className="up-arrow">
                      ↑
                    </span>
                  </div>

                  <div className="positive">
                    +
                    {change.toFixed(2)}
                    {" "}
                    (
                    {Math.abs(
                      change / 7.3
                    ).toFixed(2)}
                    %)
                  </div>
                </div>

                <div className="market-stats">

                  <div>
                    <small>High</small>
                    <strong>
                      735.62
                    </strong>
                  </div>

                  <div>
                    <small>Low</small>
                    <strong>
                      730.81
                    </strong>
                  </div>

                  <div>
                    <small>
                      24H Change
                    </small>

                    <strong className="green-text">
                      0.32%
                    </strong>
                  </div>
                </div>

                <MiniWave />

              </div>
            </section>

            {/* ACCOUNT OVERVIEW */}

            <section className="panel account-panel">

              <div className="panel-heading">
                <div>
                  <span className="purple-icon">
                    ♙
                  </span>

                  <strong>
                    Account Overview
                  </strong>
                </div>

                <span className="demo-label">
                  Demo
                </span>
              </div>

              <div className="account-grid">

                <div>
                  <small>Balance</small>

                  <strong className="green-text">
                    10,000.00 USD
                  </strong>
                </div>

                <div>
                  <small>
                    Profit/Loss
                  </small>

                  <strong className="green-text">
                    +0.00 USD
                  </strong>
                </div>

                <div>
                  <small>Equity</small>

                  <strong>
                    10,000.00 USD
                  </strong>
                </div>

                <div>
                  <small>Available</small>

                  <strong>
                    10,000.00 USD
                  </strong>
                </div>

              </div>

              <button
                className="account-details"
                onClick={login}
              >
                CONNECT ACCOUNT ↗
              </button>
            </section>
          </div>

          {/* EVEN ODD BOT */}

          <section className="panel even-odd-panel">

            <div className="even-odd-header">

              <div>
                <div className="section-title">
                  <span>⚡</span>
                  Even / Odd AI Bot
                </div>

                <p>
                  Digit parity analysis for
                  Volatility 100 (1s)
                </p>
              </div>

              <div className="bot-status">
                <span
                  className={`status-dot ${
                    botRunning
                      ? "online"
                      : "offline"
                  }`}
                />

                {botRunning
                  ? "BOT RUNNING"
                  : "BOT READY"}
              </div>
            </div>

            <div className="even-odd-grid">

              {/* SIGNAL */}

              <div className="eo-card signal-card">

                <small>
                  CURRENT AI SIGNAL
                </small>

                <div
                  className={`eo-signal ${
                    evenOddSignal.direction ===
                    "EVEN"
                      ? "even"
                      : "odd"
                  }`}
                >
                  {evenOddSignal.direction}
                </div>

                <strong>
                  {evenOddSignal.percentage}%
                  statistical share
                </strong>

                <p>
                  Based on the current
                  simulated tick sample.
                </p>
              </div>

              {/* EVEN */}

              <div className="eo-card">

                <div className="eo-title">
                  <span className="even-ball">
                    E
                  </span>

                  <strong>EVEN</strong>
                </div>

                <div className="eo-number">
                  {evenCount}
                </div>

                <div className="progress">
                  <i
                    style={{
                      width: `${evenPercentage}%`,
                    }}
                  />
                </div>

                <small>
                  {evenPercentage}%
                </small>
              </div>

              {/* ODD */}

              <div className="eo-card">

                <div className="eo-title">
                  <span className="odd-ball">
                    O
                  </span>

                  <strong>ODD</strong>
                </div>

                <div className="eo-number">
                  {oddCount}
                </div>

                <div className="progress">
                  <i
                    style={{
                      width: `${oddPercentage}%`,
                    }}
                  />
                </div>

                <small>
                  {oddPercentage}%
                </small>
              </div>

              {/* BOT CONTROLS */}

              <div className="eo-card controls-card">

                <label>
                  Stake
                  <input
       
