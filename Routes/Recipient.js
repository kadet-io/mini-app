const express = require('express')
const router = express.Router()
const recipient_controller = require ('../Controllers/recipientController');
const Recipient = require('../models/recipients.model')

// Get all recipients
router.get('/', recipient_controller.recipient_list )

// Get one recipient
router.get('/:id', recipient_controller.get_recipient, (req, res) => {
    res.json(res.recipient)
})

// Create one recipient
router.post('/', recipient_controller.create_recipient )

// Update one recipient
router.patch('/:id', recipient_controller.get_recipient, async (req, res) => {
    if (req.body.full_name != null) {
        res.recipient.full_name = req.body.full_name
      }
    
      if (req.body.email != null) {
        res.recipient.email = req.body.email
      }
      try {
        const updatedRecipient = await res.recipient.save()
        res.json(updatedRecipient)
      } catch {
        res.status(400).json({ message: err.message })
      }
    
})

// Delete one recipient
router.delete('/:id',recipient_controller.get_recipient, async (req, res) => {
    try{
        await res.recipient.remove()
        res.json({message: "Deleted this Subscriber"})
    } catch (err) {
        res.status(500).json({
            message:({message: err.message})
        })
    }
})



module.exports = router
