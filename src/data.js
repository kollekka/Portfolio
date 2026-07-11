export const profile = {
  name: 'Adrian Świeca',
  title: 'Computer Science Student',
  summary:
    'I work with SQL (PostgreSQL) and NoSQL (MongoDB). I enjoy designing simple solutions, writing clean code, and automating processes while actively developing my skills.',
  focus: ['Java', 'Spring / Spring Boot', 'JavaScript', 'React', 'PHP', 'Laravel', 'Node/Express', 'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Python', 'English (C1 CAE)', 'Spanish (A2)'],
  about:
    'I am a Computer Science and Econometrics student at the University of Rzeszów, specializing in Information Systems in Management, with a rector’s scholarship. I am aiming to become a full‑stack developer — I build web apps from backend (Java, Spring, PHP/Laravel) to frontend (React/JS). I design relational schemas in PostgreSQL and MySQL, use MongoDB when it fits, and I actively develop my skills with a focus on testability, performance, and readable code. I also have experience with Python (Odoo ERP modules) and basic R.',
  englishLevel: 'C1 CAE',
}

export const links = {
  github: 'https://github.com/kollekka',
  linkedin: '',
  email: 'adrianswieca@gmail.com',
}

export const skills = [
  { category: 'Backend', items: ['Java 17+', 'Spring Boot', 'PHP', 'Laravel', 'Node/Express', 'REST / API', 'Python'] },
  { category: 'Frontend', items: ['JavaScript (ESNext)', 'React', 'HTML5', 'CSS3'] },
  { category: 'Databases', items: ['SQL', 'PostgreSQL', 'MySQL', 'MongoDB'] },
]

export const projects = [
  {
    title: 'Portfolio – this site',
    description:
      'Responsive portfolio built with React + Vite, ready for hosting on GitHub Pages. Sections: About, Skills, Projects, Certificates.',
    tech: ['React', 'Vite', 'CSS'],
    demo: '',
    repo: 'https://github.com/kollekka/Portfolio',
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
    repo: 'https://github.com/kollekka/GymTracker',
  },
  {
    title: 'TODO App (React + Node)',
    description:
      'Simple CRUD app with React frontend and Node/Express or Java backend — depending on the version. Data stored in MongoDB.',
    tech: ['React', 'Node/Express', 'MongoDB'],
    demo: '',
    repo: 'https://github.com/kollekka/To-Do',
  },
  {
    title: 'MedReminder – Android App',
    description:
      'Android app for planning medications and appointments with push reminders, daily dose overview, dark mode, and PL/EN language support. Uses Firebase for auth and cloud storage.',
    tech: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Material 3'],
    demo: '',
    repo: 'https://github.com/kollekka/MedReminder',
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
  {
    name: 'C1 Advanced (CAE) — Certificate in Advanced English',
    issuer: 'Cambridge Assessment English',
  },
]

export const experience = [
  {
    role: 'Student internship — Data Analyst',
    company: 'GlobiHome',
    period: 'Aug 11, 2025 — Oct 5, 2025',
    details: 'Data quality analysis; Working with AI for data processing; Sourcing datasets for processing.',
    description: 'At GlobiHome I focused on data quality analysis, ensuring the accuracy and consistency of large datasets used for business intelligence. I worked closely with AI tools to automate data processing pipelines and sourced relevant datasets from various internal systems to support analytical models.',
    highlights: [
      'Performed data quality audits on 10k+ records',
      'Implemented automated data cleaning scripts in Python',
      'Collaborated with the BI team on reporting dashboards',
    ],
    tech: ['Python', 'Pandas', 'Excel', 'SQL'],
  },
  {
    role: 'ERP Implementer / Python Developer (internship)',
    company: 'Psilon',
    period: '2025',
    details: 'Writing Odoo ERP modules in Python; Preparing demo versions for clients; Writing technical documentation.',
    description: 'At Psilon I developed custom Odoo ERP modules tailored to client business requirements. I prepared demo environments for sales presentations and wrote technical documentation for both internal use and client handover. This role strengthened my Python skills and introduced me to enterprise software workflows.',
    highlights: [
      'Built 3 custom Odoo modules for inventory & CRM',
      'Configured demo environments for client onboarding',
      'Authored technical specifications and user guides',
    ],
    tech: ['Python', 'Odoo', 'PostgreSQL', 'XML', 'Linux'],
  },
  {
    role: 'Technical school internship',
    company: 'Infomech Stalowa Wola',
    period: '2022',
    details: 'Assisted across tasks; worked with the Microsoft Office suite.',
    description: 'At Infomech I supported the IT team with a variety of administrative and technical tasks. I worked extensively with the Microsoft Office suite to prepare documentation, reports, and presentations. This internship provided foundational experience in a professional IT environment.',
    highlights: [
      'Prepared technical documentation and reports',
      'Provided desktop support for office staff',
      'Organised and maintained digital file archives',
    ],
    tech: ['Microsoft Office', 'Windows', 'IT Support'],
  },
]

export const education = [
  { degree: 'Computer Science and Econometrics — B.Eng. (specialization: Information Systems in Management) — Rector’s scholarship (merit)', school: 'University of Rzeszów', period: '2023 — present' },
  { degree: 'IT Technician (High School — Technical Secondary School)', school: 'Centrum Edukacji Zawodowej, Stalowa Wola', period: '2019 — 2023' },
]
