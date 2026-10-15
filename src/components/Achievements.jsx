import { achievements } from '../data'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { Icon } from './icons'

export default function Achievements() {
  return (
    <section id="achievements" className="section">
      <SectionHeading title="Achievements & leadership" subtitle="Hackathons, CTFs and the events I helped run." />

      <div className="grid gap-6 sm:grid-cols-2">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={(i % 2) * 0.08}>
            <article className="glass spotlight rainbow-card rainbow-hover flex h-full gap-5 rounded-2xl p-6">
              <span className="icon-tile flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                <Icon name={a.icon} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold leading-snug">{a.title}</h3>
                <p className="mt-1 text-sm font-semibold"><span className="text-gradient">{a.tag}</span></p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.text}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
