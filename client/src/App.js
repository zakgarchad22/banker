import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Operations from './components/Operations';
import Transactions from './components/Transactions';
import BreakDown from './components/Breakdown';

function App() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    getTransactions()
  }, [])

  const getTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/transactions')
      console.log(response.data)
      setTransactions(response.data)
    } catch (error) {
      console.error("Failed to fetch transactions:", error)
    }
  }
  

  const addTransaction = async (transaction) => {
    try {
      await axios.post('http://localhost:8080/transaction', { amount: transaction.amount, vendor: transaction.vendor, category: transaction.category })
      getTransactions()
    } catch (error) {
      console.error("Failed to add transaction:", error)
    }
  }

  const removeTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/transaction/${id}`)
      getTransactions()
    } catch (error) {
      console.error("Failed to remove transaction:", error)
    }
  }

  let balance = 0

  transactions.forEach(transaction => {
    balance += transaction.amount
  })
  


  return (
    <Router>
      <div className="App">
      <nav className="nav-wrapper">
        <div className="links-and-balance">
          <Link className="nav-link" to="/operations">Operations</Link>
          <Link className="nav-link" to="/transactions">Transactions</Link>
          <Link className="nav-link" to="/breakdown">Breakdown</Link>
          <h1 className="balance">Balance: <span style={{ color: balance >= 0 ? "rgb(47, 232, 47)" : "rgb(232, 59, 47)" }}>{balance}</span></h1>
        </div>
      </nav>

        <Routes>
          
          <Route path="/transactions" element={<Transactions data={transactions} deleteTransaction={removeTransaction} />} />
          <Route path="/operations" element={<Operations addTransaction={addTransaction} />} />
          <Route path="/breakdown" element={<BreakDown transactions={transactions} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
