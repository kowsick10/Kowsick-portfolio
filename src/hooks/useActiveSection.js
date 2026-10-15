import { useEffect, useState } from 'react'

// Scroll-position based, so it also works for lazily mounted sections.
export default function useActiveSection(ids) {
  const [active, setActive] = useState('')

  useEffect(() => {
    let ticking = false
    const update = () => {
      const line = window.innerHeight * 0.35
      // Pick the section whose top is closest above the line, independent of nav order.
      let current = ''
      let closest = -Infinity
      for (const id of ids) {
        const el = document.getElementById(id)
        const top = el?.getBoundingClientRect().top
        if (top !== undefined && top <= line && top > closest) {
          closest = top
          current = id
        }
      }
      setActive(current)
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}
