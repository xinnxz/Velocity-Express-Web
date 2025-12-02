
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import SafeIcon from '@/components/common/SafeIcon'

interface NotificationCategoryCardProps {
  title: string
  description: string
  icon: string
  isEnabled: boolean
  onChange: () => void
}

export default function NotificationCategoryCard({
  title,
  description,
  icon,
  isEnabled,
  onChange
}: NotificationCategoryCardProps) {
  return (
    <Card className={`glass-effect border-border/50 cursor-pointer transition-all hover:border-primary/50 ${
      isEnabled ? 'bg-primary/5' : 'bg-muted/20'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
              isEnabled 
                ? 'bg-primary/20' 
                : 'bg-muted/50'
            }`}>
              <SafeIcon 
                name={icon} 
                className={`w-5 h-5 ${
                  isEnabled 
                    ? 'text-primary' 
                    : 'text-muted-foreground'
                }`}
              />
            </div>
            <div className="flex-1">
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription className="text-xs mt-1">{description}</CardDescription>
            </div>
          </div>
          <Switch 
            checked={isEnabled}
            onCheckedChange={onChange}
            className="mt-1"
          />
        </div>
      </CardHeader>
    </Card>
  )
}
