
export function iconUrlFor(name) {
  const n = String(name).toLowerCase()
  if (n.includes('java')) return 'https://cdn-icons-png.flaticon.com/512/5968/5968282.png'
  if (n.includes('spring boot') || n.includes('spring')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg'
  if (n.includes('react')) return 'https://cdn-icons-png.flaticon.com/512/1126/1126012.png'
  if (n.includes('javascript')) return 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png'
  if (n.includes('html')) return 'https://cdn-icons-png.flaticon.com/512/5968/5968267.png'
  if (n.includes('css')) return 'https://cdn-icons-png.flaticon.com/512/5968/5968242.png'
  if (n.includes('postgres')) return 'https://cdn-icons-png.flaticon.com/512/5968/5968342.png'
  if (n.includes('mysql')) return 'https://cdn-icons-png.flaticon.com/512/5968/5968313.png'
  if (n.includes('mongo')) return 'https://cdn-icons-png.flaticon.com/512/6124/6124995.png'
  if (n.includes('docker')) return 'https://cdn-icons-png.flaticon.com/512/919/919853.png'
  if (n.includes('node')) return 'https://cdn-icons-png.flaticon.com/512/919/919825.png'
  if (n.includes('php')) return 'https://cdn-icons-png.flaticon.com/512/5968/5968332.png'
  if (n.includes('laravel')) return 'https://cdn-icons-png.flaticon.com/512/5968/5968331.png'
  if (n.includes('vite')) return 'https://vitejs.dev/logo.svg'
  if (n.includes('rest') || n.includes('api')) return 'https://cdn-icons-png.flaticon.com/512/12509/12509163.png'
  if (n.includes('git')) return 'https://cdn-icons-png.flaticon.com/512/2111/2111288.png'
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
