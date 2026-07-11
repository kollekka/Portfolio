import './App.css'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { iconFor, iconUrlFor, domainFor } from './utils'
import RollingText from './RollingText'
import GlitchText from './GlitchText'
import Galaxy from './Galaxy'
import CometCursor from './CometCursor'
import TiltCard from './TiltCard'
import ArcCarousel from './ArcCarousel'
import WiringDiagram from './WiringDiagram'
import StarBorder from './StarBorder'
import DropText from './DropText'
import { profile, skills, projects, certificates, links, education, experience } from './data'

function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )
    document.querySelectorAll('[data-reveal]').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function Icon({ name }) {
  const url = iconUrlFor(name)
  if (url) return <img className="ico img-ico" src={url} alt="" loading="lazy" />
  return <span className="ico" aria-hidden>{iconFor(name)}</span>
}

const projectBanners = [
  { gradient: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)', icon: '🖥️' },
  { gradient: 'linear-gradient(135deg, #1d4ed8 0%, #22d3ee 100%)', icon: '🛡️' },
  { gradient: 'linear-gradient(135deg, #c2410c 0%, #fb923c 100%)', icon: '⚙️' },
  { gradient: 'linear-gradient(135deg, #047857 0%, #34d399 100%)', icon: '📋' },
  { gradient: 'linear-gradient(135deg, #b91c1c 0%, #f87171 100%)', icon: '💊' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#home" className="brand">{profile.name}</a>
        <button className="menu-btn" aria-label="Menu" onClick={() => setOpen(!open)}>
          <span className={`hamb ${open ? 'active' : ''}`} />
        </button>
        <nav className={open ? 'open' : ''}>
          <a href="#work" onClick={() => setOpen(false)}>Work</a>
          <a href="#skills" onClick={() => setOpen(false)}>Skills</a>
          <a href="#experience" onClick={() => setOpen(false)}>Exp.</a>
          <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
          <a href={`mailto:${links.email}`} className="nav-cta" onClick={() => setOpen(false)}>Contact</a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-aurora" />
      <div className="container">
        <div className="hero-content">
          <motion.span
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Computer Science Student
          </motion.span>
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <RollingText text={`Hi, I'm ${profile.name.split(' ')[0]}`} rollDuration={1.4} staggerDelay={0.07} duplicateCount={6} />
            <span className="accent-dot">.</span>
          </motion.h1>
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >{profile.summary}</motion.p>
          <motion.p
            className="hero-about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >{profile.about}</motion.p>
          <motion.div
            className="hero-acts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <StarBorder color="#22d3ee" speed={3} as="a" className="btn primary hero-btn" href="#work">
              View my work
            </StarBorder>
            <a className="btn" href={`mailto:${links.email}`}>Get in touch</a>
          </motion.div>
          <motion.div
            className="hero-tags"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {profile.focus.map((t, i) => (
              <span key={t} className="htag" style={{ '--i': i }}>
                <Icon name={t} />{t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index, isActive = false }) {
  const banner = projectBanners[index % projectBanners.length]
  return (
    <article className={`project-card${isActive ? ' active' : ''}`}>
      <div className={`project-card-border${isActive ? ' active' : ''}`} />
      <div className="project-banner" style={{ background: banner?.gradient }}>
        <span className="project-banner-icon">{banner?.icon}</span>
        <span className="project-banner-num">{(String(index + 1)).padStart(2, '0')}</span>
      </div>
      <div className="project-body">
        <div className="project-tags">
          {project.tech?.map((t) => (
            <span key={t} className="ptag" data-domain={domainFor(t)}>{t}</span>
          ))}
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
      <div className="project-bot">
        {project.repo && <a className="btn" href={project.repo} target="_blank" rel="noreferrer">Repository</a>}
        {project.demo && (
          <StarBorder color="#a78bfa" speed={3} thickness={1}>
            <a className="btn primary" href={project.demo} target="_blank" rel="noreferrer">Live Demo</a>
          </StarBorder>
        )}
      </div>
    </article>
  )
}

function Projects() {
  const projectsWithIds = projects.map((p, i) => ({ ...p, _origIdx: i }))

  return (
    <section id="work" className="section" data-reveal>
      <div className="container">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >Work</motion.span>
        <motion.h2
          data-heading="Featured Projects"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlitchText text="Featured Projects" fontSize={64} baseIntensity={0.12} hoverIntensity={0.45} />
        </motion.h2>
        <motion.p
          className="section-desc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 40, maxWidth: 500 }}
        >Drag or scroll to browse through projects</motion.p>
        <div className="carousel-wrap">
          <ArcCarousel
            items={projectsWithIds}
            renderItem={(p, i, isActive) => (
              <ProjectCard project={p} index={i} isActive={isActive} />
            )}
          />
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section" data-reveal>
      <div className="container">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >Expertise</motion.span>
        <motion.h2
          data-heading="Skills & Technologies"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GlitchText text="Skills & Technologies" fontSize={64} baseIntensity={0.12} hoverIntensity={0.45} />
        </motion.h2>

        <WiringDiagram skills={skills} />
      </div>
    </section>
  )
}

function Experience() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="experience" className="section" data-reveal>
      <div className="container">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >Career</motion.span>
        <motion.h2
          data-heading="Experience"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GlitchText text="Experience" fontSize={64} baseIntensity={0.12} hoverIntensity={0.45} />
        </motion.h2>

        <div className="exp-layout">
          <div className="exp-list">
            {experience.map((e, i) => (
              <motion.button
                key={i}
                className={`exp-badge${selected === i ? ' active' : ''}`}
                onClick={() => setSelected(selected === i ? null : i)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="exp-badge-glow" />
                <div className="exp-badge-body">
                  <span className="exp-badge-co">{e.company}</span>
                  <span className="exp-badge-role">{e.role}</span>
                  <span className="exp-badge-date">{e.period}</span>
                </div>
                <div className="exp-badge-ind" />
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {selected !== null ? (
              <motion.div
                key={`detail-${selected}`}
                className="exp-detail"
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.8 }}
              >
                <motion.div
                  className="exp-detail-inner"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="exp-detail-border" />
                  <motion.div
                    className="exp-detail-top"
                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}
                  >
                    <DropText text={experience[selected].role} as="h3" delay={0.1} />
                    <span className="exp-detail-co">{experience[selected].company}</span>
                    <span className="exp-detail-date">{experience[selected].period}</span>
                  </motion.div>
                  <motion.p
                    className="exp-detail-desc"
                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}
                  >{experience[selected].description}</motion.p>
                  {experience[selected].highlights?.length > 0 && (
                    <motion.ul
                      className="exp-detail-list"
                      variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.04 } },
                      }}
                    >
                      {experience[selected].highlights.map((h, j) => (
                        <motion.li
                          key={j}
                          variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3 } } }}
                        >{h}</motion.li>
                      ))}
                    </motion.ul>
                  )}
                  {experience[selected].tech?.length > 0 && (
                    <motion.div
                      className="exp-detail-tech"
                      variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.03 } },
                      }}
                    >
                      {experience[selected].tech.map((t) => (
                        <motion.span
                          key={t}
                          className="ptag"
                          variants={{ hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } } }}
                        >{t}</motion.span>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="exp-detail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="exp-detail-empty">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="9" y1="9" x2="15" y2="9" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="12" y2="17" />
                  </svg>
                  <span>Select a position to view details</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function Education() {
  return (
    <section id="education" className="section" data-reveal>
      <div className="container">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >Learning</motion.span>
        <motion.h2
          data-heading="Education"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GlitchText text="Education" fontSize={64} baseIntensity={0.12} hoverIntensity={0.45} />
        </motion.h2>
        <div className="edu-grid">
          {education.map((ed, i) => (
            <TiltCard key={ed.degree + ed.school} glowColor="rgba(34,211,238,0.1)" borderGradient="conic-gradient(from 0deg, #22d3ee, #a78bfa, #22d3ee)" floating={true}>
              <motion.div
                className="ecard"
                style={{ '--i': i }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="ecard-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5"/></svg>
                </div>
                <div>
                  <strong>{ed.degree}</strong>
                  <div className="ecard-meta">
                    <span>{ed.school}</span>
                    <span className="ecard-date">{ed.period}</span>
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

function Certificates() {
  const [openCert, setOpenCert] = useState(null)
  useEffect(() => {
    if (!openCert) return
    const onKey = (e) => { if (e.key === 'Escape') setOpenCert(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openCert])

  return (
    <section id="certs" className="section alt" data-reveal>
      <div className="container">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >Credentials</motion.span>
        <motion.h2
          data-heading="Certificates"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GlitchText text="Certificates" fontSize={64} baseIntensity={0.12} hoverIntensity={0.45} />
        </motion.h2>
        <div className="cgrid">
          {certificates.map((c, i) => (
            <TiltCard key={c.name} glowColor="rgba(217,70,239,0.1)" borderGradient="conic-gradient(from 0deg, #d946ef, #a78bfa, #d946ef)" floating={false}>
              <motion.button
                className="ccard"
                style={{ '--i': i }}
                onClick={() => setOpenCert(c)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <strong>{c.name}</strong>
                <span className="ccard-issuer">{c.issuer || '\u00A0'}</span>
              </motion.button>
            </TiltCard>
          ))}
        </div>

        {openCert && (
          <motion.div
            className="modal-wrap"
            role="dialog"
            aria-modal="true"
            aria-label={openCert.name}
            onClick={() => setOpenCert(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <button className="modal-x" aria-label="Close" onClick={() => setOpenCert(null)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
              <div className="modal-body">
                {openCert.image && openCert.image.toLowerCase().endsWith('.pdf') ? (
                  <object data={openCert.image} type="application/pdf" className="cembed">
                    <iframe src={openCert.image} className="cembed" title={openCert.name} />
                  </object>
                ) : (
                  <img src={openCert.image || '/cert-placeholder.svg'} alt={openCert.name} className="cimg" loading="lazy" />
                )}
                {openCert.link && (
                  <div className="modal-acts">
                    <StarBorder color="#a78bfa" speed={3}>
                      <a className="btn primary" href={openCert.link} target="_blank" rel="noreferrer">Verify</a>
                    </StarBorder>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

function Faq() {
  const [active, setActive] = useState(null)
  const faqs = [
    { q: 'What technologies do you work with?', a: 'I specialize in Java with Spring Boot, PHP with Laravel, and React with JavaScript on the frontend. I work with PostgreSQL, MySQL, and MongoDB for databases, and I have experience with Python (Odoo ERP) and basic R.' },
    { q: 'What is your development process?', a: 'I follow a clean architecture approach — starting with requirements, designing the data model, implementing the backend API, and then building the frontend. I focus on writing testable, maintainable code.' },
    { q: 'Are you currently available for opportunities?', a: 'Yes! I\'m actively looking for internships and junior developer roles. Feel free to reach out via email.' },
    { q: 'What level is your English?', a: `My English is at ${profile.englishLevel || 'C1 CAE'} level — I hold a CAE certificate and can communicate fluently in professional settings. I am also learning Spanish at A2 level.` },
  ]

  return (
    <section id="faq" className="section" data-reveal>
      <div className="container">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >FAQ</motion.span>
        <motion.h2
          data-heading="Frequently Asked Questions"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GlitchText text="Frequently Asked Questions" fontSize={64} baseIntensity={0.12} hoverIntensity={0.45} />
        </motion.h2>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className={`fi${active === i ? ' open' : ''}`}
              style={{ '--i': i }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <button className="fq" onClick={() => setActive(active === i ? null : i)}>
                <span>{faq.q}</span>
                <svg className="fc" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div className="fa">
                <p>{faq.a}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container f-inner">
        <div className="f-brand">
          <strong>{profile.name}</strong>
          <span className="f-copy">&copy; {year}</span>
        </div>
        <div className="f-links">
          {links.github && <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>}
          {links.linkedin && <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
          {links.email && <a href={`mailto:${links.email}`}>Email</a>}
        </div>
      </div>
    </footer>
  )
}

function App() {
  useScrollReveal()
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <>
      <Galaxy
        density={0.8}
        hueShift={200}
        speed={0.8}
        starSpeed={0.4}
        glowIntensity={0.4}
        twinkleIntensity={0.4}
        rotationSpeed={0.05}
        mouseRepulsion={true}
        disableAnimation={prefersReduced}
      />
      <CometCursor />
      <div className="noise" />
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Education />
      <Certificates />
      <Faq />
      <Footer />
    </>
  )
}

export default App
