/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('calculates amounts correctly', () => {
    render(<App />);
    const billAmountInput = screen.getByLabelText('Bill Amount: $');
    const numberOfPeopleInput = screen.getByLabelText('Number of People:');
    const tipPercentageInput = screen.getByLabelText('Tip Percentage: %');

    fireEvent.change(billAmountInput, { target: { value: '100' } });
    fireEvent.change(numberOfPeopleInput, { target: { value: '5' } });
    fireEvent.change(tipPercentageInput, { target: { value: '10' } });

    const calculateButton = screen.getByText('Calculate');
    fireEvent.click(calculateButton);

    const tipAmountText = screen.getByText(/Tip Amount:\s*\$/);
    const eachPersonBillText = screen.getByText(/Each Person Bill:\s*\$/);
    const totalAmountText = screen.getByText(/Total Amount:\s*\$/);

    const tipAmount = parseFloat(tipAmountText?.textContent?.split('$')[1]);
    const eachPersonBill = parseFloat(eachPersonBillText?.textContent?.split('$')[1]);
    const totalAmount = parseFloat(totalAmountText?.textContent?.split('$')[1]);

    expect(tipAmount).toBeCloseTo(10);
    expect(eachPersonBill).toBeCloseTo(22);
    expect(totalAmount).toBeCloseTo(110);
  });
});
