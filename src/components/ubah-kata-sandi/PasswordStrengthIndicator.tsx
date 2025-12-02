
import { useMemo } from 'react'
import SafeIcon from '@/components/common/SafeIcon'

interface PasswordStrengthIndicatorProps {
  password: string
}

type StrengthLevel = 'weak' | 'fair' | 'good' | 'strong'

interface StrengthConfig {
  level: StrengthLevel
  label: string
  color: string
  bgColor: string
  percentage: number
  requirements: string[]
}

export default function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const strength = useMemo(() => {
    let score = 0
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    }

    // Calculate score
    if (requirements.length) score += 1
    if (requirements.uppercase) score += 1
    if (requirements.lowercase) score += 1
    if (requirements.numbers) score += 1
    if (requirements.special) score += 1

    // Determine strength level
    let level: StrengthLevel = 'weak'
    let label = 'Sangat Lemah'
    let color = 'text-destructive'
    let bgColor = 'bg-destructive/20'
    let percentage = 20

    if (score >= 4) {
      level = 'strong'
      label = 'Sangat Kuat'
      color = 'text-green-400'
      bgColor = 'bg-green-500/20'
      percentage = 100
    } else if (score === 3) {
      level = 'good'
      label = 'Kuat'
      color = 'text-green-400'
      bgColor = 'bg-green-500/20'
      percentage = 75
    } else if (score === 2) {
      level = 'fair'
      label = 'Sedang'
      color = 'text-yellow-400'
      bgColor = 'bg-yellow-500/20'
      percentage = 50
    }

    return {
      level,
      label,
      color,
      bgColor,
      percentage,
      requirements
    }
  }, [password])

  return (
    <div className="space-y-3">
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Kekuatan Kata Sandi</span>
          <span className={strength.color}>{strength.label}</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${strength.bgColor.replace('bg-', 'bg-')}`}
            style={{
              width: `${strength.percentage}%`,
              backgroundColor: strength.level === 'weak' ? '#ef4444' :
                               strength.level === 'fair' ? '#eab308' :
                               strength.level === 'good' ? '#22c55e' :
                               '#16a34a'
            }}
          />
        </div>
      </div>

      {/* Requirements Checklist */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Persyaratan:</p>
        <div className="space-y-1.5">
          {[
            { key: 'length', label: 'Minimal 8 karakter', icon: 'length' },
            { key: 'uppercase', label: 'Huruf besar (A-Z)', icon: 'uppercase' },
            { key: 'lowercase', label: 'Huruf kecil (a-z)', icon: 'lowercase' },
            { key: 'numbers', label: 'Angka (0-9)', icon: 'numbers' },
            { key: 'special', label: 'Karakter spesial (!@#$%)', icon: 'special' }
          ].map((req) => {
            const isMet = strength.requirements[req.key as keyof typeof strength.requirements]
            return (
              <div key={req.key} className="flex items-center gap-2 text-xs">
                <div className={`w-4 h-4 rounded flex items-center justify-center ${
                  isMet 
                    ? 'bg-green-500/20 border border-green-500/50' 
                    : 'bg-muted border border-border'
                }`}>
                  {isMet && (
                    <SafeIcon name="Check" className="w-3 h-3 text-green-400" />
                  )}
                </div>
                <span className={isMet ? 'text-green-400' : 'text-muted-foreground'}>
                  {req.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
