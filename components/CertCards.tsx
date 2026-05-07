'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Card { id: number; certIndex: number }

const CERTS = [
  {
    title:  'Top 7 — HackFest 2',
    org:    'GDG Cloud New Delhi',
    date:   'Feb 2026',
    detail: 'Built and shipped a complete AI system within 24 hours among 500+ participants. Multi-agent DataSense pipeline ranked Top 7 nationally.',
    accent: '#00ff88',
    icon:   '🏆',
  },
  {
    title:  'Divide & Conquer Algorithms',
    org:    'Stanford University Online',
    date:   'Feb 2025',
    detail: 'Sorting, searching and randomised algorithms. Covered merge sort, quick sort, and probabilistic analysis.',
    accent: '#38bdf8',
    icon:   '🎓',
  },
  {
    title:  'GenAI Apps with Gemini',
    org:    'Google Cloud',
    date:   'Aug 2025',
    detail: 'Develop GenAI Apps with Gemini and Streamlit. Google Cloud Skill Badge — hands-on LLM deployment.',
    accent: '#a78bfa',
    icon:   '☁️',
  },
  {
    title:  'McKinsey Forward Program',
    org:    'McKinsey & Company',
    date:   'Dec 2025',
    detail: 'Problem solving, structured thinking and data-driven business analysis. Selective global program for emerging leaders.',
    accent: '#fb7185',
    icon:   '💡',
  },
]

// Position styles for the stack — index 0 = top/front
const POSITIONS = [
  { scale: 1,    y: 12,  zIndex: 30 },
  { scale: 0.95, y: -16, zIndex: 20 },
  { scale: 0.90, y: -44, zIndex: 10 },
]

function CardFace({ cert }: { cert: typeof CERTS[0] }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      borderRadius: 20,
      border: `1px solid ${cert.accent}28`,
      background: `linear-gradient(135deg, rgba(2,12,6,0.97) 0%, ${cert.accent}0a 100%)`,
      boxShadow: `0 0 60px ${cert.accent}14, 0 24px 48px rgba(0,0,0,0.7)`,
      padding: 'clamp(24px,3vw,40px)',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      overflow: 'hidden', position: 'relative',
    }}>
      {/* glow orb */}
      <div style={{
        position:'absolute', top:-50, right:-50,
        width:180, height:180, borderRadius:'50%',
        background:`radial-gradient(circle, ${cert.accent}16 0%, transparent 70%)`,
        pointerEvents:'none',
      }} />

      {/* top row */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <span style={{ fontSize:'2.2rem', lineHeight:1 }}>{cert.icon}</span>
        <span style={{
          fontFamily:'"Space Mono",monospace', fontSize:'0.6rem',
          color:`${cert.accent}88`, letterSpacing:'0.22em',
          textTransform:'uppercase', textAlign:'right', maxWidth:180,
        }}>{cert.org}</span>
      </div>

      {/* body */}
      <div>
        <h3 style={{
          fontFamily:'"Space Grotesk",sans-serif',
          fontSize:'clamp(1.2rem,2.5vw,1.75rem)',
          fontWeight:700, color:'rgba(255,255,255,0.96)',
          letterSpacing:'-0.02em', lineHeight:1.15, margin:'0 0 10px',
        }}>{cert.title}</h3>
        <p style={{
          fontFamily:'"Space Grotesk",sans-serif',
          fontSize:'clamp(0.8rem,1.3vw,0.94rem)',
          color:'rgba(255,255,255,0.55)', lineHeight:1.72, margin:0,
        }}>{cert.detail}</p>
      </div>

      {/* date bar */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:14 }}>
        <div style={{ height:2, flex:1, background:`linear-gradient(90deg,${cert.accent}55,transparent)`, borderRadius:2, marginRight:16 }} />
        <span style={{
          fontFamily:'"Space Mono",monospace', fontSize:'0.62rem',
          color:`${cert.accent}88`, letterSpacing:'0.2em', textTransform:'uppercase',
        }}>{cert.date}</span>
      </div>
    </div>
  )
}

