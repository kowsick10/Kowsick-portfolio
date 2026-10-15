import { ArrowUp } from 'lucide-react'
import { profile } from '../data'

export default function Footer() {
  return (
    <footer className="border-t border-line/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
        <div className="text-center sm:text-left">
          <p className="font-medium text-fg">Building thoughtful tech. Turning bold ideas into real impact.</p>
          <p className="mt-1 text-sm text-muted-soft">© 2026 {profile.name}.</p>
        </div>
        <a href="#home" className="btn-ghost !px-4 !py-2 text-xs"><ArrowUp className="h-4 w-4" aria-hidden="true" />Back to top</a>
      </div>
    </footer>
  )
}
