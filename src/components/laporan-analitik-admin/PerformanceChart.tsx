
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  LineChart,
  Line,
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

interface PerformanceChartProps {
  dateRange: DateRange
}

export default function PerformanceChart({ dateRange }: PerformanceChartProps) {
  // Mock data for performance chart
  const data = [
    { date: '1 Jan', delivered: 450, failed: 12, pending: 28 },
    { date: '5 Jan', delivered: 520, failed: 8, pending: 22 },
    { date: '10 Jan', delivered: 580, failed: 10, pending: 18 },
    { date: '15 Jan', delivered: 620, failed: 6, pending: 15 },
    { date: '20 Jan', delivered: 710, failed: 8, pending: 12 },
    { date: '25 Jan', delivered: 780, failed: 5, pending: 10 },
    { date: '30 Jan', delivered: 850, failed: 7, pending: 8 },
  ]

  return (
    <Card className="glass-effect border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <span className="text-primary text-sm font-bold">📊</span>
          </div>
          Kinerja Pengiriman
        </CardTitle>
        <CardDescription>
          Tren pengiriman berhasil, gagal, dan tertunda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
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
                iconType="line"
              />
              <Line 
                type="monotone" 
                dataKey="delivered" 
                stroke="hsl(var(--chart-3))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--chart-3))', r: 4 }}
                activeDot={{ r: 6 }}
                name="Terkirim"
              />
              <Line 
                type="monotone" 
                dataKey="failed" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--destructive))', r: 4 }}
                activeDot={{ r: 6 }}
                name="Gagal"
              />
              <Line 
                type="monotone" 
                dataKey="pending" 
                stroke="hsl(var(--chart-4))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--chart-4))', r: 4 }}
                activeDot={{ r: 6 }}
                name="Tertunda"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
