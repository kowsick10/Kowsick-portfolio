import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { skills } from '../data'
import useTilt from '../hooks/useTilt'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { Icon } from './icons'

const SkillKeyboard = lazy(() => import('./SkillKeyboard'))

function Group({ g, selectedSkill, onSelect }) {
  const tilt = useTilt(1.5)
  return (
    <div {...tilt} className="glass spotlight rainbow-card rainbow-hover h-full rounded-2xl p-6">
      <div className="flex items-center gap-3">
        <span className="icon-tile flex h-11 w-11 items-center justify-center rounded-xl">
          <Icon name={g.icon} className="h-5 w-5" />
        </span>
        <h3 className="font-display text-lg font-semibold">{g.group}</h3>
      </div>
      <ul className="mt-5 flex flex-wrap gap-2">
        {g.items.map((s) => (
          <li key={s}>
            <button
              type="button"
              className={`chip !text-fg transition-colors hover:border-a1/50 ${selectedSkill === s ? 'border-a1/50 bg-a1/10' : ''}`}
              aria-pressed={selectedSkill === s}
              onClick={() => onSelect(s)}
            >
              {s}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState(skills[0].items[0])
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const keyboardPanel = useRef(null)
  const selectedGroup = skills.find((group) => group.items.includes(selectedSkill))

  useEffect(() => {
    const panel = keyboardPanel.current
    if (!panel) return
    if (typeof IntersectionObserver === 'undefined') {
      setKeyboardVisible(true)
      return
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setKeyboardVisible(true)
        observer.disconnect()
      }
    }, { rootMargin: '160px' })

    observer.observe(panel)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="section">
      <SectionHeading title="Skills" subtitle="The languages, frameworks and tools I use to build and ship." />

      <div ref={keyboardPanel} className="skill-keyboard-panel glass rainbow-card mb-10 overflow-hidden rounded-3xl">
        <div className="grid items-center gap-2 px-6 pt-6 sm:px-8 sm:pt-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-a1">Interactive skill board</p>
            <h3 className="mt-2 font-display text-2xl font-bold text-fg sm:text-3xl">
              {selectedSkill}<span className="text-a1">.</span>
            </h3>
            <p className="mt-1 text-sm text-muted">{selectedGroup?.group} · Hover or tap a key to explore</p>
          </div>
          <span className="rainbow-badge hidden px-3 py-1.5 text-xs font-medium sm:inline-flex">
            35 technologies
          </span>
        </div>
        {keyboardVisible ? (
          <Suspense fallback={<div className="skill-keyboard flex items-center justify-center text-sm text-muted">Loading interactive skill board...</div>}>
            <SkillKeyboard selectedSkill={selectedSkill} onSelect={setSelectedSkill} />
          </Suspense>
        ) : (
          <div className="skill-keyboard" aria-hidden="true" />
        )}
        <p className="px-6 pb-5 text-center text-xs text-muted sm:px-8">
          Prefer a simple list? Your complete skill set is grouped below.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={(i % 3) * 0.07}>
            <Group g={g} selectedSkill={selectedSkill} onSelect={setSelectedSkill} />
          </Reveal>
        ))}
      </div>

    </section>
  )
}
