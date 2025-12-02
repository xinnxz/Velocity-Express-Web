
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface DateRange {
  from: Date
  to: Date
}

interface VolumeChartProps {
  dateRange: DateRange
}

export default function VolumeChart({ dateRange }: VolumeChartProps) {
  // Mock data for volume chart
  const data = [
    { date: '1 Jan', regular: 450, express: 280, drone: 120 },
    { date: '5 Jan', regular: 520, express: 320, drone: 180 },
    { date: '10 Jan', regular: 580, express: 380, drone: 220 },
    { date: '15 Jan', regular: 620, express: 420, drone: 280 },
    { date: '20 Jan', regular: 710, express: 480, drone: 340 },
    { date: '25 Jan', regular: 780, express: 520, drone: 400 },
    { date: '30 Jan', regular: 850, express: 580, drone: 450 },
  ]

  return (
    <Card className="glass-effect border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
            <span className="text-secondary text-sm font-bold">📦</span>
          </div>
          Volume Paket per Layanan
        </CardTitle>
        <CardDescription>
          Distribusi volume pengiriman berdasarkan jenis layanan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
              />
              <Bar 
                dataKey="regular" 
                fill="hsl(var(--primary))" 
                name="Reguler"
                radius={[8, 8, 0, 0]}
              />
              <Bar 
                dataKey="express" 
                fill="hsl(var(--secondary))" 
                name="Express"
                radius={[8, 8, 0, 0]}
              />
              <Bar 
                dataKey="drone" 
                fill="hsl(var(--chart-3))" 
                name="Drone"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
