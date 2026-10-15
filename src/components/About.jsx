import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { GraduationCap, MapPin } from 'lucide-react'
import { about, profile } from '../data'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [v, setV] = useState(0)

  useEffect(() => {
    if (!inView) return undefined
    if (reduce) { setV(to); return undefined }
    const c = animate(0, to, { duration: 1.8, ease: 'easeOut', onUpdate: (l) => setV(Math.round(l)) })
    return () => c.stop()
  }, [inView, to, reduce])

  return <span ref={ref}>{v}{suffix}</span>
}

export default function About() {
  const { education } = about
  return (
    <section id="about" className="section">
      <SectionHeading title="About me" subtitle="Student, builder and researcher based in Chennai." />

      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          {about.bio.map((p) => <p key={p}>{p}</p>)}
          <p className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-a1" aria-hidden="true" />{profile.location}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass spotlight rainbow-card rainbow-hover rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <span className="icon-tile flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                <GraduationCap className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold">{education.school}</h3>
                <p className="mt-1 text-sm text-muted">{education.degree}</p>
                <p className="mt-3 text-sm text-muted">{education.period}</p>
                <p className="mt-1 font-display text-2xl font-bold"><span className="text-gradient">{education.score}</span></p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <dl className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {about.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <div className="glass spotlight rainbow-card rainbow-hover h-full rounded-2xl p-5">
              <dd className="font-display text-4xl font-extrabold tracking-tight"><span className="text-gradient"><Counter to={s.value} suffix={s.suffix} /></span></dd>
              <dt className="mt-2 text-sm leading-snug text-muted">{s.label}</dt>
            </div>
          </Reveal>
        ))}
      </dl>
      <p className="mt-4 text-xs text-muted">Profile statistics are static portfolio data, not live-updating counts.</p>
    </section>
  )
}
