import { useQuery } from 'react-query'
import styled from 'styled-components'
import { fetchCoinTickers } from '../api'

interface ChartProps {
  coinId: string
}

interface PriceData {
  id: string
  name: string
  symbol: string
  rank: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  beta_value: number
  first_data_at: string
  last_updated: string
  quotes: {
    USD: {
      ath_date: string
      ath_price: number
      market_cap: number
      market_cap_change_24h: number
      percent_change_1h: number
      percent_change_1y: number
      percent_change_6h: number
      percent_change_7d: number
      percent_change_12h: number
      percent_change_15m: number
      percent_change_24h: number
      percent_change_30d: number
      percent_change_30m: number
      percent_from_price_ath: number
      price: number
      volume_24h: number
      volume_24h_change_24h: number
    }
  }
}

const OverView = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px 0px;
  gap: 10px;
`

const OverViewItem = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 400;
  background-color: ${(props) => props.theme.accentColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => props.theme.textColor};
`

function Price({ coinId }: ChartProps) {
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ['tickers', coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  )
  //📈📉
  //👉
  return (
    <div>
      <OverView>
        <OverViewItem>Price 👉 {tickersData?.quotes.USD.price}</OverViewItem>

        <OverViewItem>
          1d 👉 {tickersData?.quotes.USD.percent_change_24h}%{' '}
          {tickersData!!.quotes.USD.percent_change_24h > 0 ? '📈' : '📉'}
        </OverViewItem>

        <OverViewItem>
          7d 👉 {tickersData?.quotes.USD.percent_change_7d}%{' '}
          {tickersData!!.quotes.USD.percent_change_7d > 0 ? '📈' : '📉'}
        </OverViewItem>

        <OverViewItem>
          30d 👉 {tickersData?.quotes.USD.percent_change_30d}%{' '}
          {tickersData!!.quotes.USD.percent_change_30d > 0 ? '📈' : '📉'}
        </OverViewItem>
      </OverView>
    </div>
  )
}

export default Price
