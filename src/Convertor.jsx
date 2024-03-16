import React, { useEffect, useState } from 'react';

const Convertor = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('ARS');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [availableCurrencies, setAvailableCurrencies] = useState([]);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );

        if (!response.ok) {
          throw new Error('Error fetching exchange rate');
        }

        const data = await response.json();
        setExchangeRate(data.rates[toCurrency]);
        setAvailableCurrencies(Object.keys(data.rates));
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate !== null) {
      let result = amount * exchangeRate;
      setConvertedAmount(result.toFixed(2));
    }
  }, [amount, exchangeRate]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <div className=' w-full h-screen flex flex-col justify-center items-center'>
     <h2 className='text-2xl text-center font-bold mb-4 text-white'>Convertidor de monedas</h2>
    <div className='w-1/2 h-1/4 mx-auto p-4 grid grid-cols-3 flex flex-col justify-center items-center border border-gray-300 rounded bg-green-500'>
      <div className='flex flex-col'>
        <select className='p-2 mb-4 w-full border border-gray-300 rounded ' value={fromCurrency} onChange={handleFromCurrencyChange}>
          {availableCurrencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <input type="number" className='p-2 mb-4 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' value={amount} onChange={handleAmountChange} />
      </div>
      <p className='text-white font-bold'>Convertido a:</p>
      <div>
        
        <select className='p-2 mb-4 w-full border border-gray-300 rounded ' value={toCurrency} onChange={handleToCurrencyChange}>
          {availableCurrencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <p className='border mb-4 border-gray-300 rounded p-2 bg-white'>{convertedAmount}</p>
      </div>
    </div>
    </div>
  );
};
  
export default Convertor;
