import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CommandPalette from './components/CommandPalette'
import Footer from './components/Footer'
import { ToastProvider } from './components/Toast'

const BelowFold = lazy(() => import('./components/BelowFold'))

export default function App() {
  const [loading, setLoading] = useState(true)
  const [commandOpen, setCommandOpen] = useState(false)
  const closeCommand = useCallback(() => setCommandOpen(false), [])

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && !event.altKey && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandOpen(true)
      }
    }
    window.addEventListener('keydown', onShortcut)
    return () => window.removeEventListener('keydown', onShortcut)
  }, [])

  return (
    <ToastProvider>
      <div className="site-content">
        <a href="#main" className="skip-link">Skip to content</a>
        <AnimatePresence>{loading && <Preloader key="preloader" />}</AnimatePresence>
        <ScrollProgress />
        <CustomCursor />
        <Navbar onOpenCommand={() => setCommandOpen(true)} />
        <CommandPalette open={commandOpen} onClose={closeCommand} />
        <main id="main">
          <Hero />
          <Suspense fallback={<div className="min-h-screen" />}>
            <BelowFold />
          </Suspense>
        </main>
        <Footer />
      </div>
    </ToastProvider>
  )
}
