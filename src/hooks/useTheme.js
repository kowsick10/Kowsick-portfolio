import { useCallback, useEffect, useState } from 'react'

export default function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', dark ? '#050B1D' : '#F8FAFC')
    try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch (e) { /* ignore */ }
  }, [dark])

  useEffect(() => {
    const onToggle = () => setDark((current) => !current)
    window.addEventListener('portfolio:toggle-theme', onToggle)
    return () => window.removeEventListener('portfolio:toggle-theme', onToggle)
  }, [])

  const toggle = useCallback(() => {
    window.dispatchEvent(new Event('portfolio:toggle-theme'))
  }, [])
  return { dark, toggle }
}
