import React, { PureComponent } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TopTrack } from '../../type/IDashBoard'

interface MusicBarChartProps {
  data: TopTrack[]
}

interface PayloadItem {
  name: string
  value: number
}

// Tooltip tùy chỉnh
const CustomTooltip: React.FC<{
  active?: boolean
  payload?: PayloadItem[]
  label?: string
}> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='custom-tooltip' style={{ backgroundColor: '#000', padding: 10, border: '1px solid #ccc' }}>
        <p className='label'>{label}</p>
        <p className='label'>{`listen: ${payload[0].value}`}</p>
      </div>
    )
  }
  return null
}

// Component chính
class MusicBarChart extends PureComponent<MusicBarChartProps> {
  render() {
    const { data } = this.props

    // Map dữ liệu đầu vào để phù hợp với cấu trúc của Recharts
    const chartData = data.map((item) => ({
      name: item.name,
      listen: item.listen
    }))

    return (
      <ResponsiveContainer width='100%' height={400}>
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 10
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' stroke='#fff' angle={0} tick={false} />
          <YAxis stroke='#fff' />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey='listen' barSize={40} fill='var(--main-color)' />
        </BarChart>
      </ResponsiveContainer>
    )
  }
}

export default MusicBarChart
