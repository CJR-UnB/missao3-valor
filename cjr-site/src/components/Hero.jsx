import React, { useState, useEffect } from 'react'
import Seal from './Seal.jsx'
import './Hero.css'

const STATS = [
  { value: '500+', label: 'alunos impactados' },
  { value: '25',   label: 'turmas gerenciadas' },
  { value: '90%',  label: 'menos tempo na correção' },
  { value: '100%', label: 'alinhado à BNCC' },
]

const SEAL_MESSAGES = [
  'Olá! Sou a Focatia, mascote da CJR 👋',
  'Vou te guiar pela transformação educacional!',
  'Pronto para descobrir o impacto?',
]

export default function Hero({ onStartJourney }) {
  const [msgIndex, setMsgIndex]   = useState(0)
  const [visible,  setVisible]    = useState(true)
  const [xp,       setXp]         = useState(0)
  const [hovered,  setHovered]    = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setMsgIndex(i => (i + 1) % SEAL_MESSAGES.length)
        setVisible(true)
      }, 300)
    }, 3200)
    return () => clearInterval(t)
  }, [])

  const handleSealClick = () => {
    setXp(x => Math.min(x + 10, 100))
  }

  return (
    <section className="hero">
      {/* Nav */}
      <nav className="hero-nav">
        <div className="hero-nav-logo">
          <span className="logo-badge">CJR</span>
          <span className="logo-text">Educação</span>
        </div>
        <div className="hero-nav-xp" title="Seu XP de explorador">
          <span className="xp-label">XP</span>
          <div className="xp-bar-track">
            <div className="xp-bar-fill" style={{ width: `${xp}%` }} />
          </div>
          <span className="xp-val">{xp}</span>
        </div>
      </nav>

      {/* Background blobs */}
      <div className="hero-blob hero-blob-1" aria-hidden="true" />
      <div className="hero-blob hero-blob-2" aria-hidden="true" />

      <div className="hero-inner">
        {/* Left: copy */}
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            Transformação educacional
          </div>

          <h1 className="hero-headline">
            A escola do futuro<br />
            <span className="hero-highlight">começa na avaliação</span>
          </h1>

          <p className="hero-sub">
            Da criação da prova à analise de desempenho: a CJR transformou a 
            forma como a gestão das escolas públicas funciona na prática, otimizando tempo
            e esforço dos educadores.
          </p>

          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() => { setXp(x => Math.min(x + 20, 100)); onStartJourney?.() }}
            >
              Iniciar a jornada
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>

          {/* XP hint */}
          {xp > 0 && (
            <div className="xp-toast">
              +{xp} XP - continue explorando para desbloquear o impacto completo!
            </div>
          )}
        </div>

        {/* Right: seal + stats */}
        <div className="hero-visual">
          {/* Speech bubble */}
          <div className={`seal-bubble ${visible ? 'bubble-in' : 'bubble-out'}`}>
            {SEAL_MESSAGES[msgIndex]}
          </div>

          {/* Seal */}
          <div
            className={`seal-clickable ${hovered ? 'seal-hovered' : ''}`}
            onClick={handleSealClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            title="Clique na Focatia para ganhar XP!"
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && handleSealClick()}
            aria-label="Focatia, mascote da CJR. Clique para ganhar XP."
          >
            <Seal mood={hovered ? 'excited' : 'wave'} size={160} />
            <div className="seal-click-hint">clique na Focatia!</div>
          </div>

          {/* Stats grid */}
          <div className="stats-grid">
            {STATS.map((s, i) => (
              <div className="stat-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="scroll-cue" aria-hidden="true">
        <div className="scroll-line" />
        <span>rolar para explorar</span>
      </div>
    </section>
  )
}
