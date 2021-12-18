import './App.css'
import { makeStyles } from '@material-ui/core'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/Homepage'
import CoinPage from './pages/Coinpage'

const useStyles = makeStyles(() => ({
  // we want our App to change
  App: {
    backgroundColor: '#14161a',
    color: 'white',
    minHeight: '100vh',
  },
}))

function App() {
  const classes = useStyles()
  return (
    <BrowserRouter>
      {/* // classes.x    ,  x=thing we want to change in above usestyle we wrote x = App */}
      <div className={classes.App}>
        <Header />
        <Route path='/' component={HomePage} exact />
        <Route path='/coins/:id' component={CoinPage} />
      </div>
    </BrowserRouter>
  )
}

export default App
