import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { CoinList } from '../config/api'
import axios from 'axios'
import { Crypto } from '../CryptoContext'

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const CoinsTable = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const [coins, setcoins] = useState([])
  const [loading, setloading] = useState(false)
  const { currency, setCurrency, symbol } = useContext(Crypto)

  const fetchcoins = async () => {
    setloading(true)
    const { data } = await axios.get(CoinList(currency))
    setcoins(data)
    setloading(false)
  }

  console.log(coins)

  useEffect(() => {
    fetchcoins()
  }, [currency])

  const useStyles = makeStyles({
    row: {
      backgroundColor: '#16171a',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#131111',
      },
      fontFamily: 'Montserrat',
    },
    pagination: {
      '& .MuiPaginationItem-root': {
        color: 'gold',
      },
    },
  })

  const classes = useStyles()
  const history = useHistory()

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: 'dark',
    },
  })
  // by default it will return us list of all coins , i.e. if we haven't typed anything then its going to display list of all but if we have searched something(searched by name or small form) then that detail will be returned
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    )
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: 'center' }}>
        {/* below line is for heading in table */}
        <Typography
          variant='h4'
          style={{ margin: 18, fontFamily: 'Montserrat' }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        {/* below line is for search bar in table */}
        <TextField
          label='Search For a Crypto Currency..'
          variant='outlined'
          style={{ marginBottom: 20, width: '100%' }}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* below code is for creating tables which we have seen in material ui website */}
        <TableContainer component={Paper}>
          {/* if coins r still loading we will show linear progression ,reference taken from material UI */}
          {loading ? (
            <LinearProgress style={{ backgroundColor: 'gold' }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: '#EEBC1D' }}>
                {/* below line will create rows */}
                <TableRow>
                  {['Coin', 'Price', '24h Change', 'Market Cap'].map((head) => (
                    <TableCell
                      style={{
                        color: 'black',
                        fontWeight: '700',
                        fontFamily: 'Montserrat',
                      }}
                      key={head}
                      align={head === 'Coin' ? 'left' : 'right'}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  // at once we want to display 10 components so here what we are saying is for example of page num is 2 then display from 10 to 20 only , if page is 3 then [(3-1)*10] i.e 20 to [(3-1)*10+10] i.e 30 , by default we have kept page as value 1
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0
                    return (
                      <TableRow
                        // upon clicking to a coin we want to go to another page where details of that coin is there
                        onClick={() => history.push(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        {/* first table cell will have image , symbol of coin and name of coin */}
                        <TableCell
                          component='th'
                          scope='row'
                          style={{
                            display: 'flex',
                            gap: 15,
                          }}
                        >
                          <img
                            src={row.image}
                            alt={row.name}
                            height='50'
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                          >
                            <span
                              style={{
                                textTransform: 'uppercase',
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: 'darkgrey' }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        {/* next we have current price of that coin */}
                        <TableCell align='right'>
                          {symbol}{' '}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        {/* then we have 24hr change of that coin */}
                        <TableCell
                          align='right'
                          style={{
                            color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                            fontWeight: 500,
                          }}
                        >
                          {profit && '+'}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        {/* then we have Market cap of that coin  */}
                        <TableCell align='right'>
                          {symbol}{' '}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        {/* Comes from @material-ui/lab */}
        <Pagination
          count={parseInt((handleSearch().length / 10).toFixed(0))}
          style={{
            padding: 20,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value)
            window.scroll(0, 450)
          }}
        />
      </Container>
    </ThemeProvider>
  )
}

export default CoinsTable
