import React, { useState, useEffect, useRef } from 'react'
import Seal from './Seal.jsx'
import './ImpactFinal.css'

const PILLARS = [
  { icon: '📚', title: 'Padronização pedagógica',       desc: 'Processo unificado em toda a escola, do professor à direção.' },
  { icon: '⚡', title: 'Automação de processos',        desc: 'Criação, aplicação e correção de provas sem trabalho manual.' },
  { icon: '📈', title: 'Monitoramento da evolução',     desc: 'Acompanhamento por aluno, turma, habilidade e avaliação.' },
  { icon: '🎯', title: 'Alinhamento à BNCC',            desc: 'Todas as avaliações conectadas às habilidades da base nacional.' },
  { icon: '🏫', title: 'Gestão baseada em dados',       desc: 'A direção toma decisões pedagógicas com informação real.' },
  { icon: '❤️', title: 'Impacto educacional real',      desc: 'Escolas públicas que evoluem com dados, não com intuição.' },
]

const COUNTERS = [
  { target: 500,  suffix: '+', label: 'alunos impactados',       duration: 1800 },
  { target: 25,   suffix: '',  label: 'turmas gerenciadas',       duration: 1200 },
  { target: 90,   suffix: '%', label: 'menos tempo na correção',  duration: 1500 },
  { target: 100,  suffix: '%', label: 'alinhado à BNCC',          duration: 1000 },
]

function useCountUp(target, duration, active) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(ease * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])
  return val
}

function Counter({ target, suffix, label, duration, active }) {
  const val = useCountUp(target, duration, active)
  return (
    <div className="counter-card">
      <span className="counter-value">{val}{suffix}</span>
      <span className="counter-label">{label}</span>
    </div>
  )
}

function Confetti({ active }) {
  const canvasRef = useRef(null)
  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    canvas.width  = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const COLORS = ['#2563EB', '#60A5FA', '#F59E0B', '#10B981', '#DBEAFE', '#FEF3C7']
    const pieces = Array.from({ length: 80 }, () => ({
      x:   Math.random() * canvas.width,
      y:  -Math.random() * canvas.height,
      w:   6 + Math.random() * 8,
      h:   10 + Math.random() * 14,
      rot: Math.random() * 360,
      spd: 2 + Math.random() * 3,
      sw:  (Math.random() - 0.5) * 1.5,
      sr:  (Math.random() - 0.5) * 6,
      col: COLORS[Math.floor(Math.random() * COLORS.length)],
    }))

    let raf
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pieces.forEach(p => {
        ctx.save()
        ctx.translate(p.x + p.w / 2, p.y + p.h / 2)
        ctx.rotate((p.rot * Math.PI) / 180)
        ctx.fillStyle = p.col
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
        p.y   += p.spd
        p.x   += p.sw
        p.rot += p.sr
        if (p.y > canvas.height) { p.y = -20; p.x = Math.random() * canvas.width }
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    const stop = setTimeout(() => cancelAnimationFrame(raf), 5000)
    return () => { cancelAnimationFrame(raf); clearTimeout(stop) }
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      className="confetti-canvas"
      aria-hidden="true"
    />
  )
}

export default function ImpactFinal({ totalXp = 0, journeyComplete = false }) {
  const sectionRef  = useRef(null)
  const [visible, setVisible] = useState(false)
  const [sealMsg, setSealMsg] = useState(0)

  const MESSAGES = [
    'Você completou a jornada! 🎉',
    'Isso é transformação educacional de verdade!',
    'Escolas públicas merecem o melhor!',
  ]

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const t = setInterval(() => setSealMsg(m => (m + 1) % MESSAGES.length), 3000)
    return () => clearInterval(t)
  }, [visible])

  const xpPercent = Math.min(Math.round((totalXp / 200) * 100), 100)

  return (
    <section className="impact-final" ref={sectionRef} id="impacto">
      {visible && <Confetti active={visible} />}

      <div className="impact-final-inner">

        {/* Seal celebrate */}
        <div className="final-seal-row">
          <div className="final-seal-bubble">{MESSAGES[sealMsg]}</div>
          <Seal mood="celebrate" size={180} />
        </div>

        {/* Title */}
        <div className="final-header">
          <div className="final-eyebrow">Resultado</div>
          <h2 className="final-title">O impacto gerado</h2>
          <p className="final-sub">
            Mais do que digitalizar processos, a CJR permitiu que escolas
            públicas tomassem decisões pedagógicas baseadas em dados,
            ampliando sua capacidade de acompanhar a evolução dos alunos. 
            Tudo isso foi possível pelo Sistema Mais Gestão, desenvolvido pela 
            Empresa Júnior de Computação - CJR
          </p>
        </div>

        {/* Counters */}
        <div className="counters-grid">
          {COUNTERS.map((c, i) => (
            <Counter key={i} {...c} active={visible} />
          ))}
        </div>

        {/* Pillars */}
        <div className="pillars-grid">
          {PILLARS.map((p, i) => (
            <div
              className="pillar-card"
              key={i}
              style={{ animationDelay: visible ? `${i * 0.08}s` : '0s' }}
            >
              <span className="pillar-icon">{p.icon}</span>
              <strong className="pillar-title">{p.title}</strong>
              <p className="pillar-desc">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* XP final */}
        <div className="final-xp-card">
          <div className="fxp-left">
            <div className="fxp-label">Sua pontuação de explorador</div>
            <div className="fxp-value">{totalXp} XP</div>
          </div>
          <div className="fxp-right">
            <div className="fxp-track">
              <div className="fxp-fill" style={{ width: `${xpPercent}%` }} />
            </div>
            <div className="fxp-pct">{xpPercent}% da jornada</div>
          </div>
          {xpPercent >= 100 && (
            <div className="fxp-badge">Explorador completo!</div>
          )}
        </div>

        {/* Closing quote */}
        <blockquote className="final-quote">
          "O Sistema Mais Gestão transformou a forma como escolas públicas avaliam e acompanham
          o aprendizado de seus alunos."
          <cite>CJR - Empresa Júnior de Computação</cite>
        </blockquote>

        {/* CTA */}
        <div className="final-cta">
          <a href="#impactometro" className="btn-restart">
            ↩ Revisar a jornada
          </a>
        </div>

      </div>
    </section>
  )
}
