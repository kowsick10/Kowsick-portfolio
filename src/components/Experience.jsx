import { useRef } from 'react'
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { experience } from '../data'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Experience() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <section id="experience" className="section">
      <SectionHeading title="Experience" subtitle="Internships and roles where I shipped real features." />

      <div ref={ref} className="relative">
        <div className="absolute bottom-0 left-[15px] top-2 w-[2px] bg-line/10 md:left-[19px]" aria-hidden="true" />
        <motion.div
          className="absolute left-[15px] top-2 bottom-0 w-[2px] origin-top timeline-progress md:left-[19px]"
          style={{ scaleY: reduce ? 1 : scaleY }}
          aria-hidden="true"
        />

        <ol className="space-y-8">
          {experience.map((e, i) => (
            <li key={e.role + e.company} className="relative pl-12 md:pl-16">
              <span
                className={`absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full text-on-accent md:h-10 md:w-10 ${
                  e.current ? 'bg-success' : 'timeline-dot'
                }`}
                aria-hidden="true"
              >
                {e.current && <span className="absolute inset-0 rounded-full bg-success/20" />}
                <Briefcase className="relative h-4 w-4 md:h-[18px] md:w-[18px]" />
              </span>

              <Reveal delay={Math.min(i * 0.04, 0.12)}>
                <article className="glass spotlight rainbow-card rainbow-hover rounded-2xl p-6">
                  <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-1">
                    <div>
                      <h3 className="font-display text-xl font-semibold">{e.role}</h3>
                      <p className="text-base font-medium"><span className="text-gradient">{e.company}</span></p>
                    </div>
                    <div className="text-sm text-muted sm:text-right">
                      <p className="font-medium text-fg">{e.period}</p>
                      <p>{e.place}</p>
                    </div>
                  </div>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted marker:text-a1 sm:text-base">
                    {e.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                    {e.tags.map((t) => <li key={t} className="chip">{t}</li>)}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
