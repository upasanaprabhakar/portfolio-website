'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { FullScreenScrollFX } from '@/components/FullScreenScrollFX';
import ScrollExpandMedia from '@/components/ScrollExpandMedia';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 'careertrack',
    title: 'CareerTrack',
    year: 'Mar 2026',
    role: 'Full-Stack · AI',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Prisma', 'Socket.io', 'Groq LLM'],
    bullets: [
      'Architected a full-stack job tracking platform with a 7-stage application pipeline, real-time Socket.io notifications, and role-based access control — live with active users.',
      'Integrated Groq LLM to build an AI-powered resume-to-JD gap analyzer, reducing interview prep time by 60% through automated keyword detection and role-specific coaching.',
      'Secured with JWT + httpOnly refresh token rotation, rate limiting, and CORS across Vercel + Render + Neon PostgreSQL.',
    ],
    link: 'https://job-application-tracker-theta-khaki.vercel.app',
    accent: '#4f8ef7',
  },
  {
    id: 'datasense',
    title: 'DataSense AI',
    year: 'Feb 2026',
    role: 'Multi-Agent · AI',
    tech: ['React', 'Node.js', 'Groq', 'Supabase', 'D3.js'],
    bullets: [
      'Built a 3-agent pipeline (Atlas, Sage, Guardian) that auto-generates a complete data dictionary from any CSV or database in under 30 seconds with zero configuration.',
      "Sage calls Groq's Llama 3.3 70B at under 300ms/field; Guardian scores data quality 0–100 and detects PII across 11 GDPR risk categories.",
      'Ranked Top 7 at HackFest 2, GDG Cloud New Delhi among 500+ participants.',
    ],
    link: 'https://datasense-ai-xi.vercel.app',
    accent: '#60a5fa',
    badge: '🏆 Top 7 — HackFest 2, GDG Cloud New Delhi',
  },
  {
    id: 'sentinelnet',
    title: 'SentinelNet',
    year: 'Aug–Oct 2025',
    role: 'AI/ML · Security',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
    bullets: [
      'Production-grade Network Intrusion Detection System using ensemble ML models — Decision Trees, Random Forests, Gradient Boosting.',
      'Reduced false positives by 25% and detection speed by 30% via SMOTE-based class balancing and feature engineering.',
      'Benchmarked algorithms for optimal accuracy-speed trade-off in real-time security environments.',
    ],
    link: 'https://github.com/SpringBoardMentor193s/SentinelNet',
    accent: '#818cf8',
  },
];

const SKILLS = [
  { label: 'Languages',  value: 'JavaScript · Python · C++ · SQL · HTML5 · CSS3' },
  { label: 'Frontend',   value: 'React.js · Next.js · Redux · Tailwind CSS' },
  { label: 'Backend',    value: 'Node.js · Express.js · REST APIs · WebSockets · Socket.io · Prisma ORM' },
  { label: 'Databases',  value: 'PostgreSQL · MongoDB · Supabase · NoSQL' },
  { label: 'AI / ML',    value: 'LLM Integration · Multi-Agent Systems · Groq API · Scikit-learn · Pandas' },
  { label: 'Tools',      value: 'Git · JWT Auth · API Optimization · Vercel · Render · System Design' },
];

const CERTS = [
  { title: 'Top 7 — HackFest 2', org: 'GDG Cloud New Delhi', date: 'Feb 2026', desc: 'Built and shipped a complete AI system within 24 hours among 500+ participants.' },
  { title: 'Divide and Conquer, Sorting & Searching', org: 'Stanford University Online', date: 'Feb 2025', desc: 'Algorithms specialization covering divide-and-conquer, sorting, searching, and randomized algorithms.' },
  { title: 'Develop GenAI Apps with Gemini & Streamlit', org: 'Google Cloud', date: 'Aug 2025', desc: 'Google Cloud Skill Badge for building production generative AI applications.' },
];

const mono = '"JetBrains Mono", "DM Mono", monospace';
const display = '"Syne", sans-serif';
const serif = '"Instrument Serif", serif';

