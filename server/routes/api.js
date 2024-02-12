const express = require('express')
const router = express.Router()
const Transaction = require('../models/transactionShema')

router.get('/', async (req,res) => {
    res.send({status: "server is working"})
})

router.get('/transactions', async (req, res) => {
    try {
      const transactions = await Transaction.find()
      res.json(transactions)
    } catch (error) {
      console.error("Error fetching transactions:", error)
      res.status(500).json({ message: "Error fetching transactions." })
    }
  })
  
  
router.post('/transaction', async (req, res) => {
    const { amount, vendor, category } = req.body
    const transaction = new Transaction({ amount, vendor, category })
    try {
        await transaction.save()
        res.status(201).json(transaction)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


router.delete('/transaction/:id', async (req, res) => {
    Transaction.findByIdAndDelete(req.params.id)
        .then(result => {
            if (!result) {
                return res.status(404).send('Transaction not found')
            }
            res.status(200).send(`Transaction deleted: ${req.params.id}`)
        })
        .catch(err => res.status(500).send(err))
})


module.exports = router