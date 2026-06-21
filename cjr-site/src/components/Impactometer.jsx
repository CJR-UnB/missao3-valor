import React, { useState, useEffect, useRef } from 'react'
import Seal from './Seal.jsx'
import './Impactometer.css'

const STEPS = [
  {
    id: 0,
    emoji: '📝',
    title: 'Criação da prova',
    sealMood: 'think',
    sealSays: 'Antes, isso tomava horas do professor...',
    xpReward: 15,
    before: [
      { icon: '🔍', text: 'Procurar questões em arquivos e cadernos' },
      { icon: '✅', text: 'Verificar habilidades manualmente' },
      { icon: '📄', text: 'Montar o documento do zero' },
      { icon: '⏱️', text: 'Horas de trabalho por avaliação' },
    ],
    after: [
      { icon: '🎯', text: 'Seleciona habilidades da BNCC' },
      { icon: '🗄️', text: 'Banco de questões pré-cadastradas' },
      { icon: '⚡', text: 'Sistema gera a prova automaticamente' },
      { icon: '🚀', text: 'Pronto em minutos' },
    ],
    timeSaved: '4h → 8min',
  },
  {
    id: 1,
    emoji: '📋',
    title: 'Aplicação',
    sealMood: 'wave',
    sealSays: 'A aplicação também mudou muito!',
    xpReward: 15,
    before: [
      { icon: '🖨️', text: 'Impressão manual sem padrão' },
      { icon: '❌', text: 'Nenhum controle de versão' },
      { icon: '✍️', text: 'Gabaritos feitos à mão' },
      { icon: '😰', text: 'Risco de erros e retrabalho' },
    ],
    after: [
      { icon: '💻', text: 'Aplicação digital ou impressão pelo sistema' },
      { icon: '🔄', text: 'Controle de versões automático' },
      { icon: '🏷️', text: 'Gabarito com código de identificação' },
      { icon: '✅', text: 'Processo padronizado em toda a escola' },
    ],
    timeSaved: 'Zero retrabalho',
  },
  {
    id: 2,
    emoji: '🔍',
    title: 'Correção',
    sealMood: 'scan',
    sealSays: 'Essa é a parte mais incrível — veja só!',
    xpReward: 20,
    before: [
      { icon: '📚', text: 'Pilha de provas para corrigir' },
      { icon: '😓', text: 'Questão por questão, aluno por aluno' },
      { icon: '📊', text: 'Notas lançadas manualmente em planilhas' },
      { icon: '📅', text: 'Dias de trabalho por turma' },
    ],
    after: [
      { icon: '📷', text: 'Scanner lê o gabarito automaticamente' },
      { icon: '🤖', text: 'Sistema compara respostas' },
      { icon: '⚡', text: 'Nota gerada em 0,3 segundos' },
      { icon: '🎯', text: 'Zero margem de erro humano' },
    ],
    timeSaved: 'Dias → segundos',
    hasAnimation: true,
  },
  {
    id: 3,
    emoji: '📈',
    title: 'Gestão pedagógica',
    sealMood: 'celebrate',
    sealSays: 'Agora a escola toma decisões com dados reais!',
    xpReward: 25,
    before: [
      { icon: '📊', text: 'Notas espalhadas em planilhas' },
      { icon: '👁️', text: 'Direção via apenas a nota final' },
      { icon: '📉', text: 'Nenhuma visão sobre habilidades' },
      { icon: '❌', text: 'Sem padronização entre turmas' },
    ],
    after: [
      { icon: '📊', text: 'Dashboards automáticos de desempenho' },
      { icon: '👤', text: 'Visão por aluno, turma e habilidade' },
      { icon: '📈', text: 'Evolução acompanhada em tempo real' },
      { icon: '🏫', text: 'Processo unificado em toda a escola' },
    ],
    timeSaved: 'Dados em tempo real',
  },
]

function ScannerAnimation() {
  const [scanning, setScanning] = useState(false)
  const [done, setDone]         = useState(false)

  const handleScan = () => {
    if (scanning || done) return
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      setDone(true)
    }, 2000)
  }

  return (
    <div className="scanner-demo">
      <div className={`scanner-sheet ${scanning ? 'scanning' : ''} ${done ? 'done' : ''}`}>
        <div className="sheet-lines">
          {[85, 70, 90, 60, 75, 80, 65].map((w, i) => (
            <div key={i} className="sheet-line" style={{ width: `${w}%` }} />
          ))}
        </div>
        {scanning && <div className="scanner-beam" />}
        {done && (
          <div className="scanner-checkmark">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        )}
      </div>
      {!done ? (
        <button
          className={`scan-btn ${scanning ? 'scanning' : ''}`}
          onClick={handleScan}
          disabled={scanning}
        >
          {scanning ? '⚡ Escaneando...' : '📷 Escanear gabarito'}
        </button>
      ) : (
        <div className="scan-result">
          ✓ Nota gerada: <strong>8,5</strong> — processado em 0,3s
        </div>
      )}
    </div>
  )
}

