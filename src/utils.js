
export function iconUrlFor(name) {
  const n = String(name).toLowerCase()
  if (n.includes('java') && !n.includes('javascript')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'
  if (n.includes('spring')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg'
  if (n.includes('react') && !n.includes('query') && !n.includes('native')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
  if (n.includes('query') || n.includes('tanstack')) return 'https://cdn.jsdelivr.net/npm/@dev.icons/core@latest/export-files/icons/react-query.svg'
  if (n.includes('javascript')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
  if (n.includes('html')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
  if (n.includes('css')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
  if (n.includes('postgres')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'
  if (n.includes('mysql')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'
  if (n.includes('mongo')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'
  if (n.includes('docker')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'
  if (n.includes('node')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
  if (n.includes('php')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg'
  if (n.includes('laravel')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg'
  if (n.includes('vite')) return 'https://vitejs.dev/logo.svg'
  if (n.includes('rest') || n.includes('api')) return 'https://cdn-icons-png.flaticon.com/512/12509/12509163.png'
  if (n.includes('git')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
  if (n.includes('python')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
  if (n.includes('kotlin')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg'
  if (n.includes('firebase')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg'
  if (n.includes('material') || n.includes('compose')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg'
  if (n.includes('sql') || n.includes('database')) return 'https://cdn-icons-png.flaticon.com/512/4299/4299957.png'
  return ''
}

export function iconFor(name) {
  const n = String(name).toLowerCase()
  if (n.includes('java ') || n === 'java' || n.startsWith('java')) return '☕'
  if (n.includes('spring')) return '🌱'
  if (n.includes('react')) return '⚛️'
  if (n.includes('javascript')) return '🟨'
  if (n.includes('html')) return '🟧'
  if (n.includes('css')) return '🟦'
  if (n.includes('postgres')) return '🐘'
  if (n.includes('mysql')) return '🐬'
  if (n.includes('mongo')) return '🍃'
  if (n.includes('sql')) return '🗄️'
  if (n.includes('docker')) return '🐳'
  if (n.includes('junit')) return '✅'
  if (n.includes('maven') || n.includes('gradle')) return '🔧'
  if (n.includes('rest')) return '🔗'
  if (n.includes('vite')) return '⚡'
  if (n.includes('git')) return '🔀'
  if (n.includes('php')) return '🔷'
  if (n.includes('laravel')) return '🟥'
  if (n.includes('english') || n.includes('angielski')) return '🗣️'
  return '•'
}

export function domainFor(name, categoryHint) {
  const n = String(name).toLowerCase()
  const hint = (categoryHint || '').toLowerCase()
  if (hint.includes('backend')) return 'backend'
  if (hint.includes('frontend')) return 'frontend'
  if (hint.includes('database') || hint.includes('bazy')) return 'db'
  if (hint.includes('inne') || hint.includes('other')) return 'other'
  if (n.includes('spring') || n.includes('jpa') || n.includes('hibernate') || n.includes('java') || n.includes('junit') || n.includes('php') || n.includes('laravel')) return 'backend'
  if (n.includes('react') || n.includes('javascript') || n.includes('html') || n.includes('css') || n.includes('vite')) return 'frontend'
  if (n.includes('sql') || n.includes('postgres') || n.includes('mongo') || n.includes('database')) return 'db'
  return 'other'
}
