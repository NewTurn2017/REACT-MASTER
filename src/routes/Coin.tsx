import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom'
import styled from 'styled-components'
import Chart from './Chart'
import Price from './Price'
import { fetchCoinInfo, fetchCoinTickers } from '../api'
import { Helmet } from 'react-helmet'

interface RouteParams {
  coinId: string
}

interface RouteState {
  name: string
}

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`

const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`

interface InfoData {
  id: string
  name: string
  symbol: string
  rank: number
  is_new: boolean
  is_active: boolean
  type: string
  logo: string
  description: string
  message: string
  open_source: boolean
  started_at: string
  development_status: string
  hardware_wallet: boolean
  proof_type: string
  org_structure: string
  hash_algorithm: string
  first_data_at: string
  last_data_at: string
}

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`
const Back = styled.div`
  margin-right: 50px;
  a {
    color: '#fbc531';
    font-size: 45px;
  }
`
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`
const Description = styled.p`
  margin: 20px 0px;
`

function Coin() {
  const { coinId } = useParams<RouteParams>()
  const { state } = useLocation<RouteState>()
  const priceMatch = useRouteMatch(`/${coinId}/price`)
  const chartMatch = useRouteMatch(`/${coinId}/chart`)

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ['info', coinId],
    () => fetchCoinInfo(coinId),
    {
      refetchInterval: 5000,
    }
  )
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ['tickers', coinId],
    () => fetchCoinTickers(coinId)
  )

  const loading = infoLoading || tickersLoading

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? 'Loading..' : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Back>
          <Link to="/">HOME👈</Link>
        </Back>

        <Title>
          {state?.name ? state.name : loading ? 'Loading..' : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/${coinId}/chart`}>
              <Chart coinId={coinId} />
            </Route>
            <Route path={`/${coinId}/price`}>
              <Price coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  )
}

export default Coin
