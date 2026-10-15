import { BookOpenText, ExternalLink, MapPin, ShieldCheck } from 'lucide-react'
import { publication as pub } from '../data'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Research() {
  const hasDirectPaperLink = pub.url && new URL(pub.url).pathname !== '/'

  return (
    <section id="research" className="section">
      <SectionHeading title="Research & publication" subtitle="Peer-reviewed work on private and explainable machine learning." />

      <Reveal>
        <article className="glass rainbow-card rounded-3xl p-7 sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-lg bg-a1 px-3 py-1.5 text-sm font-semibold text-on-accent">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />IEEE
            </span>
            <span className="chip">{pub.venue}</span>
            <span className="chip">{pub.date}</span>
          </div>

          <h3 className="mt-6 max-w-3xl font-display text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">{pub.title}</h3>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{pub.summary}</p>

          <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-fg">
            <BookOpenText className="h-4 w-4 text-a1" aria-hidden="true" />{pub.event}
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm text-muted"><MapPin className="h-4 w-4 text-a1" aria-hidden="true" />{pub.place}</p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Topics">
            {pub.topics.map((t) => <li key={t} className="chip !text-fg">{t}</li>)}
          </ul>

          <p className="mt-7 text-sm leading-relaxed text-muted">
            <span className="font-semibold text-fg">Authors: </span>
            {pub.authors.map((a, i) => (
              <span key={a}>
                <span className={i === 0 ? 'font-semibold text-gradient' : ''}>{a}</span>
                {i < pub.authors.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>

          {hasDirectPaperLink ? (
            <a href={pub.url} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">
              <ExternalLink className="h-4 w-4" aria-hidden="true" />Read paper
            </a>
          ) : (
            <p className="mt-8 text-sm text-muted">Direct paper link not yet available.</p>
          )}
        </article>
      </Reveal>
    </section>
  )
}
