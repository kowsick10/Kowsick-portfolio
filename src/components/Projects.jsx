import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useIsPresent, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Maximize2, X } from 'lucide-react'
import { projectFilters, projects } from '../data'
import useTilt from '../hooks/useTilt'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { GithubIcon, Icon } from './icons'

function projectSlug(project) {
  return project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function projectFromUrl() {
  const slug = new URLSearchParams(window.location.search).get('project')
  return projects.find((project) => projectSlug(project) === slug) ?? null
}

function Links({ p }) {
  return (
    <div className="flex flex-wrap gap-2">
      {p.github && (
        <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-3.5 !py-2 text-xs" aria-label={`${p.title} on GitHub`}>
          <GithubIcon className="h-4 w-4" aria-hidden="true" />GitHub profile
        </a>
      )}
      {p.live && (
        <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn-primary !px-3.5 !py-2 text-xs" aria-label={`${p.title} live demo`}>
          <ExternalLink className="h-4 w-4" aria-hidden="true" />Live
        </a>
      )}
    </div>
  )
}

const Card = forwardRef(function Card({ p, onOpen }, ref) {
  const tilt = useTilt(2)
  return (
    <motion.li
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
    >
      <div {...tilt} className="glass spotlight project-card rainbow-card rainbow-hover flex h-full flex-col rounded-2xl p-6">
        <div className="mb-5 flex items-start justify-between">
          <span className="icon-tile flex h-12 w-12 items-center justify-center rounded-xl">
            <Icon name={p.icon} className="h-6 w-6" />
          </span>
          <button type="button" onClick={(event) => onOpen(p, event.currentTarget)} className="icon-btn" aria-label={`View details of ${p.title}`}>
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
        <h3 className="font-display text-xl font-semibold">{p.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {p.stack.map((t) => <li key={t} className="chip">{t}</li>)}
        </ul>
        <div className="mt-5"><Links p={p} /></div>
      </div>
    </motion.li>
  )
})

function Modal({ p, relatedProjects, onClose, onOpen, openerRef }) {
  const closeRef = useRef(null)
  const isPresent = useIsPresent()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
      openerRef.current?.focus()
    }
  }, [openerRef])

  useEffect(() => {
    closeRef.current?.focus()
  }, [p])

  const trapFocus = (event) => {
    if (event.key !== 'Tab') return
    const dialog = event.currentTarget
    const focusable = dialog.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    if (!focusable.length) return
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

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      aria-hidden={!isPresent}
      initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={() => { if (isPresent) onClose() }}
      onKeyDown={(event) => {
        if (!isPresent) return
        if (event.key === 'Escape') onClose()
        else trapFocus(event)
      }}
    >
      <motion.div
        role="dialog" aria-modal={isPresent ? 'true' : undefined} aria-labelledby="modal-title" aria-describedby="modal-overview"
        initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.97 }}
        className="glass rainbow-card relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6 sm:p-8"
        style={{ background: 'rgb(var(--bg) / 0.96)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" onClick={onClose} className="icon-btn absolute right-4 top-4" aria-label="Close details">
          <X className="h-4 w-4" />
        </button>
        <span className="icon-tile flex h-12 w-12 items-center justify-center rounded-xl">
          <Icon name={p.icon} className="h-6 w-6" />
        </span>
        <h3 id="modal-title" className="mt-4 font-display text-2xl font-bold">{p.title}</h3>
        <p id="modal-overview" className="mt-2 max-w-xl leading-relaxed text-muted">{p.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2" aria-label="Project categories">
          {p.categories.map((category) => <span key={category} className="chip">{category}</span>)}
        </div>
        <h4 className="mt-7 font-display text-base font-semibold">Highlights</h4>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted marker:text-a1">
          {p.highlights.map((h) => <li key={h}>{h}</li>)}
        </ul>
        <h4 className="mt-7 font-display text-base font-semibold">Technology stack</h4>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Project technologies">
          {p.stack.map((t) => <li key={t} className="chip">{t}</li>)}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Links p={p} />
          <button type="button" onClick={onClose} className="btn-ghost !px-3.5 !py-2 text-xs">Back to projects</button>
        </div>
        {relatedProjects.length > 0 && (
          <div className="mt-8 border-t border-line/10 pt-6">
            <h4 className="font-display text-base font-semibold">Related projects</h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {relatedProjects.map((project) => (
                <li key={project.title}>
                  <button
                    type="button"
                    onClick={() => onOpen(project)}
                    className="btn-ghost !min-h-11 !px-3.5 !py-2 text-left text-xs"
                  >
                    {project.title}<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState(projectFromUrl)
  const openerRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const list = projects.filter((p) => filter === 'All' || p.categories.includes(filter))

  useEffect(() => {
    const syncProjectFromUrl = () => setOpen(projectFromUrl())
    window.addEventListener('popstate', syncProjectFromUrl)
    return () => window.removeEventListener('popstate', syncProjectFromUrl)
  }, [])

  const openProject = useCallback((project, opener) => {
    if (opener) openerRef.current = opener
    const params = new URLSearchParams(window.location.search)
    params.set('project', projectSlug(project))
    const url = `${window.location.pathname}?${params}${window.location.hash || '#projects'}`
    window.history.pushState(
      { ...window.history.state, projectDetail: projectSlug(project) },
      '',
      url,
    )
    setOpen(project)
  }, [])

  useEffect(() => {
    const openProjectFromCommand = (event) => {
      const project = projects.find((item) => projectSlug(item) === event.detail)
      if (project) openProject(project, document.querySelector('#projects h2'))
    }
    window.addEventListener('portfolio:open-project', openProjectFromCommand)
    return () => window.removeEventListener('portfolio:open-project', openProjectFromCommand)
  }, [openProject])

  const closeProject = useCallback(() => {
    const params = new URLSearchParams(window.location.search)
    if (!params.has('project')) {
      setOpen(null)
      return
    }
    if (window.history.state?.projectDetail === params.get('project')) {
      window.history.back()
      return
    }
    params.delete('project')
    const query = params.toString()
    window.history.replaceState(
      window.history.state,
      '',
      `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`,
    )
    setOpen(null)
  }, [])

  const relatedProjects = open
    ? projects.filter((project) => project !== open && project.categories.some((category) => open.categories.includes(category))).slice(0, 3)
    : []
  const projectModal = open && (
    <Modal
      p={open}
      relatedProjects={relatedProjects}
      onClose={closeProject}
      onOpen={openProject}
      openerRef={openerRef}
    />
  )

  return (
    <section id="projects" className="section">
      <SectionHeading title="Featured projects" subtitle="Things I designed, built and shipped across web, mobile and AI." />

      <Reveal>
        <div role="group" aria-label="Filter projects by category" className="mb-10 flex flex-wrap gap-2">
          {projectFilters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`relative min-h-11 rounded-full px-5 py-2 text-sm font-semibold transition ${filter === f ? 'text-on-accent' : 'glass rainbow-button text-muted hover:text-fg'}`}
            >
              {filter === f && (
                <motion.span layoutId="filter-pill" className="absolute inset-0 -z-0 rounded-full bg-a1" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <motion.ul layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => <Card key={p.title} p={p} onOpen={openProject} />)}
      </motion.ul>

      {reduceMotion ? projectModal : <AnimatePresence>{projectModal}</AnimatePresence>}
    </section>
  )
}
