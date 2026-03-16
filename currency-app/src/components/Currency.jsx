import React, { useState } from 'react'
import '../css/currency.css'
import { LuArrowBigRightDash } from "react-icons/lu";
import axios from 'axios';

const BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
const API_KEY = import.meta.env.VITE_API_KEY;

function Currency() {

  const[amount, setAmount] = useState(0);
  const[fromCurrency, setFromCurrency] = useState('USD');
  const[toCurrency, setToCurrency] = useState('TRY');
  const[result, setResult] = useState(0);

  const exchange = async () => {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&currencies=${fromCurrency},${toCurrency}`)
    const result = ((response.data.data[toCurrency] / response.data.data[fromCurrency]) * amount).toFixed(2);
    setResult(result);
  }
  


  return (
    <div className='currency-div'>
      <div className='header-div'>
        <h3>DÖVİZ KURU UYGULAMASI</h3>
      </div>

      <div className='body-div'>
        <input
          value={amount}
          onChange={(e)=> setAmount(e.target.value)}
         type="number" className='amount' />
        <select onChange={(e)=> setFromCurrency(e.target.value)} className='from-currency-option'  name="" id="">
          <option value="">USD</option>
          <option value="">EUR</option>
          <option value="">TRY</option>
        </select>

        <LuArrowBigRightDash className='arrow-icon' />

        <select onChange={(e) => setToCurrency(e.target.value)} className='to-currency-option'  name="" id="">
          <option value="">TRY</option>
          <option value="">USD</option>
          <option value="">EUR</option>
        </select>

        <input value={result} onChange={(e) => setResult(e.target.value)} type="number" className='result' />
      </div>

      <div>
        <button onClick={exchange} className='exchangeButton'>ÇEVİR</button>
      </div>


    </div>
  )
}

export default Currency