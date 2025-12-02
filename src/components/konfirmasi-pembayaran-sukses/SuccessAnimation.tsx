
import { useEffect, useRef } from 'react'

export default function SuccessAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Create confetti particles
    if (!containerRef.current) return

    const createConfetti = () => {
      const confetti = document.createElement('div')
      const size = Math.random() * 10 + 5
      const duration = Math.random() * 3 + 2
      const delay = Math.random() * 0.5
      const xOffset = Math.random() * 400 - 200
      const rotation = Math.random() * 360

      confetti.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: hsl(189 100% 50%);
        border-radius: 50%;
        pointer-events: none;
        left: 50%;
        top: 50%;
        opacity: 0.8;
        animation: confetti-fall ${duration}s ease-out ${delay}s forwards;
        transform: translateX(${xOffset}px) rotate(${rotation}deg);
      `

      containerRef.current?.appendChild(confetti)

      setTimeout(() => confetti.remove(), (duration + delay) * 1000)
    }

    // Add animation keyframes
    const style = document.createElement('style')
    style.textContent = `
      @keyframes confetti-fall {
        to {
          transform: translateY(500px) rotate(720deg);
          opacity: 0;
        }
      }
      @keyframes pulse-check {
        0% {
          transform: scale(0);
          opacity: 0;
        }
        50% {
          transform: scale(1.1);
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
    `
    document.head.appendChild(style)

    // Create confetti bursts
    for (let i = 0; i < 30; i++) {
      setTimeout(createConfetti, i * 50)
    }

    return () => {
      style.remove()
    }
  }, [])

  return (
    <div ref={containerRef} className="relative flex justify-center py-8">
      <div className="relative w-24 h-24 md:w-32 md:h-32">
        {/* Outer glow circle */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-2xl animate-pulse" />
        
        {/* Middle circle */}
        <div className="absolute inset-2 rounded-full border-2 border-primary/50 animate-spin" style={{ animationDuration: '3s' }} />
        
        {/* Inner success circle */}
        <div className="absolute inset-0 rounded-full bg-gradient-primary flex items-center justify-center neon-glow" style={{ animation: 'pulse-check 0.6s ease-out' }}>
          <svg
            className="w-12 h-12 md:w-16 md:h-16 text-primary-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ animation: 'pulse-check 0.6s ease-out' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
