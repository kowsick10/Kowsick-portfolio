import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Command, Download, Menu, Moon, Sun, X } from 'lucide-react'
import { nav, profile } from '../data'
import useTheme from '../hooks/useTheme'
import useActiveSection from '../hooks/useActiveSection'

const ids = nav.map((n) => n.id)

export default function Navbar({ onOpenCommand }) {
  const { dark, toggle } = useTheme()
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="site-header fixed inset-x-0 top-0 z-[80] px-4 pt-4 md:px-6" data-scrolled={scrolled || open}>
      <nav aria-label="Primary" className="site-navbar glass mx-auto flex max-w-6xl items-center justify-between">
        <a href="#home" className="navbar-brand font-display text-lg font-extrabold tracking-tight" aria-label={`${profile.name}, back to top`}>
          <span>Kowsick </span>
          <span>Karthik</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                aria-current={active === n.id ? 'true' : undefined}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active === n.id ? 'nav-active font-semibold text-fg' : 'text-muted hover:text-fg'
                }`}
              >
                {active === n.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="nav-rainbow-pill absolute inset-0 -z-10 rounded-lg"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="icon-btn navbar-icon-btn"
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </button>
          <a href={profile.resume} download aria-label="Download resume" className="btn-ghost hidden !py-2.5 lg:inline-flex">
            <Download className="h-4 w-4" aria-hidden="true" />Resume
          </a>
          <button type="button" onClick={onOpenCommand} className="icon-btn hidden xl:inline-flex" aria-label="Open command palette" aria-keyshortcuts="Control+K Meta+K">
            <Command className="h-4 w-4" aria-hidden="true" />
          </button>
          <a href="#contact" className="btn-primary navbar-hire !py-2.5">Hire me</a>
          <button
            type="button"
            className="icon-btn navbar-icon-btn lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="site-mobile-menu glass mx-auto mt-2 max-w-6xl rounded-2xl p-3 lg:hidden"
          style={{ background: 'rgb(var(--bg) / 0.94)' }}
        >
          <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === n.id ? 'true' : undefined}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium ${
                    active === n.id ? 'nav-mobile-active font-semibold text-fg' : 'text-muted hover:bg-line/5 hover:text-fg'
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={profile.resume} download className="btn-ghost mt-3 w-full">Download resume</a>
          <button type="button" onClick={() => { setOpen(false); onOpenCommand() }} className="btn-ghost mt-2 w-full" aria-keyshortcuts="Control+K Meta+K">
            <Command className="h-4 w-4" aria-hidden="true" />Search portfolio <kbd className="chip !min-h-6 !px-1.5">Ctrl K</kbd>
          </button>
        </div>
      )}
    </header>
  )
}
