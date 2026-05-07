'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { SpiralAnimation } from '@/components/SpiralAnimation';

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
    award: 'Top 7 — HackFest 2, GDG Cloud New Delhi',
  },
  {
    id: 'sentinelnet',
    title: 'SentinelNet',
    year: 'Aug–Oct 2025',
    role: 'AI/ML · Security',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
    bullets: [
      'Production-grade NIDS using ensemble ML models — Decision Trees, Random Forests, Gradient Boosting.',
      'Reduced false positives by 25% and improved detection speed by 30% via SMOTE balancing and feature engineering.',
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
  { title: 'Top 7 — HackFest 2', org: 'GDG Cloud New Delhi', date: 'Feb 2026', desc: 'Built and shipped a complete AI system within 24 hours among 500+ participants. Ranked top 7 out of 500+ teams at a national-level hackathon hosted by GDG Cloud New Delhi.', link: 'https://www.linkedin.com/in/upasana-prabhakar-634224296/overlay/Certifications/21609350/treasury/?profileId=ACoAAEeUeIgBnVEOYopl4tj9A_LRZ-fzWbZOmEU' },
  { title: 'McKinsey Forward Program', org: 'McKinsey & Company · McKinsey.org', date: 'Dec 2025', desc: 'Completed a structured program focused on problem solving, business analysis, and communication, applying data-driven thinking to real-world business scenarios. Skills: Problem Solving · Structured Thinking · Business Analysis · Data-Driven Communication +3 more.', link: 'https://www.linkedin.com/in/upasana-prabhakar-634224296/overlay/Certifications/1924562410/treasury/?profileId=ACoAAEeUeIgBnVEOYopl4tj9A_LRZ-fzWbZOmEU' },
  { title: 'Deloitte Australia — Technology Job Simulation', org: 'Deloitte · Forage', date: 'Oct 2025', desc: 'Completed a job simulation involving development and coding in a technology consulting context. Applied data structures and software engineering principles to real-world business problems.', link: 'https://www.linkedin.com/in/upasana-prabhakar-634224296/overlay/Certifications/1388503164/treasury/?profileId=ACoAAEeUeIgBnVEOYopl4tj9A_LRZ-fzWbZOmEU' },
  { title: 'Develop GenAI Apps with Gemini & Streamlit', org: 'Google Cloud', date: 'Aug 2025', desc: 'Google Cloud Skill Badge for building production generative AI applications using Gemini models and Streamlit. Covers prompt engineering, model integration, and deploying AI-powered apps.', link: 'https://www.linkedin.com/in/upasana-prabhakar-634224296/overlay/Certifications/73581600/treasury/?profileId=ACoAAEeUeIgBnVEOYopl4tj9A_LRZ-fzWbZOmEU' },
];

// ─── Nav Sections ─────────────────────────────────────────────────────────────
const NAV_SECTIONS = ['Hero', 'About', 'Skills', 'Work', 'Certs', 'Contact'];

// ─── Custom Cursor ─────────────────────────────────────────────────────────────
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail  = trailRef.current;
    if (!cursor || !trail) return;

    let mx = 0, my = 0;
    let tx = 0, ty = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = `${mx}px`;
      cursor.style.top  = `${my}px`;
    };

    const animate = () => {
      tx += (mx - tx) * 0.12;
      ty += (my - ty) * 0.12;
      trail.style.left = `${tx}px`;
      trail.style.top  = `${ty}px`;
      raf = requestAnimationFrame(animate);
    };

    const onEnterLink = () => cursor.classList.add('cursor-hover');
    const onLeaveLink = () => cursor.classList.remove('cursor-hover');

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });
    animate();

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef}  className="cursor-dot" />
      <div ref={trailRef}   className="cursor-trail" />
    </>
  );
}

