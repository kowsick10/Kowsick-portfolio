import { useEffect, useState } from 'react'

export default function useTyping(words, { speed = 70, back = 35, hold = 1600 } = {}) {
  const [text, setText] = useState('')

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0])
      return undefined
    }
    let i = 0, j = 0, deleting = false, t
    const tick = () => {
      const w = words[i]
      if (!deleting) {
        j += 1
        setText(w.slice(0, j))
        if (j === w.length) {
          deleting = true
          t = setTimeout(tick, hold)
          return
        }
      } else {
        j -= 1
        setText(w.slice(0, j))
        if (j === 0) {
          deleting = false
          i = (i + 1) % words.length
        }
      }
      t = setTimeout(tick, deleting ? back : speed)
    }
    t = setTimeout(tick, 500)
    return () => clearTimeout(t)
  }, [words, speed, back, hold])

  return text
}