export default function CertCards() {
  const [cards, setCards] = useState<Card[]>([
    { id: 0, certIndex: 0 },
    { id: 1, certIndex: 1 },
    { id: 2, certIndex: 2 },
  ])
  const [nextId,   setNextId]   = useState(4)
  const [exiting,  setExiting]  = useState(false)
  // Track which cert comes next into the back
  const nextCertRef = { current: 3 }

  const handleNext = () => {
    if (exiting) return
    setExiting(true)

    // Next cert to cycle in at back
    const incoming = nextCertRef.current % CERTS.length
    nextCertRef.current++

    // Shift: drop front card, push new one to back
    setCards(prev => {
      const shifted = prev.slice(1)
      return [...shifted, { id: nextId, certIndex: incoming }]
    })
    setNextId(n => n + 1)
    setTimeout(() => setExiting(false), 500)
  }

  // Visible stack = top 3 cards
  const visible = cards.slice(0, 3)

  return (
    <section style={{
      padding:'clamp(64px,9vh,110px) clamp(28px,6vw,96px)',
      background:'#020c06',
    }}>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:60, maxWidth:1060, margin:'0 auto 60px' }}>
        <span style={{
          fontFamily:'"Space Mono",monospace', color:'#00ff88',
          fontSize:'0.72rem', letterSpacing:'0.38em', textTransform:'uppercase', whiteSpace:'nowrap',
        }}>Certifications &amp; Achievements</span>
        <div style={{ flex:1, height:1, background:'rgba(0,255,136,0.15)' }} />
      </div>

      <div style={{
        maxWidth:1060, margin:'0 auto',
        display:'flex', gap:'clamp(40px,6vw,80px)',
        alignItems:'center', flexWrap:'wrap',
      }}>

        {/* ── Stacked cards ── */}
        <div style={{ flex:'0 0 clamp(300px,46vw,500px)', position:'relative', height:'clamp(290px,38vh,370px)' }}>
          <AnimatePresence initial={false}>
            {visible.map((card, idx) => {
              const pos = POSITIONS[idx] ?? POSITIONS[2]
              const cert = CERTS[card.certIndex % CERTS.length]
              const isFront = idx === 0

              return (
                <motion.div
                  key={card.id}
                  initial={idx === 2 ? { y: -44, scale: 0.9, opacity: 0 } : undefined}
                  animate={{ y: pos.y, scale: pos.scale, opacity: 1, zIndex: pos.zIndex }}
                  exit={isFront ? { y: 340, scale: 1, opacity: 0, zIndex: 40 } : undefined}
                  transition={{ type:'spring', duration:0.9, bounce:0 }}
                  style={{
                    position:'absolute',
                    left:'50%', bottom:0,
                    translateX:'-50%',
                    width:'100%',
                    height:'clamp(260px,34vh,340px)',
                    cursor: isFront ? 'pointer' : 'default',
                  }}
                  onClick={isFront ? handleNext : undefined}
                >
                  <CardFace cert={cert} />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* ── Right: list + button ── */}
        <div style={{ flex:'1 1 240px', display:'flex', flexDirection:'column', gap:24 }}>
          <p style={{
            fontFamily:'"Space Grotesk",sans-serif',
            fontSize:'clamp(0.88rem,1.4vw,1.05rem)',
            color:'rgba(255,255,255,0.45)',
            lineHeight:1.7, margin:0,
          }}>
            Click the card or press <span style={{ color:'#00ff88' }}>Next</span> to cycle through.
          </p>

          {/* Title list */}
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {CERTS.map((c, i) => {
              const isActive = cards[0]?.certIndex % CERTS.length === i
              return (
                <motion.div
                  key={i}
                  animate={{ opacity: isActive ? 1 : 0.3 }}
                  style={{ display:'flex', alignItems:'center', gap:12, cursor:'pointer' }}
                  onClick={() => {
                    // bring this cert to front
                    const newCards = [
                      { id: nextId,     certIndex: i },
                      { id: nextId + 1, certIndex: (i + 1) % CERTS.length },
                      { id: nextId + 2, certIndex: (i + 2) % CERTS.length },
                    ]
                    setCards(newCards)
                    setNextId(n => n + 3)
                  }}
                >
                  <div style={{
                    width:4, height: isActive ? 32 : 14, borderRadius:2,
                    background: isActive ? c.accent : 'rgba(255,255,255,0.15)',
                    transition:'height 0.3s, background 0.3s', flexShrink:0,
                  }} />
                  <span style={{
                    fontFamily:'"Space Grotesk",sans-serif',
                    fontSize:'clamp(0.82rem,1.2vw,0.94rem)',
                    color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
                    fontWeight: isActive ? 600 : 400,
                    transition:'color 0.3s',
                  }}>{c.title}</span>
                </motion.div>
              )
            })}
          </div>

          {/* Next button */}
          <button
            onClick={handleNext}
            disabled={exiting}
            style={{
              alignSelf:'flex-start',
              background:'rgba(0,255,136,0.08)',
              border:'1px solid rgba(0,255,136,0.35)',
              color:'#00ff88',
              fontFamily:'"Space Mono",monospace',
              fontSize:'0.64rem', letterSpacing:'0.24em', textTransform:'uppercase',
              padding:'11px 26px', cursor:'pointer', borderRadius:4, transition:'all 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget).style.background='rgba(0,255,136,0.16)'
              ;(e.currentTarget).style.borderColor='rgba(0,255,136,0.6)'
            }}
            onMouseLeave={e => {
              (e.currentTarget).style.background='rgba(0,255,136,0.08)'
              ;(e.currentTarget).style.borderColor='rgba(0,255,136,0.35)'
            }}
          >Next →</button>
        </div>
      </div>
    </section>
  )
}