// ─── Project left label ────────────────────────────────────────────────────────
function ProjectLeft({ tech, year, accent }: { tech: string[]; year: string; accent: string }) {
  return (
    <div style={{ fontFamily: mono }}>
      <div style={{ color: accent, letterSpacing: '0.25em', fontSize: '0.65rem', marginBottom: 18, textTransform: 'uppercase', fontWeight: 500 }}>
        {year}
      </div>
      {tech.map((t) => (
        <div key={t} style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.06em', lineHeight: 2.4, textTransform: 'uppercase' }}>
          {t}
        </div>
      ))}
    </div>
  );
}

// ─── Project right label ───────────────────────────────────────────────────────
function ProjectRight({ role, bullets, link, accent, badge }: {
  role: string; bullets: string[]; link: string; accent: string; badge?: string;
}) {
  return (
    <div style={{ fontFamily: mono, textAlign: 'right', maxWidth: 360 }}>
      {badge && (
        <div style={{ fontSize: '0.6rem', color: accent, letterSpacing: '0.1em', marginBottom: 10 }}>
          {badge}
        </div>
      )}
      <div style={{ color: accent, letterSpacing: '0.22em', fontSize: '0.68rem', marginBottom: 20, textTransform: 'uppercase', fontWeight: 500 }}>
        {role}
      </div>
      <ul style={{ listStyle: 'none', marginBottom: 24 }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.85, marginBottom: 10, letterSpacing: '0.015em', fontWeight: 300 }}>
            {b}
          </li>
        ))}
      </ul>
      <a href={link} target="_blank" rel="noreferrer" style={{
        color: accent, fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase',
        textDecoration: 'none', borderBottom: `1px solid ${accent}44`, paddingBottom: 3, display: 'inline-block',
      }}>
        View Project ↗
      </a>
    </div>
  );
}

