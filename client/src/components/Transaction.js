import React from 'react';
import '../styles/transaction.css';

const Transaction = ({ transData, deleteTransaction }) => {
  const deleteThis = () => deleteTransaction(transData._id)


  return (
    <div className="transaction-item">
          <span>amount: {transData.amount}</span>
          <span>vendor: {transData.vendor} </span> 
          <span>category: {transData.category} </span>
          <button className="delete-btn" onClick={deleteThis}>Delete</button>
    </div>
  )
}

export default Transaction
