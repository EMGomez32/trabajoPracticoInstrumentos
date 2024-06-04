import React from 'react'
import InstrumentosCard from '../components/cards/InstrumentosCards'

export default function Instrumentos() {



  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>Instrumentos</h1>
      <InstrumentosCard />
    </div>
  )
}