// ─── Navigation Dots ───────────────────────────────────────────────────────────
function NavDots({ active }: { active: number }) {
  const scrollToSection = (idx: number) => {
    const sections = document.querySelectorAll('[data-section]');
    sections[idx]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="nav-dots">
      {NAV_SECTIONS.map((label, i) => (
        <button
          key={i}
          className={`nav-dot${active === i ? ' active' : ''}`}
          onClick={() => scrollToSection(i)}
          title={label}
          aria-label={`Go to ${label}`}
        >
          <span className="nav-dot-label">{label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.from(cardRef.current, {
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 60,
      opacity: 0,
      duration: 0.9,
      delay: index * 0.12,
      ease: 'power3.out',
    });
  }, [index]);

  return (
    <div ref={cardRef} className="project-card">
      <div className="project-card-header">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, flexWrap: 'wrap' }}>
          <h3 className="project-title" style={{ color: project.accent }}>
            {project.title}
          </h3>
          {(project as any).award && (
            <span className="project-award" style={{ color: project.accent }}>
              {(project as any).award}
            </span>
          )}
        </div>
        <span className="project-year">{project.year}</span>
      </div>

      <div className="project-role-row">
        {project.role.split('·').map((tag, i) => (
          <span key={i} className="project-role-tag" style={{ color: i === 0 ? project.accent : undefined }}>
            {tag.trim()}
          </span>
        ))}
      </div>

      <div className="project-tech-row">
        {project.tech.map((t) => (
          <span key={t} className="project-tech-chip" style={{ borderColor: `${project.accent}33`, color: 'rgba(255,255,255,0.45)' }}>
            {t}
          </span>
        ))}
      </div>

      <div className="project-divider" style={{ background: `${project.accent}1a` }} />

      <ul className="project-bullets">
        {project.bullets.map((b, i) => (
          <li key={i} className="project-bullet">
            <span className="project-bullet-marker" style={{ color: project.accent }}>›</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="project-link"
        style={{ color: project.accent, borderColor: `${project.accent}44` }}
      >
        View Project ↗
      </a>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const subtitleRef  = useRef<HTMLDivElement>(null);
  const menuRef      = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);

  // ---------- Three.js refs ----------
  const threeRefs = useRef<any>({
    scene: null, camera: null, renderer: null, composer: null,
    stars: [], nebula: null, mountains: [], animationId: null,
    targetCameraX: 0, targetCameraY: 30, targetCameraZ: 300,
    locations: [],
    mouseX: 0, mouseY: 0,
  });
  const smoothCam = useRef({ x: 0, y: 30, z: 300 });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [activeNavDot, setActiveNavDot] = useState(0);
  const [showSpiral, setShowSpiral] = useState(true);
  const [spiralFading, setSpiralFading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const totalSections = 2;

  const handleSpiralComplete = () => {
    setSpiralFading(true);
    setTimeout(() => setShowSpiral(false), 700);
  };

  // ── Three.js ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const refs = threeRefs.current;

    refs.scene = new THREE.Scene();
    refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

    refs.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    refs.camera.position.set(0, 20, 300);

    refs.renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current!, antialias: true, alpha: true });
    refs.renderer.setSize(window.innerWidth, window.innerHeight);
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    refs.renderer.toneMappingExposure = 0.5;

    refs.composer = new EffectComposer(refs.renderer);
    refs.composer.addPass(new RenderPass(refs.scene, refs.camera));
    refs.composer.addPass(new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.35, 0.3, 0.85,
    ));

    // ── Stars (3 depth layers) ──
    for (let layer = 0; layer < 3; layer++) {
      const count = 5000;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      const sz  = new Float32Array(count);

      for (let j = 0; j < count; j++) {
        const r     = 200 + Math.random() * 800;
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(Math.random() * 2 - 1);
        pos[j*3]   = r * Math.sin(phi) * Math.cos(theta);
        pos[j*3+1] = r * Math.sin(phi) * Math.sin(theta);
        pos[j*3+2] = r * Math.cos(phi);

        const c = new THREE.Color();
        const pick = Math.random();
        if (pick < 0.7)       c.setHSL(0, 0, 0.8 + Math.random() * 0.2);
        else if (pick < 0.9)  c.setHSL(0.08, 0.5, 0.8);
        else                  c.setHSL(0.6,  0.5, 0.8);
        col[j*3] = c.r; col[j*3+1] = c.g; col[j*3+2] = c.b;
        sz[j] = Math.random() * 2 + 0.5;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
      geo.setAttribute('size',     new THREE.BufferAttribute(sz,  1));

      const mat = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, depth: { value: layer } },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float time;
          uniform float depth;
          void main() {
            vColor = color;
            vec3 p = position;
            float angle = time * 0.05 * (1.0 - depth * 0.3);
            mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
            p.xy = rot * p.xy;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = size * (300.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float opacity = 1.0 - smoothstep(0.0, 0.5, d);
            gl_FragColor = vec4(vColor, opacity);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const points = new THREE.Points(geo, mat);
      refs.scene.add(points);
      refs.stars.push(points);
    }

    // ── Nebula ──
    const nebGeo = new THREE.PlaneGeometry(8000, 4000, 100, 100);
    const nebMat = new THREE.ShaderMaterial({
      uniforms: {
        time:    { value: 0 },
        color1:  { value: new THREE.Color(0x0033ff) },
        color2:  { value: new THREE.Color(0xff0066) },
        opacity: { value: 0.12 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vElevation;
        uniform float time;
        void main() {
          vUv = uv;
          vec3 pos = position;
          float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
          pos.z += elevation;
          vElevation = elevation;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float opacity;
        uniform float time;
        varying vec2 vUv;
        varying float vElevation;
        void main() {
          float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
          vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
          float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
          alpha *= 1.0 + vElevation * 0.01;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    refs.nebula = new THREE.Mesh(nebGeo, nebMat);
    refs.nebula.position.z = -1050;
    refs.scene.add(refs.nebula);

    // ── Mountains (4 parallax layers) ──
    const mlayers = [
      { distance: -50,  height: 60,  color: 0x1a1a2e, opacity: 1   },
      { distance: -100, height: 80,  color: 0x16213e, opacity: 0.8  },
      { distance: -150, height: 100, color: 0x0f3460, opacity: 0.6  },
      { distance: -200, height: 120, color: 0x0a4668, opacity: 0.4  },
    ];

    mlayers.forEach((layer, idx) => {
      const pts: THREE.Vector2[] = [];
      for (let i = 0; i <= 50; i++) {
        const x = (i / 50 - 0.5) * 1000;
        const y = Math.sin(i * 0.1) * layer.height
                + Math.sin(i * 0.05) * layer.height * 0.5
                + Math.random() * layer.height * 0.2
                - 100;
        pts.push(new THREE.Vector2(x, y));
      }
      pts.push(new THREE.Vector2(5000, -300), new THREE.Vector2(-5000, -300));

      const shape = new THREE.Shape(pts);
      const mesh  = new THREE.Mesh(
        new THREE.ShapeGeometry(shape),
        new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide,
        }),
      );
      mesh.position.set(0, layer.distance, layer.distance);
      mesh.userData = { baseZ: layer.distance, index: idx };
      refs.scene.add(mesh);
      refs.mountains.push(mesh);
    });

    // ── Atmosphere glow ──
    refs.scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(600, 32, 32),
      new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform float time;
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity;
            float pulse = sin(time * 2.0) * 0.1 + 0.9;
            atmosphere *= pulse;
            gl_FragColor = vec4(atmosphere, intensity * 0.25);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
      }),
    ));

    // ── Shooting Stars ──
    const shootingStars: any[] = [];
    refs.shootingStars = shootingStars;

    const spawnShootingStar = () => {
      const geo = new THREE.BufferGeometry();
      const length = 80 + Math.random() * 120;
      const startX = (Math.random() - 0.5) * 600;
      const startY = 80 + Math.random() * 100;
      const startZ = 100 + Math.random() * 80;
      const dx = -(0.6 + Math.random() * 0.4);
      const dy = -(0.5 + Math.random() * 0.5);
      const dz = 0;

      const positions = new Float32Array([
        startX, startY, startZ,
        startX + dx * length, startY + dy * length, startZ,
      ]);
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const mat = new THREE.LineBasicMaterial({
        color: 0xaaccff,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const line = new THREE.Line(geo, mat);
      refs.scene.add(line);

      const star = {
        mesh: line,
        opacity: 0.9,
        life: 0,
        maxLife: 60 + Math.random() * 40,
        vx: dx * 4,
        vy: dy * 4,
      };
      shootingStars.push(star);
    };

    refs.shootingStarTimer = 0;
    refs.locations = refs.mountains.map((m: any) => m.position.z);

    // ── Animation loop ──
    const animate = () => {
      refs.animationId = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;

      refs.stars.forEach((s: any) => {
        if (s.material.uniforms) s.material.uniforms.time.value = t;
      });

      if (refs.nebula?.material?.uniforms) {
        refs.nebula.material.uniforms.time.value = t * 0.5;
      }

      const mouseParallaxX = refs.mouseX * 8;
      const mouseParallaxY = refs.mouseY * 4;

      const ease = 0.05;
      smoothCam.current.x += (refs.targetCameraX + mouseParallaxX - smoothCam.current.x) * ease;
      smoothCam.current.y += (refs.targetCameraY + mouseParallaxY - smoothCam.current.y) * ease;
      smoothCam.current.z += (refs.targetCameraZ - smoothCam.current.z) * ease;

      const floatX = Math.sin(t * 0.1) * 2;
      const floatY = Math.cos(t * 0.15) * 1;

      refs.camera.position.x = smoothCam.current.x + floatX;
      refs.camera.position.y = smoothCam.current.y + floatY;
      refs.camera.position.z = smoothCam.current.z;
      refs.camera.lookAt(0, 10, -600);

      refs.mountains.forEach((m: any, i: number) => {
        const pf = 1 + i * 0.5;
        m.position.x = Math.sin(t * 0.1) * 2 * pf;
        m.position.y = 50 + Math.cos(t * 0.15) * 1 * pf;
      });

      refs.shootingStarTimer = (refs.shootingStarTimer || 0) + 1;
      if (refs.shootingStarTimer > 180 + Math.random() * 180) {
        refs.shootingStarTimer = 0;
        spawnShootingStar();
      }

      for (let i = refs.shootingStars.length - 1; i >= 0; i--) {
        const s = refs.shootingStars[i];
        s.life++;
        s.mesh.position.x += s.vx;
        s.mesh.position.y += s.vy;
        const lifeRatio = s.life / s.maxLife;
        s.mesh.material.opacity = 0.9 * (1 - lifeRatio);

        if (s.life >= s.maxLife) {
          refs.scene.remove(s.mesh);
          s.mesh.geometry.dispose();
          s.mesh.material.dispose();
          refs.shootingStars.splice(i, 1);
        }
      }

      refs.composer.render();
    };

    animate();
    setIsReady(true);

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
      refs.stars.forEach((s: any) => { s.geometry.dispose(); s.material.dispose(); });
      refs.mountains.forEach((m: any) => { m.geometry.dispose(); m.material.dispose(); });
      if (refs.nebula) { refs.nebula.geometry.dispose(); refs.nebula.material.dispose(); }
      refs.shootingStars?.forEach((s: any) => {
        refs.scene.remove(s.mesh);
        s.mesh.geometry.dispose();
        s.mesh.material.dispose();
      });
      refs.renderer.dispose();
    };
  }, []);

  // ── Mouse parallax listener ──
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      threeRefs.current.mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      threeRefs.current.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // ── GSAP hero entrance ──
  useEffect(() => {
    if (!isReady || showSpiral) return;

    gsap.set(
      [menuRef.current, titleRef.current, subtitleRef.current, scrollProgressRef.current],
      { visibility: 'visible' },
    );

    const tl = gsap.timeline();

    if (menuRef.current) {
      tl.from(menuRef.current, { x: -100, opacity: 0, duration: 1, ease: 'power3.out' });
    }

    if (titleRef.current) {
      tl.from(titleRef.current.querySelectorAll('.title-char'), {
        y: 200,
        opacity: 0,
        duration: 1.5,
        stagger: 0.05,
        ease: 'power4.out',
      }, '-=0.5');
    }

    if (subtitleRef.current) {
      tl.from(subtitleRef.current.querySelectorAll('.sub-line'), {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      }, '-=0.8');
    }

    if (scrollProgressRef.current) {
      tl.from(scrollProgressRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
      }, '-=0.5');
    }

    return () => { tl.kill(); };
  }, [isReady, showSpiral]);

  // ── Scroll → camera ──
  useEffect(() => {
    const handleScroll = () => {
      const refs    = threeRefs.current;
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);

      setScrollProgress(progress);
      const newSection = Math.floor(progress * totalSections);
      setCurrentSection(newSection);

      const sections = document.querySelectorAll('[data-section]');
      let activeDot = 0;
      sections.forEach((section, i) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) activeDot = i;
      });
      setActiveNavDot(activeDot);

      const totalProgress   = progress * totalSections;
      const sectionProgress = totalProgress % 1;

      const cameraPositions = [
        { x: 0, y: 30,  z: 300  },
        { x: 0, y: 40,  z: -50  },
        { x: 0, y: 50,  z: -700 },
      ];

      const currentPos = cameraPositions[newSection]     ?? cameraPositions[0];
      const nextPos    = cameraPositions[newSection + 1] ?? currentPos;

      refs.targetCameraX = currentPos.x + (nextPos.x - currentPos.x) * sectionProgress;
      refs.targetCameraY = currentPos.y + (nextPos.y - currentPos.y) * sectionProgress;
      refs.targetCameraZ = currentPos.z + (nextPos.z - currentPos.z) * sectionProgress;

      refs.mountains.forEach((m: any, i: number) => {
        const speed   = 1 + i * 0.9;
        const targetZ = m.userData.baseZ + scrollY * speed * 0.5;

        if (refs.nebula) {
          refs.nebula.position.z = (targetZ + progress * speed * 0.01) - 100;
        }

        m.userData.targetZ = targetZ;

        if (progress > 0.7) {
          m.position.z = 600000;
        } else {
          m.position.z = refs.locations[i];
        }
      });

      if (refs.nebula && refs.mountains[3]) {
        refs.nebula.position.z = refs.mountains[3].position.z;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const splitText = (text: string) =>
    text.split('').map((ch, i) => (
      <span key={i} className="title-char" style={{ display: 'inline-block' }}>
        {ch === ' ' ? '\u00A0' : ch}
      </span>
    ));

  return (
    <>
      {/* ── Custom cursor ── */}
      <CustomCursor />

      {/* ── Spiral intro overlay ── */}
      {showSpiral && (
        <div className={`spiral-overlay${spiralFading ? ' fading' : ''}`}>
          <SpiralAnimation onComplete={handleSpiralComplete} />
        </div>
      )}

      <div style={{ background: '#000814', minHeight: '100vh' }}>

        {/* ── Fixed Three.js canvas ── */}
        <canvas ref={canvasRef} className="portfolio-canvas" />

        {/* ── Side menu ── */}
        <div
          ref={menuRef}
          className="side-menu"
          style={{ visibility: 'hidden' }}
        >
          <div className="menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="vertical-text">SPACE</div>
        </div>

        {/* ── Navigation dots ── */}
        <NavDots active={activeNavDot} />

        {/* ── Scroll progress indicator ── */}
        <div
          ref={scrollProgressRef}
          className="scroll-progress"
          style={{ visibility: 'hidden' }}
        >
          <div className="scroll-text">SCROLL</div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <div className="section-counter">
            {String(currentSection).padStart(2, '0')} / {String(totalSections).padStart(2, '0')}
          </div>
        </div>

        {/* ════════════════════════════════════════
            HERO
        ════════════════════════════════════════ */}
        <section className="hero-section" data-section="0">
          <div style={{ maxWidth: 900, width: '100%', marginRight: 'auto', marginLeft: '0' }}>

            {/* ── Name first ── */}
            <h1
              ref={titleRef}
              style={{
                fontFamily: '"Clash Display","Syne",sans-serif',
                fontSize: 'clamp(3.8rem,11vw,10rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
                color: '#f0f4ff',
                visibility: 'hidden',
              }}
            >
              {splitText('Upasana')}
              <br />
              <span style={{ color: '#4f8ef7' }}>{splitText('Prabhakar')}</span>
            </h1>

            {/* ── Subtitle BELOW the name — sits on dark mountain, always readable ── */}
            <div ref={subtitleRef} style={{ marginTop: 28, visibility: 'hidden' }}>
              <p className="sub-line" style={{
                fontFamily: '"JetBrains Mono","DM Mono",monospace',
                fontSize: 'clamp(0.82rem,1.5vw,1.05rem)',
                fontWeight: 600,
                letterSpacing: '0.38em',
                color: 'rgba(160, 200, 255, 0.85)',
                textTransform: 'uppercase',
              }}>
                Full-Stack Developer &nbsp;·&nbsp; AI Systems Builder
              </p>
            </div>

            {/* ── Contact / links row ── */}
            <div style={{
              marginTop: 16,
              fontFamily: '"JetBrains Mono","DM Mono",monospace',
              fontSize: 'clamp(0.72rem,1vw,0.85rem)',
              fontWeight: 500,
              color: 'rgba(122,163,232,0.75)',
              letterSpacing: '0.08em',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}>
              {/* Line 1 — education */}
              <div>
                B.Tech CSE · Rayat Bahra University · CGPA 8.6 · Graduating 2027
              </div>
              {/* Line 2 — links */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <a href="mailto:upasanaprabhakar35@gmail.com"
                  style={{ color: 'rgba(122,163,232,0.75)', textDecoration: 'none' }}>
                  Email ↗
                </a>
                <a href="https://github.com/upasanaprabhakar" target="_blank" rel="noreferrer"
                  style={{ color: 'rgba(122,163,232,0.75)', textDecoration: 'none' }}>
                  GitHub ↗
                </a>
                <a href="https://linkedin.com/in/upasana-prabhakar-634224296" target="_blank" rel="noreferrer"
                  style={{ color: 'rgba(122,163,232,0.75)', textDecoration: 'none' }}>
                  LinkedIn ↗
                </a>
                <a href="https://leetcode.com/u/Upasana_04/" target="_blank" rel="noreferrer"
                  style={{ color: 'rgba(122,163,232,0.75)', textDecoration: 'none' }}>
                  LeetCode ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            ABOUT
        ════════════════════════════════════════ */}
        <section className="content-section" data-section="1">
          <div className="section-inner">
            <div className="section-eyebrow">About</div>

            <div className="about-layout">
              <div className="about-left">
                <h2 className="about-headline">
                  Building things that<br />
                  <span className="about-headline-accent">actually ship.</span>
                </h2>
                <p className="about-text">
                  I'm a Full-Stack Developer and AI systems builder based in India, currently pursuing
                  B.Tech in Computer Science at Rayat Bahra University (CGPA 8.6, graduating 2027).
                </p>
                <p className="about-text">
                  I don't just build prototypes — I build and deploy production systems that real users
                  interact with. From real-time job tracking platforms to multi-agent AI pipelines, every
                  project I ship is live, tested, and built to scale.
                </p>
                <p className="about-text">
                  Ranked{'  '}<span className="about-inline-highlight">Top 7 among 500+ participants</span>{' '}
                  at HackFest 2 (GDG Cloud New Delhi). Completed an AI/ML internship at Infosys Springboard
                  building production-grade network intrusion detection systems. Certified by McKinsey,
                  Google Cloud, and Deloitte.
                </p>
                <div className="about-stats">
                  <div className="about-stat">
                    <span className="about-stat-num">3+</span>
                    <span className="about-stat-label">Production Apps Live</span>
                  </div>
                  <div className="about-stat">
                    <span className="about-stat-num">Top 7</span>
                    <span className="about-stat-label">of 500+ at HackFest 2</span>
                  </div>
                  <div className="about-stat">
                    <span className="about-stat-num">8.6</span>
                    <span className="about-stat-label">CGPA · B.Tech CSE</span>
                  </div>
                  <div className="about-stat">
                    <span className="about-stat-num">4+</span>
                    <span className="about-stat-label">Certifications Earned</span>
                  </div>
                </div>
              </div>

              <div className="about-right">
                <div className="exp-card">
                  <div className="exp-eyebrow">Experience</div>
                  <div className="exp-title">AI/ML Intern — Infosys Springboard</div>
                  <div className="exp-meta">Aug – Oct 2025 &nbsp;·&nbsp; Remote</div>
                  {[
                    'Built ensemble ML models (Decision Trees, Random Forests, Gradient Boosting) for network anomaly detection, selecting the best-performing model for production deployment.',
                    'Designed a complete ML pipeline covering SMOTE-based class balancing, feature engineering, and cross-validation — improving model robustness and reducing false positives by 25%.',
                    'Delivered a production-ready system with a full test suite, enabling seamless team handoff and deployment.',
                  ].map((b, i) => (
                    <div key={i} className="exp-bullet">
                      <span className="exp-bullet-dot">◆</span>{b}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════
            SKILLS
        ════════════════════════════════════════ */}
        <section className="content-section" data-section="2">
          <div className="section-inner">
            <div className="section-eyebrow">Skills</div>
            <div className="skills-grid">
              {SKILLS.map((s) => (
                <div key={s.label} className="skill-card">
                  <div className="skill-label">{s.label}</div>
                  <div className="skill-value">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            PROJECTS
        ════════════════════════════════════════ */}
        <section className="content-section" data-section="3">
          <div className="section-inner">
            <div className="section-eyebrow">Selected Work</div>
            <div className="projects-list">
              {PROJECTS.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            CERTIFICATIONS
        ════════════════════════════════════════ */}
        <section className="content-section" data-section="4">
          <div className="section-inner">
            <div className="section-eyebrow">Certifications &amp; Awards</div>
            <div className="cert-list">
              {CERTS.map((c, i) => (
                <div key={i} className="cert-card">
                  <div className="cert-title">{c.title}</div>
                  <div className="cert-date">{c.date}</div>
                  <div className="cert-org">{c.org}</div>
                  <div className="cert-desc">{c.desc}</div>
                  {c.link && (
                    <a href={c.link} target="_blank" rel="noreferrer" className="cert-link">
                      View Certificate ↗
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            CONTACT
        ════════════════════════════════════════ */}
        <section className="contact-section" data-section="5">
          <div style={{ maxWidth: 700, width: '100%' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center', marginBottom: 36 }}>
              <span>Get In Touch</span>
            </div>
            <h2 className="contact-headline">
              Let&rsquo;s Build<br />
              <span style={{ color: '#4f8ef7' }}>Something.</span>
            </h2>
            <p className="contact-sub">
              Open to full-time roles, internships, and interesting collaborations
              in full-stack development and AI engineering.
            </p>

            <a
              href="mailto:upasanaprabhakar35@gmail.com"
              className="contact-beacon"
            >
              <span className="contact-beacon-pulse" />
              <span className="contact-beacon-ring" />
              <span className="contact-beacon-text">Send a Message</span>
              <span className="contact-beacon-arrow">↗</span>
            </a>

            <div className="contact-links">
              <a className="contact-link" href="mailto:upasanaprabhakar35@gmail.com">Email ↗</a>
              <a className="contact-link" href="https://github.com/upasanaprabhakar" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a className="contact-link" href="https://linkedin.com/in/upasana-prabhakar-634224296" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
            <div className="contact-footer">Upasana Prabhakar · 2026</div>
          </div>
        </section>

      </div>
    </>
  );
}