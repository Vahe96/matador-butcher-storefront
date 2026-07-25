const baseUrl = import.meta.env.BASE_URL

export function sitePath(path = '') {
  return `${baseUrl}${String(path).replace(/^\//, '')}`
}

export function assetPath(path = '') {
  return typeof path === 'string' && path.startsWith('/') ? sitePath(path) : path
}

export function currentPage() {
  const relative = window.location.pathname.startsWith(baseUrl)
    ? window.location.pathname.slice(baseUrl.length)
    : window.location.pathname.replace(/^\//, '')
  return relative.split('/').filter(Boolean)[0] || 'home'
}
