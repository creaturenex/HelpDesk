import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Label, LabelList } from 'recharts';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";


const chartData = [
  { name: 'New', value: 2 },
  { name: 'InProgress', value: 2 },
  { name: 'Resolved', value: 1 },
];

const chartConfig = {
  New: {
    label: "New",
    color: "hsl(var(--chart-1))",
  },
  InProgress: {
    label: "In Progress",
    color: "hsl(var(--chart-2))",
  },
  Resolved: {
    label: "Resolved",
    color: "hsl(var(--chart-3))"
  }
} satisfies ChartConfig

export default function Charts() {
  return (
    <>
    <Card className='hidden mt-24 md:block'>
      <CardHeader>
        <CardTitle>Ticket Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] ">
          <ResponsiveContainer width={800} height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="75%"
                startAngle={180}
                endAngle={0}
                innerRadius="60%"
                outerRadius="100%"
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`var(--color-${entry.name.replace(' ', '-')})`} />
                ))}
                <LabelList className="text-sm" fill="#333" stroke='#333' dataKey="name" position="outside" />
                <Label className="text-black" value={`Total Tickets ${5}`} position="center" />
              </Pie>
  
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
    <div className='h-8'/>
    </>
  )
}
