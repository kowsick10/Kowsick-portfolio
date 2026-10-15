import { useState } from 'react'
import { Check, Copy, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'
import { profile } from '../data'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { SocialIcon } from './icons'
import { useToast } from './Toast'

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Enter your name (at least 2 characters).'
  if (!emailRe.test(v.email.trim())) e.email = 'Enter a valid email address, like name@example.com.'
  if (v.message.trim().length < 10) e.message = 'Write a message of at least 10 characters.'
  return e
}

const direct = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
]

export default function Contact() {
  const { push } = useToast()
  const [values, setValues] = useState({ name: '', email: '', message: '', company: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }))
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setEmailCopied(true)
      push('Email address copied to clipboard.')
      window.setTimeout(() => setEmailCopied(false), 2000)
    } catch {
      push('Unable to copy the email address. Use the email link instead.', 'error')
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    if (values.company) return // honeypot
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length) {
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus()
      return
    }
    if (!FORMSPREE_ID) {
      // No form key yet: fall back to the visitor's email app so the message still reaches you.
      const body = encodeURIComponent(`${values.message}\n\n${values.name} (${values.email})`)
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent('Portfolio message from ' + values.name)}&body=${body}`
      push('Opening your email app to send the message.')
      return
    }
    setSending(true)
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          _gotcha: values.company,
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      push('Message sent. I will reply within a day or two.')
      setValues({ name: '', email: '', message: '', company: '' })
    } catch {
      push(`Message not sent. Check your connection or email me at ${profile.email}.`, 'error')
    } finally {
      setSending(false)
    }
  }

  const err = (k) => errors[k] && <p id={`e-${k}`} role="alert" className="mt-1.5 text-sm text-red-500">{errors[k]}</p>
  const a11y = (k) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `e-${k}` : undefined })

  return (
    <section id="contact" className="section">
      <SectionHeading title="Let's work together" subtitle="Open to internships and full-time roles. Send a message and I will get back to you soon." />

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="space-y-4">
            {direct.map((d) => {
              const content = (
                <>
                  <span className="icon-tile flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"><d.icon className="h-5 w-5" aria-hidden="true" /></span>
                  <span className="min-w-0">
                    <span className="block text-sm text-muted">{d.label}</span>
                    <span className="block font-medium [overflow-wrap:anywhere]">
                      {d.label === 'Email' ? <>{d.value.split('@')[0]}@<wbr />{d.value.split('@')[1]}</> : d.value}
                    </span>
                  </span>
                </>
              )
              return d.label === 'Email' ? (
                <div key={d.label} className="glass spotlight rainbow-card rainbow-hover flex items-center gap-3 rounded-2xl p-4 sm:gap-4 sm:p-5">
                  <a href={d.href} className="flex min-h-11 min-w-0 flex-1 items-center gap-4" aria-label={`Email ${d.value}`}>
                    {content}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="icon-btn shrink-0"
                    aria-label={emailCopied ? 'Email address copied' : 'Copy email address'}
                  >
                    {emailCopied ? <Check className="h-4 w-4 text-success" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                  </button>
                </div>
              ) : (
                <a key={d.label} href={d.href} className="glass spotlight rainbow-card rainbow-hover flex min-h-11 items-center gap-4 rounded-2xl p-5">
                  {content}
                </a>
              )
            })}
            <div className="glass spotlight rainbow-card rainbow-hover flex items-center gap-4 rounded-2xl p-5">
              <span className="icon-tile flex h-11 w-11 items-center justify-center rounded-xl"><MapPin className="h-5 w-5" aria-hidden="true" /></span>
              <span><span className="block text-sm text-muted">Location</span><span className="font-medium">{profile.location}</span></span>
            </div>
            <ul className="flex gap-3 pt-2" aria-label="Social profiles">
              {profile.socials.filter((s) => s.key !== 'email').map((s) => (
                <li key={s.key}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="icon-btn !h-12 !w-12" aria-label={s.label}><SocialIcon name={s.key} className="h-5 w-5" /></a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={submit} noValidate className="glass rainbow-card rounded-3xl p-6 sm:p-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="f-name" className="mb-2 block text-sm font-medium">Name</label>
                <input id="f-name" name="name" autoComplete="name" maxLength={100} required className="field" placeholder="Your name" value={values.name} onChange={set('name')} {...a11y('name')} />
                {err('name')}
              </div>
              <div>
                <label htmlFor="f-email" className="mb-2 block text-sm font-medium">Email</label>
                <input id="f-email" name="email" type="email" autoComplete="email" maxLength={254} required className="field" placeholder="you@example.com" value={values.email} onChange={set('email')} {...a11y('email')} />
                {err('email')}
              </div>
              <div>
                <label htmlFor="f-message" className="mb-2 block text-sm font-medium">Message</label>
                <textarea id="f-message" name="message" rows={5} maxLength={5000} required className="field resize-y" placeholder="Tell me about the role or project" value={values.message} onChange={set('message')} {...a11y('message')} />
                {err('message')}
              </div>
              <div className="absolute h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="f-company">Leave this field empty</label>
                <input id="f-company" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" value={values.company} onChange={set('company')} />
              </div>
              <p id="contact-privacy" className="text-xs leading-relaxed text-muted">
                {FORMSPREE_ID
                  ? 'Your message will be processed by Formspree to deliver your inquiry.'
                  : 'Your message will open in your email app. No message is sent or stored by this website.'}
              </p>
              <button type="submit" disabled={sending} aria-describedby="contact-privacy" className="btn-primary w-full disabled:opacity-70">
                {sending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
                {sending ? 'Sending…' : 'Send message'}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
