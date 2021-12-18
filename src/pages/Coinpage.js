import React, { useContext } from 'react'
import {
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import ReactHtmlParser from 'react-html-parser'
import { Crypto } from '../CryptoContext'
import { SingleCoin } from '../config/api'
import CoinInfo from '../components/CoinInfo'

function CoinPage() {
  const { id } = useParams()
  const [coin, setCoin] = useState()
  const { currency, symbol } = useContext(Crypto)

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id))

    setCoin(data)
  }

  console.log(coin)

  useEffect(() => {
    fetchCoin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // we have googled this ,how to display numers wid commas
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    sidebar: {
      width: '30%',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 25,
      borderRight: '2px solid grey',
    },
    heading: {
      fontWeight: 'bold',
      marginBottom: 20,
      fontFamily: 'Montserrat',
    },
    description: {
      width: '100%',
      fontFamily: 'Montserrat',
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: 'justify',
    },
    marketData: {
      alignSelf: 'start',
      padding: 25,
      paddingTop: 10,
      width: '100%',
      [theme.breakpoints.down('md')]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      [theme.breakpoints.down('xs')]: {
        alignItems: 'start',
      },
    },
  }))

  const classes = useStyles()

  // below line is to show loading when data is being fetched
  if (!coin) return <LinearProgress style={{ backgroundColor: 'gold' }} />

  return (
    <div className={classes.container}>
      {/* First div is going to be for our sidebar  */}
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height='200'
          style={{ marginBottom: 20 }}
        />
        <Typography variant='h3' className={classes.heading}>
          {coin?.name}
        </Typography>
        {/* despription in api is very large we dont need that much so we will take just 0th index details in english language thats why en between description and split */}

        {/* <Typography variant='subtitle1' className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split('. ')[0])}.
        </Typography> */}

        <div className={classes.marketData}>
          <span style={{ display: 'flex' }}>
            <Typography variant='h5' className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant='h5'
              style={{
                fontFamily: 'Montserrat',
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Typography variant='h5' className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant='h5'
              style={{
                fontFamily: 'Montserrat',
              }}
            >
              {symbol}{' '}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Typography variant='h5' className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant='h5'
              style={{
                fontFamily: 'Montserrat',
              }}
            >
              {symbol}{' '}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
          {/* {user && (
            <Button
              variant='outlined'
              style={{
                width: '100%',
                height: 40,
                backgroundColor: inWatchlist ? '#ff0000' : '#EEBC1D',
              }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </Button>
          )} */}
        </div>
      </div>
      {/* Now we will put details of coins like chart */}
      <CoinInfo coin={coin} />
    </div>
  )
}

export default CoinPage
