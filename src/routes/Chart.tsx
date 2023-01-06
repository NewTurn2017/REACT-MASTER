import { useQuery } from 'react-query'
import { fetchCoinHistory } from '../api'
import ApexCharts from 'react-apexcharts'

interface ChartProps {
  coinId: string
}

interface IHistoricalData {
  time_open: number
  time_close: number
  open: string
  high: string
  low: string
  close: string
  volume: string
  market_cap: number
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 5000,
    }
  )

  const seriesData = data?.map((d: IHistoricalData) => ({
    x: new Date(d.time_open * 1000),
    y: [
      parseFloat(d.open),
      parseFloat(d.high),
      parseFloat(d.low),
      parseFloat(d.close),
    ],
  }))

  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexCharts
          // candlestick chart
          options={{
            chart: {
              type: 'candlestick',
              height: 350,
              toolbar: {
                show: false,
              },
            },
            grid: {
              show: false,
            },

            xaxis: {
              type: 'datetime',
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            tooltip: {
              enabled: false,
            },
            //beautify the chart

            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#D23C4B',
                  downward: '#1C5ED2',
                },
              },
            },
          }}
          series={[{ data: seriesData }] as unknown as number[]}
          type="candlestick"
          height={350}
        />
      )}
    </div>
  )
}

export default Chart
