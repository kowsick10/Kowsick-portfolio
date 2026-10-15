import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Command, Download, Moon, Search, Sun, X } from 'lucide-react'
import { nav, profile, projects } from '../data'
import useTheme from '../hooks/useTheme'

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const previousFocusRef = useRef(null)
  const { dark } = useTheme()
  const reduceMotion = useReducedMotion()

  const commands = useMemo(() => [
    ...nav.map((item) => ({
      label: `Go to ${item.label}`,
      description: `${item.label} section`,
      href: `#${item.id}`,
      keywords: item.label,
    })),
    { label: dark ? 'Switch to light theme' : 'Switch to dark theme', description: 'Change appearance', action: 'theme', keywords: 'theme appearance' },
    { label: 'Download resume', description: 'Save a copy of my resume', href: profile.resume, download: true, keywords: 'resume cv download' },
    ...projects.map((project) => ({
      label: `View ${project.title}`,
      description: project.categories.join(' · '),
      action: 'project',
      project,
      keywords: `${project.title} ${project.categories.join(' ')} ${project.stack.join(' ')}`,
    })),
  ], [dark])

  const filtered = commands.filter((command) => (
    `${command.label} ${command.description} ${command.keywords}`.toLowerCase().includes(query.trim().toLowerCase())
  ))

  useEffect(() => {
    if (!open) return undefined
    previousFocusRef.current = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    inputRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      previousFocusRef.current?.focus?.()
      setQuery('')
    }
  }, [open])

  const runCommand = (command) => {
    if (command.action === 'theme') {
      window.dispatchEvent(new Event('portfolio:toggle-theme'))
    } else if (command.action === 'project') {
      window.dispatchEvent(new CustomEvent('portfolio:open-project', { detail: command.project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }))
    }
    onClose()
  }

  const palette = open && (
    <motion.div
          className="fixed inset-0 z-[130] flex items-start justify-center bg-black/60 p-3 pt-[min(18vh,9rem)] backdrop-blur-sm sm:p-6 sm:pt-[min(20vh,12rem)]"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.stopPropagation()
              onClose()
            } else if (event.key === 'Tab') {
              const dialog = event.currentTarget.querySelector('[role="dialog"]')
              const focusable = dialog?.querySelectorAll('input:not([disabled]), a[href], button:not([disabled])')
              if (!focusable?.length) return
              const first = focusable[0]
              const last = focusable[focusable.length - 1]
              if (event.shiftKey && document.activeElement === first) {
                event.preventDefault()
                last.focus()
              } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault()
                first.focus()
              }
            }
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="command-palette-title"
            className="glass w-full max-w-xl overflow-hidden rounded-2xl"
            style={{ background: 'rgb(var(--bg) / 0.98)' }}
            initial={reduceMotion ? false : { opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="command-palette-title" className="sr-only">Portfolio command palette</h2>
            <div className="flex items-center gap-3 border-b border-line/10 px-4">
              <Search className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search sections, projects, and actions..."
                aria-label="Search portfolio commands"
                aria-controls="command-palette-results"
                className="min-h-14 min-w-0 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-muted"
              />
              <button type="button" className="icon-btn shrink-0" onClick={onClose} aria-label="Close command palette">
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <ul id="command-palette-results" className="max-h-[min(55vh,26rem)] overflow-y-auto p-2" aria-label="Commands">
              {filtered.length ? filtered.map((command) => {
                const Icon = command.action === 'theme' ? (dark ? Sun : Moon) : command.action === 'project' ? ArrowRight : command.download ? Download : Command
                return (
                  <li key={`${command.label}-${command.description}`}>
                    {command.href ? (
                      <a
                        href={command.href}
                        download={command.download || undefined}
                        onClick={onClose}
                        className="flex min-h-12 items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-line/5 focus-visible:bg-line/5"
                      >
                        <Icon className="h-4 w-4 shrink-0 text-a1" aria-hidden="true" />
                        <span className="min-w-0 flex-1">
                          <span className="block font-medium">{command.label}</span>
                          <span className="block text-xs text-muted">{command.description}</span>
                        </span>
                        <span className="text-xs text-muted" aria-hidden="true">↵</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => runCommand(command)}
                        className="flex min-h-12 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-line/5 focus-visible:bg-line/5"
                      >
                        <Icon className="h-4 w-4 shrink-0 text-a1" aria-hidden="true" />
                        <span className="min-w-0 flex-1">
                          <span className="block font-medium">{command.label}</span>
                          <span className="block text-xs text-muted">{command.description}</span>
                        </span>
                        <span className="text-xs text-muted" aria-hidden="true">↵</span>
                      </button>
                    )}
                  </li>
                )
              }) : (
                <li className="px-3 py-8 text-center text-sm text-muted">No matching commands. Try a different search.</li>
              )}
            </ul>
            <div className="flex items-center justify-between border-t border-line/10 px-4 py-3 text-xs text-muted">
              <span>Navigate your portfolio</span>
              <span className="inline-flex items-center gap-1.5"><kbd className="chip !min-h-6 !px-1.5">Esc</kbd>to close</span>
            </div>
          </motion.section>
        </motion.div>
  )

  return reduceMotion ? palette : <AnimatePresence>{palette}</AnimatePresence>
}
