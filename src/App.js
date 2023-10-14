import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [billAmount, setBillAmount] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [tipPercentage, setTipPercentage] = useState('');
  const [output, setOutput] = useState(null);

  const calculateTotalAmount = () => {
    const billAmountFloat = parseFloat(billAmount);
    const numberOfPeopleInt = parseInt(numberOfPeople);
    const tipAmount = (billAmountFloat * (parseFloat(tipPercentage) / 100)) || 0;
    const totalBillAmount = billAmountFloat + tipAmount;
    const eachPersonBill = totalBillAmount / numberOfPeopleInt;

    return { tipAmount, eachPersonBill, totalBillAmount };
  };

  const handleCalculate = () => {
    if (billAmount < 0 || numberOfPeople < 0 || tipPercentage < 0) {
      alert('Please enter non-negative values.');
      return;
    }

    const { tipAmount, eachPersonBill, totalBillAmount } = calculateTotalAmount();
    setOutput({
      tipAmount: tipAmount.toFixed(2),
      eachPersonBill: eachPersonBill.toFixed(2),
      totalBillAmount: totalBillAmount.toFixed(2)
    });
  };

  return (
    <div className="App">
      <h1>Bill Splitter</h1>
      <div className="input-group">
        <label htmlFor="billAmount">Bill Amount: $</label>
        <input
          type="number"
          id="billAmount"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
          min="0"
        />
      </div>
      <div className="input-group">
        <label htmlFor="numberOfPeople">Number of People: </label>
        <input
          type="number"
          id="numberOfPeople"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(e.target.value)}
          min="1"
        />
      </div>
      <div className="input-group">
        <label htmlFor="tipPercentage">Tip Percentage: %</label>
        <input
          type="number"
          id="tipPercentage"
          value={tipPercentage}
          onChange={(e) => setTipPercentage(e.target.value)}
          min="0"
        />
      </div>
      <button onClick={handleCalculate}>Calculate</button>

      {output && (
        <div className="output">
          <h2>Output</h2>
          <p>Tip Amount: ${output.tipAmount}</p>
          <p>Each Person Bill: ${output.eachPersonBill}</p>
          <p>Total Amount: ${output.totalBillAmount}</p>
        </div>
      )}
    </div>
  );
};

export default App;
