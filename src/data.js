export const profile = {
  name: 'Adrian Świeca',
  title: 'Computer Science Student',
  summary:
    'I work with SQL (PostgreSQL) and NoSQL (MongoDB). I enjoy designing simple solutions, writing clean code, and automating processes while actively developing my skills.',
  focus: ['Java', 'JavaScript', 'Spring / Spring Boot', 'React', 'SQL', 'PostgreSQL', 'MongoDB', 'REST / API', 'English (B2+/C1)'],
  about:
    'I am a Computer Science student aiming to become a full‑stack developer. I build web apps from backend (Java, Spring) to frontend (React/JS). I design relational schemas in PostgreSQL, use MongoDB when it fits, and I actively develop my skills with a focus on testability, performance, and readable code.',
  englishLevel: 'B2+/C1',
}

export const links = {
  github: 'https://github.com/kollekka',
  linkedin: '',
  email: 'adrianswieca@gmail.com',
}

export const skills = [
  { category: 'Backend (Java)', items: ['Java 17+', 'Spring Boot', 'Spring Data', 'JPA/Hibernate', 'REST', 'Maven/Gradle', 'PHP', 'Laravel'] },
  { category: 'Frontend (JS)', items: ['JavaScript (ESNext)', 'React', 'Vite', 'HTML5', 'CSS3'] },
  { category: 'Databases', items: ['SQL', 'PostgreSQL', 'MySQL', 'MongoDB'] },
]

export const projects = [
  {
    title: 'Portfolio – this site',
    description:
      'Responsive portfolio built with React + Vite, ready for hosting on GitHub Pages. Sections: About, Skills, Projects, Certificates.',
    tech: ['React', 'Vite', 'CSS'],
    demo: '',
    repo: '',
  },
  {
    title: 'SubGuard',
    description:
      'Full‑stack app for managing subscriptions and warranties. Email reminders are sent for both upcoming renewals and expiring warranties. Tech: React + Vite + TanStack Query + Spring Boot + PostgreSQL. Code is private for now.',
    tech: ['React', 'Vite', 'TanStack Query', 'Spring Boot', 'PostgreSQL'],
    demo: 'https://subguard-frontend.vercel.app/',
    repo: '',
  },
  {
    title: 'Sample API (Java/Spring)',
    description:
      'Sample REST API in Spring Boot with persistence in PostgreSQL. A project to show layered architecture, tests, and API documentation.',
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'REST'],
    demo: '',
    repo: 'https://github.com/kollekka',
  },
  {
    title: 'TODO App (React + Node)',
    description:
      'Simple CRUD app with React frontend and Node/Express or Java backend — depending on the version. Data stored in MongoDB.',
    tech: ['React', 'Node/Express', 'MongoDB'],
    demo: '',
    repo: 'https://github.com/kollekka',
  },
]

export const certificates = [
  { name: 'Vocational Qualification Certificate (INF.02/INF.03)' },
  {
    name: 'Umiejętności Jutra — Certificate',
    issuer: 'Umiejętności Jutra',
    link: 'https://szkolenia.umiejetnoscijutra.pl/panel/auth/login',
    image: 'certyfikat.png',
  },
  {
    name: '[NEW] Spring Boot 3, Spring 6 & Hibernate for Beginners',
    issuer: 'Udemy',
    image: 'UC-b9d3ab00-a525-4efd-bad2-8c03538bd13c.jpg',
  },
]

export const experience = [
  { role: 'Student internship', company: 'GlobiHome', period: 'Aug 11, 2025 — Oct 5, 2025', details: 'Data quality analysis; Working with AI for data processing; Sourcing datasets for processing.' },
  { role: 'Store redevelopment', company: 'MediaExpert', period: '2023' },
  { role: 'Technical school internship', company: 'Infomech Stalowa Wola', period: '2022', details: 'Assisted across tasks; worked with the Microsoft Office suite.' },
]

export const education = [
  { degree: 'Computer Science and Econometrics — B.Eng. (specialization: Information Systems in Management) — Rector’s scholarship (merit)', school: 'University of Rzeszów', period: '2023 — present' },
  { degree: 'IT Technician (High School — Technical Secondary School)', school: 'Centrum Edukacji Zawodowej, Stalowa Wola', period: '2019 — 2023' },
]
