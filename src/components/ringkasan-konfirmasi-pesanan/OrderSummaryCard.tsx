
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'

interface OrderSummaryCardProps {
  title: string
  icon: string
  editHref?: string
  editLabel?: string
  children: React.ReactNode
}

export default function OrderSummaryCard({
  title,
  icon,
  editHref,
  editLabel = 'Edit',
  children
}: OrderSummaryCardProps) {
  return (
    <Card className="glass-effect border-border/50 hover:border-primary/30 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <SafeIcon name={icon} className="w-5 h-5 text-primary" />
          </div>
          {title}
        </CardTitle>
        {editHref && (
          <Button 
            variant="ghost" 
            size="sm"
            asChild
            className="text-primary hover:text-primary hover:bg-primary/10"
          >
            <a href={editHref}>
              <SafeIcon name="Edit2" className="w-4 h-4 mr-1.5" />
              {editLabel}
            </a>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}
