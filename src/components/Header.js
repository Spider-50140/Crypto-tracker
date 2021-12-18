import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from '@material-ui/core'
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import React, { useContext } from 'react'
import { Crypto } from '../CryptoContext'

// this code we have taken from website of material ui for styling
const useStyles = makeStyles((theme) => ({
  // we want our title to change
  title: {
    flex: 1,
    color: 'gold',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
}))

// this code we have taken from website of material ui for darktheme
const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    type: 'dark',
  },
})

function Header() {
  const classes = useStyles()
  // history is used to go to a particular page on clicking
  const history = useHistory()
  const { currency, setCurrency } = useContext(Crypto)
  console.log(currency)

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        {/* container basically helps us to make our app responsive */}
        <AppBar color='transparent' position='static'>
          <Container>
            <Toolbar>
              {/* whenver we want to add text typography is used */}

              <Typography
                // whenevr we click on Crypto Hunter we will be forwarded to homepage
                onClick={() => history.push(`/`)}
                variant='h6'
                // classes.x    ,  x=thing we want to change in above usestyle we wrote x = title
                className={classes.title}
              >
                Crypto Hunter
              </Typography>
              {/* Now we will use select component to select between US and INR */}
              <Select
                variant='outlined'
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={currency}
                style={{ width: 85, height: 40 }}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={'USD'}>USD</MenuItem>
                <MenuItem value={'INR'}>INR</MenuItem>
              </Select>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </div>
  )
}

export default Header
