import { useEffect, useRef, useState } from 'react'

const themes = ['midnight-blue', 'neon-purple', 'cyber-rainbow', 'aurora-green', 'sunset-glow', 'cosmic-pink']

function getSavedTheme() {
  try {
    const saved = localStorage.getItem('portfolio-color-theme')
    if (themes.includes(saved)) return saved
  } catch {
    // The current document theme remains the fallback when storage is unavailable.
  }
  const current = document.documentElement.dataset.colorTheme
  return themes.includes(current) ? current : themes[0]
}

export default function HeroOrb() {
  const [theme, setTheme] = useState(getSavedTheme)
  const [wave, setWave] = useState(null)
  const pointerStart = useRef(null)
  const skipClick = useRef(false)

  useEffect(() => {
    document.documentElement.dataset.colorTheme = theme
    try {
      localStorage.setItem('portfolio-color-theme', theme)
    } catch {
      // Theme selection still works for this page view.
    }
  }, [theme])

  useEffect(() => {
    if (!wave) return undefined
    const timeout = window.setTimeout(() => setWave(null), 950)
    return () => window.clearTimeout(timeout)
  }, [wave])

  const changeTheme = (event, direction = 1) => {
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + direction + themes.length) % themes.length]
    setWave({ x: event.clientX, y: event.clientY, id: Date.now() })
    setTheme(nextTheme)
  }

  const startDrag = (event) => {
    if (!event.isPrimary || event.button !== 0) return
    pointerStart.current = { id: event.pointerId, x: event.clientX, y: event.clientY, dragged: false }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const moveDrag = (event) => {
    const start = pointerStart.current
    if (!start || start.id !== event.pointerId) return
    if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 10) {
      start.dragged = true
      event.currentTarget.dataset.dragging = 'true'
    }
  }

  const endDrag = (event) => {
    const start = pointerStart.current
    if (!start || start.id !== event.pointerId) return
    pointerStart.current = null
    event.currentTarget.removeAttribute('data-dragging')
    if (!start.dragged) return

    skipClick.current = true
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    const direction = (Math.abs(dx) >= Math.abs(dy) ? dx : dy) < 0 ? -1 : 1
    changeTheme(event, direction)
  }

  const cancelDrag = (event) => {
    pointerStart.current = null
    event.currentTarget.removeAttribute('data-dragging')
  }

  const handleClick = (event) => {
    if (skipClick.current) {
      skipClick.current = false
      return
    }
    changeTheme(event)
  }

  return (
    <>
      {wave && (
        <span
          key={wave.id}
          className="theme-wave"
          style={{ '--wave-x': `${wave.x}px`, '--wave-y': `${wave.y}px` }}
          aria-hidden="true"
        />
      )}
      <div className="theme-orb">
        <span className="theme-orb__halo" aria-hidden="true" />
        <span className="theme-orb__ring theme-orb__ring--outer" aria-hidden="true" />
        <span className="theme-orb__ring theme-orb__ring--inner" aria-hidden="true" />
        <button
          type="button"
          className="theme-orb__button"
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={cancelDrag}
          onClick={handleClick}
          aria-label={`Drag or press to change color theme. Current theme: ${theme.replaceAll('-', ' ')}`}
          title="Touch to change"
        >
          <span className="theme-orb__sphere" aria-hidden="true">
            <span className="theme-orb__reflection" />
            <span className="theme-orb__core" />
          </span>
        </button>
        <span className="theme-orb__label" aria-hidden="true">Touch to change</span>
      </div>
    </>
  )
}
