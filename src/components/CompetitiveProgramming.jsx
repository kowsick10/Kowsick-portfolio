import { ExternalLink } from 'lucide-react'
import { competitive } from '../data'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function CompetitiveProgramming() {
  return (
    <section id="coding" className="section">
      <SectionHeading title="Competitive programming" subtitle="Where I sharpen problem solving, one contest at a time." />

      <div className="grid gap-6 md:grid-cols-3">
        {competitive.map((c, i) => (
          <Reveal key={c.platform} delay={i * 0.08}>
            <article className="glass spotlight rainbow-card rainbow-hover flex h-full flex-col rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold">{c.platform}</h3>
                <span className="rainbow-badge px-3 py-1 text-xs font-bold">{c.badge}</span>
              </div>
              <p className="mt-6 font-display text-6xl font-extrabold tracking-tight"><span className="text-gradient">{c.big}</span></p>
              <p className="mt-1 text-sm text-muted">{c.bigLabel}</p>
              <dl className="mt-6 flex-1 divide-y divide-line/10 border-t border-line/10 text-sm">
                {c.rows.map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-4 py-2.5">
                    <dt className="text-muted">{k}</dt>
                    <dd className="text-right font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
              {c.url && (
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-5 !py-2.5">
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />View profile
                </a>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
