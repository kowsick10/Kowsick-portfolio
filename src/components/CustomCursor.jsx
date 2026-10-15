import { useEffect, useRef, useState } from 'react'

// Desktop-only (fine pointer) and skipped when reduced motion is requested.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const ring = useRef(null)
  const dot = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(fine && !reduce)
  }, [])

  useEffect(() => {
    if (!enabled) return undefined
    let x = -100, y = -100, rx = -100, ry = -100, raf
    const move = (e) => {
      x = e.clientX
      y = e.clientY
      if (dot.current) dot.current.style.transform = `translate3d(${x}px,${y}px,0)`
    }
    const over = (e) => {
      const hot = e.target.closest && e.target.closest('a,button,[role="button"],input,textarea,label,select')
      ring.current?.classList.toggle('hover', !!hot)
    }
    const hide = () => { if (ring.current) ring.current.style.opacity = 0; if (dot.current) dot.current.style.opacity = 0 }
    const show = () => { if (ring.current) ring.current.style.opacity = 1; if (dot.current) dot.current.style.opacity = 1 }
    const loop = () => {
      rx += (x - rx) * 0.18
      ry += (y - ry) * 0.18
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`
      raf = requestAnimationFrame(loop)
    }
    loop()
    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    document.documentElement.addEventListener('mouseleave', hide)
    document.documentElement.addEventListener('mouseenter', show)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.documentElement.removeEventListener('mouseleave', hide)
      document.documentElement.removeEventListener('mouseenter', show)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
