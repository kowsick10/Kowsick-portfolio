import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { skills } from '../data'
import useTilt from '../hooks/useTilt'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { Icon } from './icons'
import {
  SiBootstrap, SiDart, SiDocker, SiExpress, SiFastapi, SiFigma, SiFlutter, SiGin, SiGit, SiGithub,
  SiGo, SiHtml5, SiCss, SiJavascript, SiMongodb, SiMysql, SiNodedotjs, SiNumpy, SiPandas, SiPostgresql,
  SiPython, SiRazorpay, SiReact, SiSap, SiSelenium, SiSpringboot, SiStreamlit, SiTailwindcss,
} from 'react-icons/si'
import { FaAws, FaJava } from 'react-icons/fa'
import { BarChart3, BrainCircuit, Code2, Database, Palette, Workflow } from 'lucide-react'

const SkillKeyboard = lazy(() => import('./SkillKeyboard'))

const skillIcons = {
  Python: [{ Icon: SiPython, color: '#3776AB', glow: '55 118 171' }],
  Java: [{ Icon: FaJava, color: '#ED8B00', glow: '237 139 0' }],
  JavaScript: [{ Icon: SiJavascript, color: '#F7DF1E', glow: '247 223 30' }],
  Dart: [{ Icon: SiDart, color: '#0175C2', glow: '1 117 194' }],
  SQL: [{ Icon: Database, color: 'rgb(var(--muted))', glow: '148 163 184' }],
  'React.js': [{ Icon: SiReact, color: '#61DAFB', glow: '97 218 251' }],
  'React Native': [{ Icon: SiReact, color: '#61DAFB', glow: '97 218 251' }],
  Flutter: [{ Icon: SiFlutter, color: '#54C5F8', glow: '84 197 248' }],
  'HTML/CSS': [
    { Icon: SiHtml5, color: '#E34F26', glow: '227 79 38' },
    { Icon: SiCss, color: '#1572B6', glow: '21 114 182' },
  ],
  Tailwind: [{ Icon: SiTailwindcss, color: '#06B6D4', glow: '6 182 212' }],
  Bootstrap: [{ Icon: SiBootstrap, color: '#7952B3', glow: '121 82 179' }],
  'Spring Boot': [{ Icon: SiSpringboot, color: '#6DB33F', glow: '109 179 63' }],
  'Node.js': [{ Icon: SiNodedotjs, color: '#339933', glow: '51 153 51' }],
  'Express.js': [{ Icon: SiExpress, color: 'rgb(var(--fg))', glow: '148 163 184' }],
  FastAPI: [{ Icon: SiFastapi, color: '#009688', glow: '0 150 136' }],
  'Go / Gin': [
    { Icon: SiGo, color: '#00ADD8', glow: '0 173 216' },
    { Icon: SiGin, color: '#008ECF', glow: '0 142 207' },
  ],
  'SAP ABAP': [{ Icon: SiSap, color: '#0FA6D7', glow: '15 166 215' }],
  PostgreSQL: [{ Icon: SiPostgresql, color: '#4169E1', glow: '65 105 225' }],
  MySQL: [{ Icon: SiMysql, color: '#4479A1', glow: '68 121 161' }],
  MongoDB: [{ Icon: SiMongodb, color: '#47A248', glow: '71 162 72' }],
  ChromaDB: [{ Icon: Database, color: '#6C5CE7', glow: '108 92 231' }],
  LLM: [{ Icon: BrainCircuit, color: '#A78BFA', glow: '167 139 250' }],
  RAG: [{ Icon: Workflow, color: '#22D3EE', glow: '34 211 238' }],
  NumPy: [{ Icon: SiNumpy, color: '#4DABCF', glow: '77 171 207' }],
  Pandas: [{ Icon: SiPandas, color: '#150458', darkColor: '#B7A8FF', glow: '21 4 88' }],
  Matplotlib: [{ Icon: BarChart3, color: '#E76F00', glow: '231 111 0' }],
  'Power BI': [{ Icon: BarChart3, color: '#F2C811', glow: '242 200 17' }],
  Streamlit: [{ Icon: SiStreamlit, color: '#FF4B4B', glow: '255 75 75' }],
  'Git/GitHub': [
    { Icon: SiGit, color: '#F05032', glow: '240 80 50' },
    { Icon: SiGithub, color: 'rgb(var(--fg))', glow: '148 163 184' },
  ],
  Docker: [{ Icon: SiDocker, color: '#2496ED', glow: '36 150 237' }],
  Selenium: [{ Icon: SiSelenium, color: '#43B02A', glow: '67 176 42' }],
  Figma: [{ Icon: SiFigma, color: '#F24E1E', glow: '242 78 30' }],
  Canva: [{ Icon: Palette, color: '#00C4CC', glow: '0 196 204' }],
  Razorpay: [{ Icon: SiRazorpay, color: '#0C2451', darkColor: '#9CC4FF', glow: '12 36 81' }],
  'AWS Cloud': [{ Icon: FaAws, color: '#FF9900', glow: '255 153 0' }],
}

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
              className={`chip skill-badge !text-fg ${selectedSkill === s ? 'border-a1/50 bg-a1/10' : ''}`}
              aria-pressed={selectedSkill === s}
              onClick={() => onSelect(s)}
              style={{ '--skill-color': (skillIcons[s] || [{ glow: '148 163 184' }])[0].glow }}
            >
              {(skillIcons[s] || [{ Icon: Code2, color: 'rgb(var(--muted))' }]).map(({ Icon: SkillIcon, color, darkColor }, index) => (
                <SkillIcon
                  key={`${s}-${index}`}
                  className={`skill-badge__icon ${darkColor ? 'skill-badge__icon--adaptive' : ''}`}
                  aria-hidden="true"
                  style={{ color, '--dark-icon-color': darkColor }}
                />
              ))}
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
