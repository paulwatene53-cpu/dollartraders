"use client";

import { useEffect, useMemo, useState } from "react";

const MAX_TICKS = 100;

export default function EvenOddBot() {
  const [ticks, setTicks] = useState([]);
  const [running, setRunning] = useState(false);
  const [stake, setStake] = useState("1.00");
  const [minConfidence, setMinConfidence] = useState(70);
  const [signal, setSignal] = useState("WAIT");
  const [confidence, setConfidence] = useState(0);
  const [lastDigit, setLastDigit] = useState(null);
  const [message, setMessage] = useState(
    "Waiting for market data..."
  );

  // Demo tick generator.
  // Replace this later with the live Deriv WebSocket connection.
  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      const digit = Math.floor(Math.random() * 10);

      setLastDigit(digit);

      setTicks((previous) => {
        const next = [...previous, digit];
        return next.slice(-MAX_TICKS);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running]);

  const statistics = useMemo(() => {
    const total = ticks.length;

    if (total === 0) {
      return {
        total: 0,
        even: 0,
        odd: 0,
        evenPercent: 0,
        oddPercent: 0,
      };
    }

    const even = ticks.filter((digit) => digit % 2 === 0).length;
    const odd = total - even;

    return {
      total,
      even,
      odd,
      evenPercent: (even / total) * 100,
      oddPercent: (odd / total) * 100,
    };
  }, [ticks]);

  // Generate the analysis signal.
  useEffect(() => {
    if (ticks.length < 10) {
      setSignal("WAIT");
      setConfidence(0);
      setMessage("Collecting more ticks...");
      return;
    }

    const difference = Math.abs(
      statistics.evenPercent - statistics.oddPercent
    );

    /*
     * This is a statistical filter, NOT a guarantee of winning.
     *
     * Confidence is deliberately capped below 95%.
     * A high historical percentage does not guarantee the next tick.
     */
    const calculatedConfidence = Math.min(
      94,
      50 + difference
    );

    setConfidence(Number(calculatedConfidence.toFixed(1)));

    if (calculatedConfidence >= Number(minConfidence)) {
      if (statistics.evenPercent > statistics.oddPercent) {
        setSignal("EVEN");
        setMessage(
          "Historical sample currently favors EVEN."
        );
      } else if (statistics.oddPercent > statistics.evenPercent) {
        setSignal("ODD");
        setMessage(
          "Historical sample currently favors ODD."
        );
      } else {
        setSignal("WAIT");
        setMessage("The market is currently balanced.");
      }
    } else {
      setSignal("WAIT");
      setMessage(
        "Confidence is below your selected threshold."
      );
    }
  }, [ticks, statistics, minConfidence]);

  const clearHistory = () => {
    setTicks([]);
    setLastDigit(null);
    setSignal("WAIT");
    setConfidence(0);
    setMessage("History cleared. Waiting for new ticks...");
  };

  const toggleBot = () => {
    setRunning((value) => !value);
  };

  const evenWidth = `${statistics.evenPercent}%`;
  const oddWidth = `${statistics.oddPercent}%`;

  return (
    <section className="eo-bot">
      <div className="eo-header">
        <div>
          <div className="eo-kicker">
            AI DIGIT ANALYZER
          </div>

          <h2>Even / Odd Bot</h2>

          <p>
            Statistical analysis of recent last digits.
          </p>
        </div>

        <div className={`eo-status ${running ? "online" : ""}`}>
          <span />
          {running ? "RUNNING" : "STOPPED"}
        </div>
      </div>

      <div className="eo-grid">
        {/* Market data */}
        <div className="eo-card">
          <div className="eo-card-title">
            <span>Market Data</span>
            <span className="eo-live">
              {running ? "LIVE" : "DEMO"}
            </span>
          </div>

          <div className="eo-last-digit">
            <span>LAST DIGIT</span>

            <strong>
              {lastDigit === null ? "-" : lastDigit}
            </strong>

            {lastDigit !== null && (
              <small>
                {lastDigit % 2 === 0 ? "EVEN" : "ODD"}
              </small>
            )}
          </div>

          <div className="eo-stat-row">
            <div>
              <span>Total ticks</span>
              <strong>{statistics.total}</strong>
            </div>

            <div>
              <span>Even</span>
              <strong>
                {statistics.evenPercent.toFixed(1)}%
              </strong>
            </div>

            <div>
              <span>Odd</span>
              <strong>
                {statistics.oddPercent.toFixed(1)}%
              </strong>
            </div>
          </div>
        </div>

        {/* Signal */}
        <div className="eo-card eo-signal-card">
          <div className="eo-card-title">
            <span>Bot Signal</span>
            <span className="eo-ai">AI</span>
          </div>

          <div
            className={`eo-signal ${
              signal === "EVEN"
                ? "even"
                : signal === "ODD"
                ? "odd"
                : "wait"
            }`}
          >
            {signal}
          </div>

          <div className="eo-confidence">
            <div className="eo-confidence-top">
              <span>Confidence</span>
              <strong>{confidence}%</strong>
            </div>

            <div className="eo-progress">
              <div
                style={{
                  width: `${Math.min(confidence, 100)}%`,
                }}
              />
            </div>
          </div>

          <p className="eo-message">{message}</p>
        </div>

        {/* Controls */}
        <div className="eo-card">
          <div className="eo-card-title">
            <span>Bot Settings</span>
          </div>

          <label className="eo-label">
            Minimum confidence
            <div className="eo-input-row">
              <input
                type="range"
                min="50"
                max="90"
                step="1"
                value={minConfidence}
                onChange={(event) =>
                  setMinConfidence(
                    Number(event.target.value)
                  )
                }
              />

              <strong>{minConfidence}%</strong>
            </div>
          </label>

          <label className="eo-label">
            Stake

            <input
              className="eo-input"
              type="number"
              min="0.35"
              step="0.01"
              value={stake}
              onChange={(event) =>
                setStake(event.target.value)
              }
            />
          </label>

          <div className="eo-buttons">
            <button
              className={`eo-main-button ${
                running ? "stop" : "start"
              }`}
              onClick={toggleBot}
            >
              {running ? "STOP BOT" : "START DEMO BOT"}
            </button>

            <button
              className="eo-clear-button"
              onClick={clearHistory}
            >
              CLEAR
            </button>
          </div>
        </div>

        {/* Frequency */}
        <div className="eo-card eo-frequency">
          <div className="eo-card-title">
            <span>Even / Odd Distribution</span>
            <span>Last {MAX_TICKS} ticks</span>
          </div>

          <div className="eo-bar-row">
            <div className="eo-bar-label">
              <span>EVEN</span>
              <strong>
                {statistics.evenPercent.toFixed(1)}%
              </strong>
            </div>

            <div className="eo-bar">
              <div style={{ width: evenWidth }} />
            </div>
          </div>

          <div className="eo-bar-row">
            <div className="eo-bar-label">
              <span>ODD</span>
              <strong>
                {statistics.oddPercent.toFixed(1)}%
              </strong>
            </div>

            <div className="eo-bar">
              <div style={{ width: oddWidth }} />
            </div>
          </div>

          <div className="eo-digit-list">
            {Array.from({ length: 10 }, (_, digit) => {
              const count = ticks.filter(
                (value) => value === digit
              ).length;

              const percentage =
                statistics.total > 0
                  ? (count / statistics.total) * 100
                  : 0;

              return (
                <div
                  className="eo-digit"
                  key={digit}
                >
                  <strong>{digit}</strong>

                  <span>{count}</span>

                  <small>
                    {percentage.toFixed(1)}%
                  </small>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="eo-warning">
        <strong>⚠ Risk notice:</strong>{" "}
        This bot provides statistical signals only. It
        does not guarantee a winning trade or a 95% win
        rate. Historical digit frequency cannot guarantee
        the next digit. Keep trading in demo mode while
        testing the strategy.
      </div>

      <style jsx>{`
        .eo-bot {
          width: 100%;
          margin-top: 24px;
          padding: 24px;
          border: 1px solid rgba(0, 255, 150, 0.18);
          border-radius: 20px;
          background:
            radial-gradient(
              circle at top right,
              rgba(0, 255, 150, 0.08),
              transparent 35%
            ),
            #071019;
          color: #f4f7fb;
          box-sizing: border-box;
        }

        .eo-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 22px;
        }

        .eo-kicker {
          color: #00e58a;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
          margin-bottom: 6px;
        }

        .eo-header h2 {
          margin: 0;
          font-size: 26px;
          font-weight: 800;
        }

        .eo-header p {
          margin: 7px 0 0;
          color: #8f9aaa;
          font-size: 13px;
        }

        .eo-status {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border: 1px solid #26313d;
          border-radius: 999px;
          color: #87919d;
          font-size: 11px;
          font-weight: 800;
        }

        .eo-status span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #64707c;
        }

        .eo-status.online {
          color: #00e58a;
          border-color: rgba(0, 229, 138, 0.3);
        }

        .eo-status.online span {
          background: #00e58a;
          box-shadow: 0 0 10px #00e58a;
        }

        .eo-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .eo-card {
          padding: 18px;
          border: 1px solid #1b2732;
          border-radius: 16px;
          background: rgba(8, 17, 27, 0.9);
        }

        .eo-card-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          color: #cdd5df;
          font-size: 13px;
          font-weight: 700;
        }

        .eo-live {
          color: #00e58a;
          font-size: 10px;
        }

        .eo-ai {
          color: #a855f7;
          font-weight: 900;
        }

        .eo-last-digit {
          text-align: center;
          padding: 8px 0 18px;
        }

        .eo-last-digit span {
          display: block;
          color: #718091;
          font-size: 10px;
          letter-spacing: 1.5px;
        }

        .eo-last-digit strong {
          display: block;
          margin: 3px 0;
          font-size: 54px;
          line-height: 1;
        }

        .eo-last-digit small {
          color: #00e58a;
          font-weight: 800;
        }

        .eo-stat-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .eo-stat-row div {
          padding: 10px;
          border-radius: 10px;
          background: #0d1823;
          text-align: center;
        }

        .eo-stat-row span {
          display: block;
          color: #718091;
          font-size: 10px;
          margin-bottom: 5px;
        }

        .eo-stat-row strong {
          font-size: 14px;
        }

        .eo-signal {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 90px;
          border-radius: 14px;
          font-size: 32px;
          font-weight: 900;
          letter-spacing: 1px;
          margin-bottom: 18px;
          background: #111b25;
        }

        .eo-signal.even {
          color: #00e58a;
          border: 1px solid rgba(0, 229, 138, 0.35);
        }

        .eo-signal.odd {
          color: #a855f7;
          border: 1px solid rgba(168, 85, 247, 0.35);
        }

        .eo-signal.wait {
          color: #aeb8c4;
          border: 1px solid #27333f;
        }

        .eo-confidence-top {
          display: flex;
          justify-content: space-between;
          color: #8894a2;
          font-size: 12px;
        }

        .eo-confidence-top strong {
          color: #fff;
        }

        .eo-progress {
          height: 7px;
          margin-top: 8px;
          border-radius: 999px;
          overflow: hidden;
          background: #1c2732;
        }

        .eo-progress div {
          height: 100%;
          border-radius: inherit;
          background: #00e58a;
          transition: width 0.3s ease;
        }

        .eo-message {
          margin: 15px 0 0;
          color: #8d99a6;
          font-size: 12px;
          line-height: 1.5;
        }

        .eo-label {
          display: block;
          color: #8793a0;
          font-size: 12px;
          margin-bottom: 15px;
        }

        .eo-input-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 9px;
        }

        .eo-input-row input {
          width: 100%;
        }

        .eo-input-row strong {
          min-width: 42px;
          color: #00e58a;
        }

        .eo-input {
          width: 100%;
          box-sizing: border-box;
          margin-top: 8px;
          padding: 11px;
          border: 1px solid #26323e;
          border-radius: 9px;
          outline: none;
          background: #0b151f;
          color: white;
        }

        .eo-buttons {
          display: flex;
          gap: 9px;
          margin-top: 18px;
        }

        .eo-main-button,
        .eo-clear-button {
          flex: 1;
          border: 0;
          border-radius: 9px;
          padding: 12px 8px;
          font-weight: 800;
          cursor: pointer;
        }

        .eo-main-button.start {
          background: #00c982;
          color: #00140d;
        }

        .eo-main-button.stop {
          background: #7f1d1d;
          color: #fff;
        }

        .eo-clear-button {
          background: #18232e;
          color: #cbd5df;
          border: 1px solid #2a3743;
        }

        .eo-frequency {
          grid-column: 1 / -1;
        }

        .eo-bar-row {
          margin-bottom: 14px;
        }

        .eo-bar-label {
          display: flex;
          justify-content: space-between;
          color: #b9c3ce;
          font-size: 11px;
          margin-bottom: 6px;
        }

        .eo-bar-label strong {
          color: #fff;
        }

        .eo-bar {
          width: 100%;
          height: 9px;
          overflow: hidden;
          border-radius: 999px;
          background: #1b2631;
        }

        .eo-bar div {
          height: 100%;
          border-radius: inherit;
          background: #00e58a;
          transition: width 0.3s ease;
        }

        .eo-bar-row:nth-child(3) .eo-bar div {
          background: #a855f7;
        }

        .eo-digit-list {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          gap: 7px;
          margin-top: 18px;
        }

        .eo-digit {
          min-width: 0;
          padding: 10px 5px;
          border: 1px solid #202d39;
          border-radius: 9px;
          background: #0b151f;
          text-align: center;
        }

        .eo-digit strong {
          display: block;
          font-size: 15px;
        }

        .eo-digit span,
        .eo-digit small {
          display: block;
          color: #768392;
          font-size: 9px;
          margin-top: 4px;
        }

        .eo-warning {
          margin-top: 15px;
          padding: 12px 14px;
          border: 1px solid rgba(245, 158, 11, 0.22);
          border-radius: 10px;
          background: rgba(245, 158, 11, 0.06);
          color: #aeb8c4;
          font-size: 11px;
          line-height: 1.5;
        }

        .eo-warning strong {
          color: #f59e0b;
        }

        @media (max-width: 800px) {
          .eo-grid {
            grid-template-columns: 1fr;
          }

          .eo-frequency {
            grid-column: auto;
          }

          .eo-digit-list {
            grid-template-columns: repeat(5, 1fr);
          }
        }

        @media (max-width: 480px) {
          .eo-bot {
            padding: 15px;
            border-radius: 15px;
          }

          .eo-header {
            flex-direction: column;
          }

          .eo-stat-row {
            grid-template-columns: 1fr;
          }

          .eo-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
         }
