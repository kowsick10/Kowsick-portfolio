import { useMemo, useRef } from 'react'

// 3D tilt + cursor spotlight. Only on fine pointers and when motion is allowed.
export default function useTilt(max = 7) {
  const ref = useRef(null)
  const enabled = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
    if (enabled) {
      el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) translateY(-4px)`
    }
  }
  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }
  return { ref, onMouseMove, onMouseLeave }
}
