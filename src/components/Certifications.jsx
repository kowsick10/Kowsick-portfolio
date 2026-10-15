import { Award, ExternalLink } from 'lucide-react'
import { certifications, researchCertificate, workshops } from '../data'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

function CredentialCard({ credential, index }) {
  const body = (
    <>
      <span className="icon-tile flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
        <Award className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-base font-semibold leading-snug">{credential.name}</span>
        <span className="mt-0.5 block text-sm text-muted">{credential.issuer}</span>
      </span>
      {credential.url && <ExternalLink className="h-4 w-4 shrink-0 text-a1" aria-hidden="true" />}
    </>
  )

  return (
    <li key={credential.name}>
      <Reveal delay={(index % 3) * 0.06} className="h-full">
        {credential.url ? (
          <a
            href={credential.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${credential.name} — ${credential.issuer} (opens credential link in a new tab)`}
            className="glass spotlight rainbow-card rainbow-hover flex h-full items-center gap-4 rounded-2xl p-5"
          >
            {body}
          </a>
        ) : (
          <div className="glass spotlight rainbow-card rainbow-hover flex h-full items-center gap-4 rounded-2xl p-5">{body}</div>
        )}
      </Reveal>
    </li>
  )
}

export default function Certifications() {
  return (
    <section id="certifications" className="section">
      <SectionHeading title="Certifications" subtitle="Credentials across cloud, networking, security, SAP and AI." />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((credential, index) => (
          <CredentialCard key={credential.name} credential={credential} index={index} />
        ))}
      </ul>

      <h3 className="mb-5 mt-12 font-display text-xl font-semibold">Workshops</h3>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {workshops.map((credential, index) => (
          <CredentialCard key={credential.name} credential={credential} index={index} />
        ))}
      </ul>

      <h3 className="mb-5 mt-12 font-display text-xl font-semibold">Research</h3>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <CredentialCard credential={researchCertificate} index={0} />
      </ul>
    </section>
  )
}
