'use client'
import { useEffect, useRef, useState, ReactNode } from 'react'
import { motion } from 'framer-motion'
import ATCShader from './ATCShader'

interface HeroSectionProps {
  firstName:    string
  lastName:     string
  role:         string
  subRole:      string
  meta:         string          // e.g. "B.Tech CSE · CGPA 8.6 · Rayat Bahra University"
  scrollLabel?: string
  children?:    ReactNode       // About section rendered below
  onScrolled?:  () => void      // fires when user scrolls past hero
}

export default function HeroSection({
  firstName,
  lastName,
  role,
  subRole,
  meta,
  scrollLabel = 'scroll to explore',
  children,
  onScrolled,
}: HeroSectionProps) {
  const [mounted,    setMounted]    = useState(false)
  const [pastHero,   setPastHero]   = useState(false)
  const heroRef   = useRef<HTMLDivElement>(null)
  const firedRef  = useRef(false)

  useEffect(() => { setMounted(true) }, [])

  // Use IntersectionObserver — when hero leaves viewport, fire onScrolled
  useEffect(() => {
    if (!heroRef.current) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !firedRef.current) {
          firedRef.current = true
          setPastHero(true)
          onScrolled?.()
        }
      },
      { threshold: 0.05 }
    )
    io.observe(heroRef.current)
    return () => io.disconnect()
  }, [onScrolled])

  return (
    <div style={{ background: '#020c06' }}>
      {/* ── HERO — 100dvh, ATC shader fills it ── */}
      <div
        ref={heroRef}
        style={{
          position:   'relative',
          width:      '100%',
          height:     '100dvh',
          overflow:   'hidden',
          background: '#020c06',
        }}
      >
        {/* ATC radar shader — full bleed */}
        <ATCShader />

        {/* Dark overlay so text pops over the shader */}
        <div style={{
          position:   'absolute',
          inset:       0,
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(2,12,6,0.35) 0%, rgba(2,12,6,0.72) 100%)',
          zIndex:      1,
          pointerEvents: 'none',
        }} />

        {/* ── NAME + INFO — centred over shader ── */}
        {mounted && (
          <div style={{
            position:       'absolute',
            inset:           0,
            zIndex:          2,
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            textAlign:      'center',
            padding:        '0 clamp(20px, 5vw, 80px)',
            pointerEvents:  'none',
            userSelect:     'none',
          }}>

            {/* Radar ping label — subtle top accent */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{
                fontFamily:    '"Space Mono", monospace',
                fontSize:      'clamp(0.6rem, 1vw, 0.72rem)',
                color:         'rgba(0,255,136,0.5)',
                letterSpacing: '0.5em',
                textTransform: 'uppercase',
                marginBottom:   24,
              }}
            >
              ◈ &nbsp; Signal Acquired &nbsp; ◈
            </motion.div>

            {/* First name */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <span style={{
                display:       'block',
                fontFamily:    '"Space Grotesk", sans-serif',
                fontSize:      'clamp(4rem, 11vw, 10.5rem)',
                fontWeight:     700,
                color:         'rgba(255,255,255,0.96)',
                letterSpacing: '-0.04em',
                lineHeight:     0.88,
                textShadow:    '0 0 80px rgba(0,255,136,0.18), 0 4px 40px rgba(0,0,0,0.9)',
              }}>{firstName}</span>
            </motion.div>

            {/* Last name — green tint, slides from right */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.65, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginBottom: 36 }}
            >
              <span style={{
                display:       'block',
                fontFamily:    '"Space Grotesk", sans-serif',
                fontSize:      'clamp(4rem, 11vw, 10.5rem)',
                fontWeight:     700,
                color:         '#00ff88',
                letterSpacing: '-0.04em',
                lineHeight:     0.88,
                textShadow:    '0 0 60px rgba(0,255,136,0.4), 0 4px 40px rgba(0,0,0,0.9)',
              }}>{lastName}</span>
            </motion.div>

            {/* Divider line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.0, duration: 0.7, ease: 'easeOut' }}
              style={{
                width:           'clamp(120px, 18vw, 240px)',
                height:           1,
                background:      'linear-gradient(90deg, transparent, rgba(0,255,136,0.5), transparent)',
                marginBottom:     32,
              }}
            />

            {/* Role */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              style={{
                fontFamily:    '"Space Grotesk", sans-serif',
                fontSize:      'clamp(1rem, 2.2vw, 1.5rem)',
                fontWeight:     600,
                color:         'rgba(255,255,255,0.88)',
                letterSpacing: '0.02em',
                marginBottom:   10,
              }}
            >
              {role}
            </motion.div>

            {/* Sub-role */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
              style={{
                fontFamily:    '"Space Mono", monospace',
                fontSize:      'clamp(0.68rem, 1.2vw, 0.88rem)',
                color:         'rgba(0,255,136,0.65)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom:   14,
              }}
            >
              {subRole}
            </motion.div>

            {/* Meta — university, CGPA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.35, duration: 0.8 }}
              style={{
                fontFamily:    '"Space Mono", monospace',
                fontSize:      'clamp(0.6rem, 1vw, 0.74rem)',
                color:         'rgba(255,255,255,0.32)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom:   56,
              }}
            >
              {meta}
            </motion.div>

            {/* Scroll hint — pulsing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0.5, 0] }}
              transition={{ delay: 1.8, duration: 2.4, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
              style={{
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                gap:             8,
              }}
            >
              <span style={{
                fontFamily:    '"Space Mono", monospace',
                fontSize:      '0.58rem',
                color:         'rgba(0,255,136,0.55)',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
              }}>{scrollLabel}</span>
              {/* animated chevron */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width:  0, height: 0,
                  borderLeft:   '5px solid transparent',
                  borderRight:  '5px solid transparent',
                  borderTop:    '7px solid rgba(0,255,136,0.45)',
                }}
              />
            </motion.div>
          </div>
        )}

        {/* Corner HUD decorations — ATC feel */}
        {mounted && (
          <>
            {['topLeft','topRight','bottomLeft','bottomRight'].map(pos => (
              <motion.div
                key={pos}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                style={{
                  position:  'absolute',
                  zIndex:     3,
                  pointerEvents: 'none',
                  ...(pos === 'topLeft'     ? { top: 24,  left:  24 } : {}),
                  ...(pos === 'topRight'    ? { top: 24,  right: 24 } : {}),
                  ...(pos === 'bottomLeft'  ? { bottom: 24, left: 24 } : {}),
                  ...(pos === 'bottomRight' ? { bottom: 24, right: 24 } : {}),
                }}
              >
                <div style={{
                  width:  28, height: 28,
                  borderTop:    pos.includes('top')    ? '1px solid rgba(0,255,136,0.28)' : 'none',
                  borderBottom: pos.includes('bottom') ? '1px solid rgba(0,255,136,0.28)' : 'none',
                  borderLeft:   pos.includes('Left')   ? '1px solid rgba(0,255,136,0.28)' : 'none',
                  borderRight:  pos.includes('Right')  ? '1px solid rgba(0,255,136,0.28)' : 'none',
                }} />
              </motion.div>
            ))}

            {/* Top status bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 1 }}
              style={{
                position:      'absolute',
                top:            16,
                left:           '50%',
                transform:     'translateX(-50%)',
                zIndex:         3,
                pointerEvents: 'none',
                display:       'flex',
                gap:            24,
                alignItems:    'center',
              }}
            >
              {['Portfolio v1.0', '2026', 'India'].map((label, i) => (
                <span key={i} style={{
                  fontFamily:    '"Space Mono", monospace',
                  fontSize:      '0.56rem',
                  color:         'rgba(0,255,136,0.28)',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                }}>{label}</span>
              ))}
            </motion.div>
          </>
        )}
      </div>

      {/* ── ABOUT — rendered below hero in normal doc flow ── */}
      {children && (
        <div style={{ background: '#020c06' }}>
          {children}
        </div>
      )}
    </div>
  )
}