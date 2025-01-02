import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Plugin } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface DoughnutChartProps {
  labels: string[]
  data: number[]
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ labels, data }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FFB6C1',
          '#8A2BE2',
          '#A52A2A',
          '#FFD700',
          '#32CD32',
          '#00BFFF'
        ],
        borderWidth: 0,
        hoverBorderWidth: 0
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          color: '#fff'
        }
      },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: (tooltipItem: any) => {
            const total = tooltipItem.dataset.data.reduce((sum: number, val: number) => sum + val, 0)
            const value = tooltipItem.raw
            const percentage = ((value / total) * 100).toFixed(1) + '%'
            return percentage
          }
        }
      }
    },
    cutout: '80%'
  }

  const centerTextPlugin: Plugin<'doughnut'> = {
    id: 'centerText',
    beforeDraw: (chart) => {
      const { ctx, chartArea } = chart
      const width = chartArea.right - chartArea.left
      const height = chartArea.bottom - chartArea.top

      ctx.save()
      ctx.font = '30px Arial'
      ctx.fillStyle = '#fff'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('Song ratio', chartArea.left + width / 2, chartArea.top + height / 2 - 20)
      ctx.fillText('by genre', chartArea.left + width / 2, chartArea.top + height / 2 + 20)
      ctx.restore()
    }
  }

  return (
    <div style={{ width: '390px', margin: 'auto' }}>
      <Doughnut data={chartData} options={options} plugins={[centerTextPlugin]} />
    </div>
  )
}

export default DoughnutChart
