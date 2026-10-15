import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { profile } from '../data'
import { GithubIcon, SocialIcon } from './icons'
import HeroOrb from './HeroOrb'

const techLogos = {
  'React.js': `${import.meta.env.BASE_URL}tech/react.svg`,
  'Node.js': `${import.meta.env.BASE_URL}tech/nodejs.svg`,
  Java: `${import.meta.env.BASE_URL}tech/java.svg`,
  Python: `${import.meta.env.BASE_URL}tech/python.svg`,
  'SAP ABAP': `${import.meta.env.BASE_URL}tech/sap.svg`,
  MySQL: `${import.meta.env.BASE_URL}tech/mysql.svg`,
  'Tailwind CSS': `${import.meta.env.BASE_URL}tech/tailwindcss.svg`,
}

const heroSocials = ['linkedin', 'github', 'leetcode', 'email']

export default function Hero() {
  const reduce = useReducedMotion()
  const item = (i) => ({
    initial: reduce ? false : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.2 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  })
  const [firstName, ...rest] = profile.name.split(' ')

  return (
    <section id="home" className="hero relative isolate min-h-screen overflow-hidden">
      <motion.div
        className="hero-photo"
        initial={reduce ? false : { opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {profile.photo ? (
          <img
            src={profile.photo}
            alt="Portrait of Kowsick Karthik"
            width="960"
            height="1280"
            loading="eager"
            fetchpriority="high"
            className="hero-portrait"
          />
        ) : (
          <div className="hero-monogram" aria-hidden="true"><span>KK</span></div>
        )}
      </motion.div>
      <span className="hero-stripe" aria-hidden="true" />
      <span className="hero-dots" aria-hidden="true" />

      <div className="hero-inner relative mx-auto flex min-h-screen w-full max-w-[1440px] items-center px-5 pb-16 pt-28 sm:px-8 lg:px-12 xl:px-[6%]">
        <div className="hero-copy relative z-10 min-w-0">
          <motion.h1 {...item(0)} className="font-display text-fg">
            <span className="hero-hello block">Hello, I’m</span>
            <span className="hero-title mt-2 block font-extrabold">
              {firstName} <span className="hero-accent">{rest.join(' ')}</span>
            </span>
          </motion.h1>

          <motion.p {...item(1)} className="hero-role mt-3 font-display text-fg">
            {profile.roles[0]}
          </motion.p>

          <motion.p {...item(2)} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.intro}
          </motion.p>

          <motion.ul {...item(3)} className="mt-8 flex max-w-2xl flex-wrap gap-3" aria-label="Technologies">
            {profile.heroSkills.map((skill) => (
              <li key={skill}>
                <span className="hero-tech">
                  {skill === 'GitHub' ? (
                    <GithubIcon className="h-5 w-5 text-fg" />
                  ) : techLogos[skill] ? (
                    <img src={techLogos[skill]} alt="" width="20" height="20" className="h-5 w-5 object-contain" />
                  ) : null}
                  {skill}
                </span>
              </li>
            ))}
          </motion.ul>

          <motion.div {...item(4)} className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
            <a href="#projects" className="hero-cta">
              View My Projects <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href="#contact" className="hero-link">
              Contact Me <ArrowRight className="h-5 w-5 text-a1" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.ul {...item(5)} className="mt-12 flex gap-4" aria-label="Social links">
            {profile.socials.filter((s) => heroSocials.includes(s.key)).map((social) => (
              <li key={social.key}>
                <a
                  href={social.url}
                  target={social.key === 'email' ? undefined : '_blank'}
                  rel={social.key === 'email' ? undefined : 'noopener noreferrer'}
                  className="hero-social"
                  aria-label={social.label}
                >
                  <SocialIcon name={social.key} className="h-6 w-6" />
                </a>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      <HeroOrb />

      <a href="#about" aria-label="Scroll to about section" className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-muted transition hover:text-fg lg:block">
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  )
}
