import Reveal from './Reveal'

export default function SectionHeading({ title, subtitle }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <h2 className="font-display text-[clamp(1.75rem,6vw,3rem)] font-bold tracking-tight">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>}
    </Reveal>
  )
}
