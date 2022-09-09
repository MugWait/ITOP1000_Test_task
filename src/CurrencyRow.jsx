import React from 'react'

const CurrencyRow = ({currencyOptions, selectedCurrency, onChangeCurrency, amount,onChangeAmount}) => {

  return (
    <div className='group'>
        <input type="number" value={amount} onChange={onChangeAmount}/>
        <select value={selectedCurrency} onChange={onChangeCurrency}>
            {currencyOptions.map((option)=>(
                <option key={option} value={option}>{option}</option>
            ))}
            
        </select>
    </div>
  )
}

export default CurrencyRow