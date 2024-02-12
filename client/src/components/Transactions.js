import React from 'react';
import Transaction from './Transaction';

const Transactions = ({ data, deleteTransaction }) => (
  <div className="transactions">
    {data.map((transaction, key) => (
      <Transaction transData={transaction} deleteTransaction={deleteTransaction} key={key} />
    ))}
  </div>
)

export default Transactions;
