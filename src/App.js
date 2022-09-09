import { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';
import Arrow from './svg/arrow.svg'



const URL = 'https://api.fastforex.io/fetch-multi?from=UAH&to=USD,EUR&api_key=b865adba3e-11b44fc2f0-rhwikg'
const BASE_URL = 'https://api.fastforex.io/fetch-multi'

function App() {


  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState(0)
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)




  let toAmount, fromAmount
  if(amountInFromCurrency){
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else{
    toAmount = amount
    fromAmount = amount / exchangeRate
  }


  useEffect(()=>{
    fetch(URL)
    .then(res => res.json())
    .then(data => {
      const first_currency = Object.keys(data.results)[0]
      setCurrencyOptions([data.base, ...Object.keys(data.results)])
      setFromCurrency(data.base)
      setToCurrency(first_currency)
      setExchangeRate(data.results[first_currency])
    })
  },[])

  
  useEffect(() =>{
    if(fromCurrency !=null && toCurrency !=null){
      fetch(`${BASE_URL}?from=${fromCurrency}&to=${toCurrency}&api_key=b865adba3e-11b44fc2f0-rhwikg`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.results[toCurrency]))
    }
   
  },[fromCurrency,toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }
  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <>
      <header>
        <div>
        <h1>Конвертер валют</h1>
        <CurrencyRow 
        currencyOptions={currencyOptions} 
        selectedCurrency={fromCurrency} 
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        amount = {fromAmount}
        onChangeAmount={handleFromAmountChange}
        />
        <div className='img'><img   src={Arrow}/></div>
        <CurrencyRow 
        currencyOptions={currencyOptions} 
        selectedCurrency={toCurrency} 
        onChangeCurrency={e => setToCurrency(e.target.value)}
        amount = {toAmount}
        onChangeAmount={handleToAmountChange}
        />
        </div>
      </header>
    </>
  );
}

export default App;
