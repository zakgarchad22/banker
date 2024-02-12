import React, { useState } from 'react';
import '../styles/operations.css';

const Operations = ({ addTransaction }) => {
  const [amount, setAmount] = useState("")
  const [vendor, setVendor] = useState("")
  const [category, setCategory] = useState("")
  const onAmountChange = (e) => setAmount(e.target.value)
  const onVendorChange = (e) => setVendor(e.target.value)
  const onCategoryChange = (e) => setCategory(e.target.value)

  const submitTransaction = (type) => {
    const transactionAmount = type === "withdraw" ? -Math.abs(Number(amount)) : Math.abs(Number(amount))
    addTransaction({ amount: transactionAmount, vendor, category })

    setAmount("")
    setVendor("")
    setCategory("")
  }
  return (
    <div className="operations">
      <input name="amount" placeholder="Amount" value={amount} onChange={onAmountChange} />
  
      <input name="vendor" placeholder="Vendor" value={vendor} onChange={onVendorChange} />
       
      <input name="category" placeholder="Category" value={category} onChange={onCategoryChange} />
        
      <button onClick={() => submitTransaction("deposit")}>Deposit</button>
      <button onClick={() => submitTransaction("withdraw")}>Withdraw</button>
    </div>
  )
}

export default Operations;
