import './App.css'
import { useEffect, useState } from 'react'
import { iconFor, iconUrlFor, domainFor } from './utils'
import { profile, skills, projects, certificates, links, education, experience } from './data'

function Icon({ name }) {
  const url = iconUrlFor(name)
  if (url) {
    return <img className="ico img-ico" src={url} alt="" loading="lazy" />
  }
  return <span className="ico" aria-hidden>{iconFor(name)}</span>
}

function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <a href="#home" className="brand">{profile.name}<span className="accent">.</span></a>
        <nav>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#education">Education</a>
          <a href="#certs">Certificates</a>
          <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="section hero">
      <div className="container hero-grid">
        <div>
          <h1>Hi, I'm {profile.name}</h1>
          <p className="lead">{profile.title}</p>
          <p className="muted">{`${profile.summary} ${profile.about}`}</p>
          <div className="cta-row">
            <a className="btn primary" href="#projects">View projects</a>
            <a className="btn" href={links.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
        <div className="hero-card">
          <h3>Core strengths</h3>
          <ul className="pill-list">
            {profile.focus.map((t) => (
              <li key={t} className="pill" data-skill={t} data-domain={domainFor(t)}>
                <Icon name={t} />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section alt">
      <div className="container">
        <h2>Skills</h2>
        <div className="skills-grid">
          {skills.map((group) => (
            <div key={group.category} className="card">
              <h3>{group.category}</h3>
              <ul className="tag-grid">
                {group.items.map((s) => (
                                <li key={s} className="tag" data-skill={s} data-domain={domainFor(s, group.category)}>
                                  <Icon name={s} />
                                  {s}
                                </li>
                              ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2>Projects</h2>
        <div className="cards">
          {projects.map((p) => (
            <article key={p.title} className="card project">
              <div className="project-header">
                <h3>{p.title}</h3>
                {p.tech && (
                  <div className="project-tech">
                    {p.tech.map((t) => (
                      <span key={t} className="tag tech" data-skill={t} data-domain={domainFor(t)}>
                        <Icon name={t} />
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <p className="muted">{p.description}</p>
              <div className="project-links">
                {p.demo && <a className="btn" href={p.demo} target="_blank" rel="noreferrer">Demo</a>}
                {p.repo && <a className="btn" href={p.repo} target="_blank" rel="noreferrer">Code</a>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="section alt">
      <div className="container">
        <h2><span className="ico" aria-hidden>💼</span>Experience</h2>
        <ul className="timeline">
          {experience.map((e) => (
            <li key={e.role + e.company} className="timeline-item">
              <span className="timeline-dot" aria-hidden></span>
              <div className="timeline-head">
                <div className="tl-title">
                  <strong>{e.role}</strong>
                  <span className="muted"> • {e.company}</span>
                </div>
                <span className="badge period">{e.period}</span>
              </div>
              {e.details && <p className="muted small">{e.details}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Education() {
  return (
    <section id="education" className="section alt">
      <div className="container">
        <h2><span className="ico" aria-hidden>🎓</span>Education</h2>
        <ul className="timeline education">
          {education.map((ed) => (
            <li key={ed.degree + ed.school} className="timeline-item">
              <span className="timeline-dot" aria-hidden></span>
              <div className="timeline-head">
                <div className="tl-title">
                  <strong>{ed.degree}</strong>
                  <span className="muted"> • {ed.school}</span>
                </div>
                <span className="badge period">{ed.period}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Certificates() {
  const [openCert, setOpenCert] = useState(null)

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpenCert(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section id="certs" className="section alt">
      <div className="container">
        <h2>Certificates</h2>
          <>
            <ul className="cert-list">
              {certificates.map((c) => (
                <li key={c.name} className="cert-item">
                  <div>
                    <strong>{c.name}</strong>
                    {c.issuer && <span className="muted"> • {c.issuer}</span>}
                  </div>
                  <button className="btn" onClick={() => setOpenCert(c)}>Show</button>
                </li>
              ))}
            </ul>

            {openCert && (
              <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={`${openCert.name} certificate`} onClick={() => setOpenCert(null)}>
                <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                  <button className="modal-close" aria-label="Close" onClick={() => setOpenCert(null)}>×</button>
                  <div className="modal-body">
                    {openCert.image && openCert.image.toLowerCase().endsWith('.pdf') ? (
                      <object data={openCert.image} type="application/pdf" className="cert-embed">
                        <iframe src={openCert.image} className="cert-embed" title={`${openCert.name} certificate PDF`}></iframe>
                      </object>
                    ) : (
                      <img
                        src={openCert.image || '/cert-placeholder.svg'}
                        alt={`${openCert.name} certificate preview`}
                        className="cert-image"
                        loading="lazy"
                      />
                    )}
                    {openCert.link && (
                      <div className="modal-actions">
                        <a className="btn" href={openCert.link} target="_blank" rel="noreferrer">Open link</a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
      </div>
    </section>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong>{profile.name}</strong>
          <div className="muted small">© {year} • Built with React + Vite</div>
        </div>
        <div className="socials">
          {links.github && (
            <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
              GitHub
            </a>
          )}
          {links.linkedin && (
            <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
              LinkedIn
            </a>
          )}
          {links.email && (
            <a href={`mailto:${links.email}`} aria-label="Send email">
              Email
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certificates />
      <Footer />
    </>
  )
}

export default App