// ─── About + Skills + Certs (rendered inside ScrollExpandMedia) ───────────────
function AboutContent() {
  return (
    <div style={{ color: '#f0f4ff', maxWidth: 1040, margin: '0 auto' }}>

      {/* About */}
      <section style={{ marginBottom: 96 }}>
        <SectionEyebrow>About</SectionEyebrow>
        <p style={{
          fontFamily: serif, fontStyle: 'italic',
          fontSize: 'clamp(1.2rem, 2.6vw, 1.85rem)', lineHeight: 1.74,
          color: 'rgba(255,255,255,0.88)', maxWidth: 800, letterSpacing: '0.01em',
        }}>
          Full-Stack Developer and AI systems builder with a proven track record of shipping
          production-grade, deployed applications. Skilled across the full stack — from real-time
          backends and secure REST APIs to LLM-integrated pipelines and multi-agent systems.{' '}
          <span style={{ fontStyle: 'normal', fontFamily: display, fontWeight: 700, color: '#818cf8' }}>
            Top 7 finish among 500+ participants
          </span>{' '}
          at a national hackathon. Currently pursuing B.Tech in CSE at Rayat Bahra University,
          CGPA&nbsp;8.6, graduating&nbsp;2027.
        </p>

        {/* Experience */}
        <div style={{
          marginTop: 52, padding: '32px 36px',
          border: '1px solid rgba(129,140,248,0.14)',
          background: 'rgba(6,10,30,0.65)', backdropFilter: 'blur(8px)', maxWidth: 580,
        }}>
          <div style={{ fontFamily: mono, fontSize: '0.55rem', letterSpacing: '0.38em', color: '#818cf8', textTransform: 'uppercase', marginBottom: 14 }}>
            Experience
          </div>
          <div style={{ fontFamily: display, fontSize: 'clamp(1rem,1.8vw,1.2rem)', fontWeight: 700, color: '#f0f4ff', marginBottom: 6 }}>
            AI/ML Intern — Infosys Springboard
          </div>
          <div style={{ fontFamily: mono, fontSize: '0.72rem', color: '#818cf8', marginBottom: 18, letterSpacing: '0.08em' }}>
            Aug – Oct 2025 &nbsp;·&nbsp; Remote
          </div>
          {[
            'Built ensemble ML models (Decision Trees, Random Forests, Gradient Boosting) for network anomaly detection, selecting the best-performing model for production deployment.',
            'Designed a complete ML pipeline covering SMOTE-based class balancing, feature engineering, and cross-validation, improving model robustness.',
            'Delivered a production-ready system with a full test suite, enabling seamless team handoff.',
          ].map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, fontFamily: mono, fontSize: '0.8rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.8, marginBottom: 10 }}>
              <span style={{ color: '#818cf8', flexShrink: 0, marginTop: 3, fontSize: '0.4rem' }}>◆</span>{b}
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section style={{ marginBottom: 96 }}>
        <SectionEyebrow>Skills</SectionEyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 2 }}>
          {SKILLS.map((s) => (
            <div key={s.label} style={{ padding: '26px 30px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(79,142,247,0.08)' }}>
              <div style={{ fontFamily: mono, fontSize: '0.55rem', letterSpacing: '0.38em', color: '#818cf8', textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>
                {s.label}
              </div>
              <div style={{ fontFamily: mono, fontSize: '0.85rem', color: 'rgba(255,255,255,0.68)', lineHeight: 2, letterSpacing: '0.02em' }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certs */}
      <section style={{ marginBottom: 96 }}>
        <SectionEyebrow>Certifications &amp; Awards</SectionEyebrow>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {CERTS.map((c, i) => (
            <div key={i} style={{
              padding: '28px 34px',
              border: '1px solid rgba(79,142,247,0.09)',
              background: 'rgba(4,8,22,0.65)', backdropFilter: 'blur(6px)',
              display: 'grid', gridTemplateColumns: '1fr auto', gap: '6px 24px',
            }}>
              <div style={{ fontFamily: display, fontSize: 'clamp(1rem,1.9vw,1.18rem)', fontWeight: 700, color: '#f0f4ff', letterSpacing: '-0.01em' }}>
                {c.title}
              </div>
              <div style={{ fontFamily: mono, fontSize: '0.62rem', color: 'rgba(79,142,247,0.45)', letterSpacing: '0.14em', whiteSpace: 'nowrap', alignSelf: 'start', paddingTop: 4 }}>
                {c.date}
              </div>
              <div style={{ fontFamily: mono, fontSize: '0.65rem', color: '#4f8ef7', letterSpacing: '0.12em', textTransform: 'uppercase', gridColumn: 1 }}>
                {c.org}
              </div>
              <div style={{ fontFamily: mono, fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.78, letterSpacing: '0.02em', gridColumn: '1 / -1', marginTop: 10 }}>
                {c.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section style={{ textAlign: 'center', paddingTop: 40, paddingBottom: 80 }}>
        <SectionEyebrow style={{ justifyContent: 'center' }}>Get In Touch</SectionEyebrow>
        <h2 style={{
          fontFamily: '"Clash Display", "Syne", sans-serif',
          fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
          fontWeight: 700, letterSpacing: '-0.04em',
          color: '#f0f4ff', lineHeight: 0.94, marginBottom: 24,
        }}>
          Let&rsquo;s Build<br />
          <span style={{ color: '#4f8ef7' }}>Something.</span>
        </h2>
        <p style={{ fontFamily: mono, fontSize: '0.82rem', color: 'rgba(122,163,232,0.55)', letterSpacing: '0.08em', maxWidth: 440, margin: '0 auto 48px', lineHeight: 1.85 }}>
          Open to full-time roles, internships, and interesting collaborations in full-stack development and AI engineering.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px 0' }}>
          {[
            { label: 'Email ↗', href: 'mailto:upasanaprabhakar35@gmail.com' },
            { label: 'GitHub ↗', href: 'https://github.com/upasanaprabhakar' },
            { label: 'LinkedIn ↗', href: 'https://linkedin.com/in/upasana-prabhakar-634224296' },
          ].map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{
              fontFamily: mono, fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#4f8ef7', textDecoration: 'none', borderBottom: '1px solid rgba(79,142,247,0.28)',
              paddingBottom: 3, margin: '0 20px 12px',
            }}>
              {l.label}
            </a>
          ))}
        </div>
        <div style={{ marginTop: 64, fontFamily: mono, fontSize: '0.58rem', color: 'rgba(79,142,247,0.2)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Upasana Prabhakar · 2026
        </div>
      </section>

    </div>
  );
}

function SectionEyebrow({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      fontFamily: mono, fontSize: '0.6rem', letterSpacing: '0.44em',
      textTransform: 'uppercase', color: 'rgba(79,142,247,0.5)',
      marginBottom: 48, display: 'flex', alignItems: 'center', gap: 20,
      ...style,
    }}>
      {children}
      <div style={{ flex: 1, height: 1, background: 'rgba(79,142,247,0.1)' }} />
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const threeRefs   = useRef<any>({
    scene: null, camera: null, renderer: null, composer: null,
    stars: [], nebula: null, mountains: [], animationId: null,
    targetCameraX: 0, targetCameraY: 30, targetCameraZ: 100, locations: [],
  });
  const smoothCam = useRef({ x: 0, y: 30, z: 100 });
  const [threeReady, setThreeReady] = useState(false);

  // ── Three.js: Horizon scene (fixed canvas, visible only during projects) ──
  useEffect(() => {
    const refs = threeRefs.current;
    refs.scene = new THREE.Scene();
    refs.scene.fog = new THREE.FogExp2(0x000814, 0.00022);

    refs.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    refs.camera.position.set(0, 20, 100);

    refs.renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current!, antialias: true, alpha: true });
    refs.renderer.setSize(window.innerWidth, window.innerHeight);
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    refs.renderer.toneMappingExposure = 0.38;

    refs.composer = new EffectComposer(refs.renderer);
    refs.composer.addPass(new RenderPass(refs.scene, refs.camera));
    refs.composer.addPass(new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.45, 0.35, 0.88,
    ));

    // Stars — Horizon original white/warm palette
    for (let layer = 0; layer < 3; layer++) {
      const count = 4000;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      const sz  = new Float32Array(count);
      for (let j = 0; j < count; j++) {
        const r = 200 + Math.random() * 800;
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(Math.random() * 2 - 1);
        pos[j*3]   = r * Math.sin(phi) * Math.cos(theta);
        pos[j*3+1] = r * Math.sin(phi) * Math.sin(theta);
        pos[j*3+2] = r * Math.cos(phi);
        const c = new THREE.Color();
        const pick = Math.random();
        if (pick < 0.7)       c.setHSL(0, 0, 0.8 + Math.random() * 0.2);
        else if (pick < 0.9)  c.setHSL(0.08, 0.5, 0.8);
        else                  c.setHSL(0.6, 0.5, 0.8);
        col[j*3] = c.r; col[j*3+1] = c.g; col[j*3+2] = c.b;
        sz[j] = Math.random() * 2 + 0.5;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
      geo.setAttribute('size',     new THREE.BufferAttribute(sz,  1));
      const mat = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, depth: { value: layer } },
        vertexShader: `attribute float size;attribute vec3 color;varying vec3 vColor;uniform float time;uniform float depth;
          void main(){vColor=color;vec3 p=position;float a=time*0.05*(1.0-depth*0.3);mat2 rot=mat2(cos(a),-sin(a),sin(a),cos(a));p.xy=rot*p.xy;vec4 mv=modelViewMatrix*vec4(p,1.0);gl_PointSize=size*(300.0/-mv.z);gl_Position=projectionMatrix*mv;}`,
        fragmentShader: `varying vec3 vColor;void main(){float d=length(gl_PointCoord-vec2(0.5));if(d>0.5)discard;gl_FragColor=vec4(vColor,1.0-smoothstep(0.0,0.5,d));}`,
        transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
      });
      refs.stars.push(new THREE.Points(geo, mat));
      refs.scene.add(refs.stars[layer]);
    }

    // Nebula — original Horizon colors
    const nebMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x0033ff) },
        color2: { value: new THREE.Color(0xff0066) },
        opacity: { value: 0.18 },
      },
      vertexShader: `varying vec2 vUv;varying float vEl;uniform float time;void main(){vUv=uv;vec3 p=position;float el=sin(p.x*0.01+time)*cos(p.y*0.01+time)*20.0;p.z+=el;vEl=el;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,
      fragmentShader: `uniform vec3 color1;uniform vec3 color2;uniform float opacity;uniform float time;varying vec2 vUv;void main(){float m=sin(vUv.x*10.0+time)*cos(vUv.y*10.0+time);vec3 col=mix(color1,color2,m*0.5+0.5);float a=opacity*(1.0-length(vUv-0.5)*2.0);gl_FragColor=vec4(col,a);}`,
      transparent: true, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false,
    });
    refs.nebula = new THREE.Mesh(new THREE.PlaneGeometry(8000, 4000, 100, 100), nebMat);
    refs.nebula.position.z = -1050;
    refs.scene.add(refs.nebula);

    // Mountains — original Horizon colors
    [
      { z: -50,  h: 60,  color: 0x1a1a2e },
      { z: -100, h: 80,  color: 0x16213e },
      { z: -150, h: 100, color: 0x0f3460 },
      { z: -200, h: 120, color: 0x0a4668 },
    ].forEach((l, idx) => {
      const pts: THREE.Vector2[] = [];
      for (let i = 0; i <= 50; i++) {
        pts.push(new THREE.Vector2(
          (i/50 - 0.5) * 1000,
          Math.sin(i*0.1)*l.h + Math.sin(i*0.05)*l.h*0.5 + Math.random()*l.h*0.2 - 100
        ));
      }
      pts.push(new THREE.Vector2(5000, -300), new THREE.Vector2(-5000, -300));
      const mesh = new THREE.Mesh(
        new THREE.ShapeGeometry(new THREE.Shape(pts)),
        new THREE.MeshBasicMaterial({ color: l.color, side: THREE.DoubleSide })
      );
      mesh.position.set(0, l.z, l.z);
      mesh.userData = { baseZ: l.z };
      refs.scene.add(mesh);
      refs.mountains.push(mesh);
    });

    // Atmosphere blob — dimmed to 0.1 opacity so text stays readable
    const atmMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `varying vec3 vN;void main(){vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragmentShader: `varying vec3 vN;uniform float time;void main(){
        float i=pow(0.7-dot(vN,vec3(0,0,1)),2.0);
        vec3 atm=vec3(0.3,0.6,1.0)*i*(sin(time*2.0)*0.1+0.9);
        gl_FragColor=vec4(atm,i*0.10);}`,
      side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true,
    });
    refs.scene.add(new THREE.Mesh(new THREE.SphereGeometry(600, 32, 32), atmMat));

    refs.locations = refs.mountains.map((m: any) => m.position.z);

    const animate = () => {
      refs.animationId = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;
      refs.stars.forEach((s: any) => { if (s.material.uniforms) s.material.uniforms.time.value = t; });
      if (refs.nebula?.material.uniforms) refs.nebula.material.uniforms.time.value = t * 0.5;
      const ease = 0.05;
      smoothCam.current.x += (refs.targetCameraX - smoothCam.current.x) * ease;
      smoothCam.current.y += (refs.targetCameraY - smoothCam.current.y) * ease;
      smoothCam.current.z += (refs.targetCameraZ - smoothCam.current.z) * ease;
      refs.camera.position.set(
        smoothCam.current.x + Math.sin(t*0.1)*2,
        smoothCam.current.y + Math.cos(t*0.15)*1,
        smoothCam.current.z,
      );
      refs.camera.lookAt(0, 10, -600);
      refs.mountains.forEach((m: any, i: number) => {
        m.position.x = Math.sin(t*0.1)*2*(1+i*0.5);
        m.position.y = 50 + Math.cos(t*0.15)*(1+i*0.5);
      });
      refs.composer.render();
    };
    animate();
    setThreeReady(true);

    const onResize = () => {
      refs.camera.aspect = window.innerWidth / window.innerHeight;
      refs.camera.updateProjectionMatrix();
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(refs.animationId);
      window.removeEventListener('resize', onResize);
      refs.renderer.dispose();
    };
  }, []);

  // ── Project sections for FullScreenScrollFX ───────────────────────────────
  const projectSections = PROJECTS.map((p) => ({
    id: p.id,
    title: p.title,
    background: '',
    // NO renderBackground — use the Horizon Three.js canvas as bg naturally
    leftLabel:  <ProjectLeft  tech={p.tech} year={p.year} accent={p.accent} />,
    rightLabel: <ProjectRight role={p.role} bullets={p.bullets} link={p.link} accent={p.accent} badge={(p as any).badge} />,
  }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap');

        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{-webkit-font-smoothing:antialiased;}
        body{background:#04080f;color:#f0f4ff;overflow-x:hidden;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:#04080f;}
        ::-webkit-scrollbar-thumb{background:#1a3a6a;border-radius:2px;}
        ::selection{background:rgba(79,142,247,0.3);}

        /* Three.js canvas — fixed behind projects section only */
        .horizon-canvas{
          position:fixed;top:0;left:0;
          width:100vw;height:100vh;
          z-index:0;pointer-events:none;
          opacity:0;
          transition:opacity 0.6s ease;
        }
        .horizon-canvas.visible{ opacity:1; }

        /* FullScreenScrollFX wrapper — sits on top of canvas */
        .fx-wrapper{ position:relative; z-index:10; }

        /* Remove the blank "fin" end screen from FullScreenScrollFX */
        .fx .fx-end{ display:none !important; }

        /* Font overrides for FX component */
        .fx .fx-featured-title{
          font-family:"Clash Display","Syne",sans-serif !important;
          font-size:clamp(2.5rem,7vw,6.5rem) !important;
          font-weight:700 !important;
          letter-spacing:-0.04em !important;
        }
        .fx .fx-item{
          font-family:${mono} !important;
          font-size:clamp(0.75rem,1.5vw,1rem) !important;
          letter-spacing:0.06em !important;
        }
      `}</style>

      {/* ── Three.js Horizon canvas — fixed, shown during projects ── */}
      <HorizonCanvasVisibility canvasRef={canvasRef} />
      <canvas ref={canvasRef} className="horizon-canvas" id="horizon-canvas" />

      {/* ── Hero + About/Skills/Certs/Contact via ScrollExpandMedia ── */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <ScrollExpandMedia
          title="Upasana Prabhakar"
          scrollToExpand="Scroll to explore ↓"
        >
          <AboutContent />
        </ScrollExpandMedia>
      </div>

      {/* ── Projects via FullScreenScrollFX ── */}
      <div className="fx-wrapper">
        <FullScreenScrollFX
          sections={projectSections}
          fontFamily='"Syne", sans-serif'
          header={
            <span style={{ fontFamily: mono, fontSize: '0.62rem', letterSpacing: '0.48em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>
              Selected Work
            </span>
          }
          footer={
            <a href="https://github.com/upasanaprabhakar" target="_blank" rel="noreferrer"
              style={{ fontFamily: mono, color: 'rgba(255,255,255,0.25)', textDecoration: 'none', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              github.com/upasanaprabhakar ↗
            </a>
          }
          bgTransition="fade"
          parallaxAmount={3}
          showProgress={true}
          colors={{
            text:    'rgba(255,255,255,0.96)',
            overlay: 'rgba(0,0,0,0.0)',
            pageBg:  'transparent',
            stageBg: 'transparent',
          }}
        />
      </div>
    </>
  );
}

// ── Shows/hides the Three.js canvas when projects section is in view ──────────
function HorizonCanvasVisibility({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement> }) {
  useEffect(() => {
    const fxWrapper = document.querySelector('.fx-wrapper');
    if (!fxWrapper) return;
    const canvas = document.getElementById('horizon-canvas');
    if (!canvas) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) canvas.classList.add('visible');
        else canvas.classList.remove('visible');
      },
      { threshold: 0.05 }
    );
    observer.observe(fxWrapper);
    return () => observer.disconnect();
  }, []);
  return null;
}