import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const COLORS = ['#6366f1', '#374151']

export default function TalkRatioChart({ repRatio, prospectRatio }) {
  const data = [
    { name: 'Rep', value: repRatio },
    { name: 'Prospect', value: prospectRatio },
  ]

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }}
          labelStyle={{ color: '#fff' }}
          formatter={(value) => [`${value}%`]}
        />
        <Legend
          formatter={(value) => (
            <span style={{ color: '#9ca3af', fontSize: '13px' }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}