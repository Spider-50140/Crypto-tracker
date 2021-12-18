import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

export const Crypto = createContext()

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState('INR')
  const [symbol, setSymbol] = useState('₹')
  // const [alert, setAlert] = useState({
  //   open: false,
  //   message: '',
  //   type: 'success',
  // })
  // const [user, setUser] = useState(null)
  // const [coins, setCoins] = useState([])
  // const [loading, setLoading] = useState(false)
  // const [watchlist, setWatchlist] = useState([])

  // every time our currency changes this useffect will be called and we will get proper symbols automatically
  useEffect(() => {
    if (currency === 'INR') {
      setSymbol('₹')
    } else if (currency === 'USD') {
      setSymbol('$')
    }
    // fetchCoins()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency])

  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Crypto.Provider>
  )
}

export default CryptoContext

// export const CryptoState = () => {
//   return useContext(Crypto)
// }