export default function Impactometer({ totalXp, onXpGain }) {
  const [current,   setCurrent]   = useState(0)
  const [unlocked,  setUnlocked]  = useState([0])
  const [completed, setCompleted] = useState([])
  const [showSide,  setShowSide]  = useState('before')
  const sectionRef = useRef(null)

  const step = STEPS[current]

  const goTo = (idx) => {
    if (!unlocked.includes(idx)) return
    setCurrent(idx)
    setShowSide('before')
  }

  const advance = () => {
    if (!completed.includes(current)) {
      setCompleted(p => [...p, current])
      onXpGain?.(step.xpReward)
    }
    const next = current + 1
    if (next < STEPS.length) {
      setUnlocked(p => p.includes(next) ? p : [...p, next])
      setCurrent(next)
      setShowSide('before')
    }
  }

  const isLast = current === STEPS.length - 1
  const allDone = completed.length === STEPS.length

  return (
    <section className="impacto" ref={sectionRef} id="impactometro">
      <div className="impacto-inner">

        {/* Header */}
        <div className="impacto-header">
          <div className="impacto-eyebrow">Impactômetro</div>
          <h2 className="impacto-title">A jornada completa, etapa por etapa</h2>
          <p className="impacto-sub">
            Veja como cada parte do processo foi transformada. A Focatia te guia!
          </p>
        </div>

        {/* Step tabs */}
        <div className="step-tabs" role="tablist">
          {STEPS.map((s, i) => {
            const isUnlocked  = unlocked.includes(i)
            const isCompleted = completed.includes(i)
            const isActive    = current === i
            return (
              <button
                key={i}
                role="tab"
                aria-selected={isActive}
                className={[
                  'step-tab',
                  isActive    ? 'active'    : '',
                  isCompleted ? 'completed' : '',
                  !isUnlocked ? 'locked'    : '',
                ].join(' ')}
                onClick={() => goTo(i)}
                disabled={!isUnlocked}
                title={!isUnlocked ? 'Complete a etapa anterior para desbloquear' : ''}
              >
                <span className="tab-icon">
                  {isCompleted ? '✅' : isUnlocked ? s.emoji : '🔒'}
                </span>
                <span className="tab-label">{s.title}</span>
                {isCompleted && <span className="tab-xp">+{s.xpReward} XP</span>}
              </button>
            )
          })}
        </div>

        {/* Main content */}
        <div className="impacto-body">
          {/* Seal sidebar */}
          <div className="impacto-seal-col">
            <div className="seal-speech-bubble">
              <p>{step.sealSays}</p>
              <div className="bubble-tail" />
            </div>
            <Seal mood={step.sealMood} size={140} />
            <div className="seal-step-badge">
              Etapa {current + 1} de {STEPS.length}
            </div>
          </div>

          {/* Compare panel */}
          <div className="compare-panel">
            {/* Toggle */}
            <div className="toggle-row">
              <button
                className={`toggle-btn ${showSide === 'before' ? 'active' : ''}`}
                onClick={() => setShowSide('before')}
              >
                😰 Antes
              </button>
              <div className="toggle-divider" />
              <button
                className={`toggle-btn after-btn ${showSide === 'after' ? 'active' : ''}`}
                onClick={() => setShowSide('after')}
              >
                ⚡ Depois
              </button>
            </div>

            {/* Items */}
            <div className={`compare-items ${showSide}`} key={`${current}-${showSide}`}>
              {(showSide === 'before' ? step.before : step.after).map((item, i) => (
                <div
                  className={`compare-item ${showSide}`}
                  key={i}
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <span className="item-icon">{item.icon}</span>
                  <span className="item-text">{item.text}</span>
                </div>
              ))}

              {/* Scanner animation for step 3 after */}
              {step.hasAnimation && showSide === 'after' && (
                <ScannerAnimation key={current} />
              )}
            </div>

            {/* Time saved badge */}
            <div className="time-saved">
              <span className="ts-label">Impacto desta etapa</span>
              <span className="ts-value">{step.timeSaved}</span>
            </div>

            {/* CTA */}
            <div className="compare-cta">
              {showSide === 'before' ? (
                <button className="btn-see-after" onClick={() => setShowSide('after')}>
                  Ver como fica depois →
                </button>
              ) : !isLast ? (
                <button className="btn-advance" onClick={advance}>
                  {completed.includes(current)
                    ? `Ir para: ${STEPS[current + 1].title} →`
                    : `Concluir etapa (+${step.xpReward} XP) →`}
                </button>
              ) : (
                <button
                  className="btn-advance btn-final"
                  onClick={advance}
                  disabled={allDone}
                >
                  {allDone ? '🎉 Jornada concluída!' : `Concluir jornada (+${step.xpReward} XP) →`}
                  
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="journey-progress">
          <div className="jp-label">Progresso da jornada</div>
          <div className="jp-track">
            <div
              className="jp-fill"
              style={{ width: `${(completed.length / STEPS.length) * 100}%` }}
            />
          </div>
          <div className="jp-count">{completed.length}/{STEPS.length} etapas</div>
        </div>

      </div>
    </section>
  )
}
