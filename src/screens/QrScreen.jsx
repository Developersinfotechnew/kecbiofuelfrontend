'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const ROI_URL = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/roi`
  : 'https://www.kecbiofuel.com/roi';

const QrScreen = () => {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pulseRing, setPulseRing] = useState(0);
  const [scanLine, setScanLine] = useState(false);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(ROI_URL)}&bgcolor=ffffff&color=1a6b2e&margin=12&qzone=2`;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => setPulseRing(p => p + 1), 2000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setScanLine(s => !s), 2400);
    return () => clearInterval(t);
  }, []);

  /* canvas particles */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const W = canvas.width = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;
    const particles = Array.from({ length: 34 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: 1 + Math.random() * 2.5,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -0.18 - Math.random() * 0.35,
      alpha: 0.12 + Math.random() * 0.28,
      color: Math.random() > 0.55 ? '#10b981' : '#f59e0b',
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
        if (p.x < -4) p.x = W + 4;
        if (p.x > W + 4) p.x = -4;
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleCopy = () => {
    navigator.clipboard?.writeText(ROI_URL).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .qr-page {
      min-height: 100vh;
      background: #071210;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: 'Poppins', system-ui, sans-serif;
      position: relative;
      overflow: hidden;
    }

    /* ── fixed grid (matches main app) ── */
    .qr-grid {
      position: fixed;
      inset: 0;
      background-image:
        linear-gradient(rgba(8,45,25,0.55) 1px, transparent 1px),
        linear-gradient(90deg, rgba(8,45,25,0.55) 1px, transparent 1px);
      background-size: 60px 60px;
      pointer-events: none;
      z-index: 0;
    }

    /* ── mesh glow ── */
    .qr-mesh {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse 80% 55% at 50% 0%, rgba(16,185,129,0.22) 0%, transparent 60%),
        radial-gradient(ellipse 55% 45% at 85% 85%, rgba(245,158,11,0.10) 0%, transparent 50%),
        radial-gradient(ellipse 45% 40% at 10% 55%, rgba(16,185,129,0.08) 0%, transparent 50%);
      pointer-events: none;
      z-index: 1;
    }

    .qr-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    /* ── HERO (matches screenshot exactly) ── */
    .qr-hero {
      position: relative;
      z-index: 2;
      width: 100%;
      max-width: 900px;
      padding: 56px 20px 48px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* logo pill */
    .qr-logo-pill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 8px 20px;
      border-radius: 9999px;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.13);
      margin-bottom: 18px;
    }
    .qr-logo-img {
      height: 30px;
      width: auto;
      object-fit: contain;
    }
    .qr-logo-fallback {
      width: 30px; height: 30px;
      border-radius: 8px;
      background: rgba(16,185,129,0.22);
      display: flex; align-items: center; justify-content: center;
      font-size: 14px;
    }
    .qr-logo-text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      line-height: 1.15;
    }
    .qr-logo-name {
      font-size: 16px;
      font-weight: 800;
      color: rgba(255,255,255,0.95);
      letter-spacing: 0.04em;
    }
    .qr-logo-sub {
      font-size: 12px;
      font-weight: 600;
      color: #10b981;
      letter-spacing: 0.06em;
    }

    /* amber badge — matches "INVESTOR INTELLIGENCE TOOL" pill */
    .qr-intel-badge {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 5px 16px;
      border-radius: 9999px;
      background: rgba(245,158,11,0.12);
      border: 1px solid rgba(245,158,11,0.35);
      color: #fbbf24;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    .qr-intel-badge-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: #f59e0b;
      box-shadow: 0 0 8px #f59e0b;
      animation: blink 2s ease-in-out infinite;
    }
    @keyframes blink {
      0%,100% { opacity:1; transform:scale(1); }
      50%      { opacity:0.5; transform:scale(1.4); }
    }

    /* big headline — gradient green matching screenshot */
    .qr-headline {
      font-size: clamp(56px, 12vw, 96px);
      font-weight: 900;
      line-height: 1.0;
      letter-spacing: -0.03em;
      background: linear-gradient(135deg, #34d399 0%, #10b981 40%, #6ee7b7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 10px;
    }

    .qr-engine-label {
      font-size: 15px;
      font-weight: 600;
      color: #f59e0b;
      letter-spacing: 0.05em;
      margin-bottom: 10px;
    }

    .qr-tagline {
      font-size: 14px;
      color: rgba(255,255,255,0.6);
      max-width: 400px;
      line-height: 1.75;
      margin-bottom: 36px;
    }

    /* stats row */
    .qr-stats-row {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 18px 44px;
      margin-bottom: 0;
    }
    .qr-stat-item { text-align: center; }
    .qr-stat-val {
      font-size: 24px;
      font-weight: 800;
      color: #f59e0b;
      text-shadow: 0 0 18px rgba(245,158,11,0.4);
      line-height: 1;
    }
    .qr-stat-lbl {
      font-size: 10px;
      color: rgba(255,255,255,0.5);
      font-weight: 500;
      letter-spacing: 0.04em;
      margin-top: 3px;
    }

    /* ── QR CARD ── */
    .qr-card-wrap {
      position: relative;
      z-index: 2;
      width: 100%;
      max-width: 440px;
      padding: 0 14px 64px;
    }

    .qr-card {
      background: rgba(7,18,13,0.80);
      border: 1px solid rgba(255,255,255,0.10);
      border-radius: 26px;
      padding: 32px 28px;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      box-shadow: 0 40px 90px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05);
      text-align: center;
      transform: translateY(28px);
      opacity: 0;
      transition: transform 0.72s cubic-bezier(.16,1,.3,1), opacity 0.72s ease;
    }
    .qr-card.in { transform: translateY(0); opacity: 1; }

    /* section label inside card */
    .qr-card-label {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 9999px;
      background: rgba(16,185,129,0.11);
      border: 1px solid rgba(16,185,129,0.25);
      color: #10b981;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 16px;
    }

    /* QR wrapper */
    .qr-wrapper {
      position: relative;
      display: inline-block;
      margin-bottom: 22px;
    }

    .qr-corner {
      position: absolute;
      width: 22px; height: 22px;
      border-color: #10b981;
      border-style: solid;
      border-width: 0;
    }
    .qr-corner.tl { top:-2px; left:-2px; border-top-width:3px; border-left-width:3px; border-top-left-radius:6px; }
    .qr-corner.tr { top:-2px; right:-2px; border-top-width:3px; border-right-width:3px; border-top-right-radius:6px; }
    .qr-corner.bl { bottom:-2px; left:-2px; border-bottom-width:3px; border-left-width:3px; border-bottom-left-radius:6px; }
    .qr-corner.br { bottom:-2px; right:-2px; border-bottom-width:3px; border-right-width:3px; border-bottom-right-radius:6px; }

    .qr-pulse {
      position: absolute;
      inset: -16px;
      border-radius: 20px;
      border: 1.5px solid rgba(16,185,129,0.35);
      animation: pulseRing 2s ease-out forwards;
      pointer-events: none;
    }
    @keyframes pulseRing {
      0%   { opacity:0.7; transform:scale(1); }
      100% { opacity:0;   transform:scale(1.18); }
    }

    .qr-scan {
      position: absolute;
      left: 6px; right: 6px;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(52,211,153,0.85), transparent);
      border-radius: 2px;
      pointer-events: none;
      transition: top 2.4s ease-in-out;
      box-shadow: 0 0 10px rgba(52,211,153,0.6);
    }

    .qr-img-box {
      background: #ffffff;
      border-radius: 16px;
      padding: 12px;
      display: inline-block;
      position: relative;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.35);
    }
    .qr-img-box img {
      display: block;
      border-radius: 8px;
      width: 200px;
      height: 200px;
    }

    /* stats inside card */
    .qr-card-stats {
      display: flex;
      gap: 1px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 14px;
      overflow: hidden;
      margin-bottom: 16px;
    }
    .qr-card-stat {
      flex: 1;
      padding: 12px 8px;
      position: relative;
    }
    .qr-card-stat + .qr-card-stat::before {
      content: '';
      position: absolute;
      left: 0; top: 15%; bottom: 15%;
      width: 1px;
      background: rgba(255,255,255,0.08);
    }
    .qr-card-stat-val {
      font-size: 17px;
      font-weight: 800;
      color: #34d399;
      line-height: 1;
      margin-bottom: 3px;
    }
    .qr-card-stat-lbl {
      font-size: 9px;
      font-weight: 600;
      color: rgba(255,255,255,0.38);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    /* instruction */
    .qr-instruction {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(16,185,129,0.07);
      border: 1px solid rgba(16,185,129,0.18);
      border-radius: 13px;
      padding: 11px 14px;
      margin-bottom: 14px;
      text-align: left;
    }
    .qr-instruction-icon { font-size: 20px; flex-shrink: 0; }
    .qr-instruction-strong {
      display: block;
      font-size: 12.5px;
      font-weight: 600;
      color: #86efac;
      margin-bottom: 2px;
    }
    .qr-instruction-hint {
      font-size: 11px;
      color: rgba(255,255,255,0.38);
    }

    /* copy button */
    .qr-copy-btn {
      width: 100%;
      padding: 14px 20px;
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      color: #ffffff;
      border: none;
      border-radius: 13px;
      font-family: 'Poppins', system-ui, sans-serif;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.02em;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.22s ease;
      box-shadow: 0 4px 20px rgba(5,150,105,0.35);
      position: relative;
      overflow: hidden;
    }
    .qr-copy-btn::before {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
      opacity: 0;
      transition: opacity 0.2s;
    }
    .qr-copy-btn:hover::before { opacity: 1; }
    .qr-copy-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(5,150,105,0.45); }
    .qr-copy-btn:active { transform: translateY(0); }
    .qr-copy-btn.copied {
      background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
      box-shadow: 0 4px 20px rgba(217,119,6,0.40);
    }

    /* url pill */
    .qr-url-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 14px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 9999px;
      padding: 5px 14px;
      font-size: 11px;
      color: rgba(255,255,255,0.3);
      word-break: break-all;
    }
    .qr-url-dot {
      width: 5px; height: 5px;
      border-radius: 50%;
      background: #10b981;
      flex-shrink: 0;
      box-shadow: 0 0 6px #10b981;
    }

    /* trust strip */
    .qr-trust {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px 28px;
      margin-top: 18px;
      padding-bottom: 8px;
    }
    .qr-trust-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 500;
      color: rgba(255,255,255,0.45);
    }
    .qr-trust-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 6px rgba(16,185,129,0.6);
      flex-shrink: 0;
    }

    @media (max-width: 400px) {
      .qr-card { padding: 24px 18px; }
      .qr-img-box img { width: 170px; height: 170px; }
      .qr-headline { font-size: clamp(44px, 14vw, 72px); }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="qr-page">

        {/* bg layers */}
        <div className="qr-grid" />
        <div className="qr-mesh" />
        <canvas ref={canvasRef} className="qr-canvas" />

        {/* ── HERO — matches screenshot ── */}
        <div className="qr-hero">

          {/* KEC logo pill */}
          <div className="qr-logo-pill">
            <Image
              src="/images/kec-logo.png"
              alt="KEC"
              width={800}
              height={600}
              className="qr-logo-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
                }}
              />
            <div className="qr-logo-fallback" style={{ display: 'none' }}>🌿</div>
            <div className="qr-logo-text">
              <span className="qr-logo-name">KEC</span>
              <span className="qr-logo-sub">Biofuel</span>
            </div>
          </div>

          {/* amber "INVESTOR INTELLIGENCE TOOL" badge */}
          <div className="qr-intel-badge">
            <span className="qr-intel-badge-dot" />
            ✦ &nbsp;Investor Intelligence Tool
          </div>

          {/* giant gradient headline */}
          <h1 className="qr-headline">BioPulse AI</h1>

          <p className="qr-engine-label">AI Feasibility Engine</p>
          <p className="qr-tagline">
            Get an AI-generated investment forecast for your CBG plant in under 60 seconds.
          </p>

          {/* stats */}
          <div className="qr-stats-row">
            {[
              ['100+', 'Plants Built'],
              ['₹500Cr+', 'Investments'],
              ['30%', 'NABARD Subsidy'],
              ['95%', 'Plant Uptime'],
            ].map(([v, l]) => (
              <div key={l} className="qr-stat-item">
                <div className="qr-stat-val">{v}</div>
                <div className="qr-stat-lbl">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── QR CARD ── */}
        <div className="qr-card-wrap">
          <div className={`qr-card${mounted ? ' in' : ''}`}>

            <div className="qr-card-label">
              📱 Scan to Access
            </div>

            {/* QR code */}
            <div className="qr-wrapper">
              {[0, 1].map(i => (
                <div
                  key={`${pulseRing}-${i}`}
                  className="qr-pulse"
                  style={{ animationDelay: `${i * 0.35}s` }}
                />
              ))}
              <div
                className="qr-scan"
                style={{ top: scanLine ? 'calc(100% - 4px)' : '4px' }}
              />
              <div className="qr-corner tl" />
              <div className="qr-corner tr" />
              <div className="qr-corner bl" />
              <div className="qr-corner br" />
              <div className="qr-img-box">
                <Image
                  src={qrSrc}
                  alt="QR Code — KEC BioPulse AI"
                  width={800}
                  height={600}
                />
              </div>
            </div>

            {/* mini stats */}
            <div className="qr-card-stats">
              {[
                { val: 'AI', lbl: 'Powered' },
                { val: '60s', lbl: 'Report' },
                { val: 'Free', lbl: 'Analysis' },
              ].map(s => (
                <div key={s.lbl} className="qr-card-stat">
                  <div className="qr-card-stat-val">{s.val}</div>
                  <div className="qr-card-stat-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>

            {/* instruction */}
            <div className="qr-instruction">
              <span className="qr-instruction-icon">📱</span>
              <div>
                <span className="qr-instruction-strong">Point your camera at the QR code</span>
                <span className="qr-instruction-hint">Works with any smartphone or QR scanner app</span>
              </div>
            </div>
          </div>

          {/* trust strip */}
          <div className="qr-trust">
            {['100+ Plants Built', 'SATAT Registered', 'NABARD Empanelled', 'EPC + O&M Guarantee'].map(t => (
              <div key={t} className="qr-trust-item">
                <span className="qr-trust-dot" />
                {t}
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
};

export default QrScreen;