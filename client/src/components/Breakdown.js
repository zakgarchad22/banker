import React, { useState } from 'react';
import '../styles/breakDown.css';

function Breakdown({ transactions }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [nameCategory, setNameCategory] = useState('')

  const toggleModal = (category) => {
    setIsModalOpen(!isModalOpen)
    setNameCategory(category)
  }


  const transactionsForCategory = () => {
    return transactions.filter(({ category }) => category.toLowerCase() === nameCategory)
  }
  const getCategoryTotals = () => {
    const totals = {}
    transactions.forEach(({ category, amount }) => {
      const cat = category.toLowerCase()
      if (!totals[cat]) {
        totals[cat] = amount
      } else {
        totals[cat] += amount
      }
    })
  
    return totals
  }
  

  
  const totalForActiveCategory = () => {
    let total = 0
    transactionsForCategory().forEach(transaction => {
      total += transaction.amount
    })
    return total
  }
  

  return (
    <div id="breakdown-container">
      <div id="breakdown-label">Breakdown Costs</div>
      <div id="breakdown-content">
        {Object.entries(getCategoryTotals()).map(([category, total]) => (
          <div className="break-down" key={category} onClick={() => toggleModal(category)}>
            {`${category}`}
            <br />
            {`${total}`}
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div id="modal" onClick={() => toggleModal()}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>{nameCategory}</h2>
            </div>
            <div className="modal-body">
              {transactionsForCategory().map((transaction, index) => (
                <div key={index}>{`${transaction.vendor}: ${transaction.amount}`}</div>
              ))}
            </div>
            <div>
                <strong>Total:</strong> ${totalForActiveCategory()}
              </div>
            <div>
              <button onClick={() => toggleModal()} style={{ cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Breakdown;
