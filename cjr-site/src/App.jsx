import React, { useState, useRef } from 'react'
import Hero from './components/Hero.jsx'
import Impactometer from './components/Impactometer.jsx'
import ImpactFinal from './components/ImpactFinal.jsx'

export default function App() {
  const [xp, setXp] = useState(0)
  const [journeyComplete, setJourneyComplete] = useState(false)
  const impactoRef  = useRef(null)
  const finalRef    = useRef(null)

  const handleXpGain = (amount) => {
    setXp(x => {
      const next = Math.min(x + amount, 200)
      if (next >= 75 && !journeyComplete) setJourneyComplete(true)
      return next
    })
  }

  const handleStartJourney = () => {
    handleXpGain(20)
    setTimeout(() => {
      impactoRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div>
      <Hero onStartJourney={handleStartJourney} totalXp={xp} />
      <div ref={impactoRef}>
        <Impactometer totalXp={xp} onXpGain={handleXpGain} />
      </div>
      <div ref={finalRef}>
        <ImpactFinal totalXp={xp} journeyComplete={journeyComplete} />
      </div>
    </div>
  )
}
