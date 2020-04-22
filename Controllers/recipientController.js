const Recipient = require('../models/recipients.model');


exports.recipient_list = async (req, res) => {
  try {
    const recipients = await Recipient.find()
    res.json(recipients)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}


exports.create_recipient = async (req, res) => {
  const recipient = new Recipient({
    full_name: req.body.full_name,
    email: req.body.email
  })
  try {
    const newRecipient = await recipient.save()
    res.status(201).json(newRecipient)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.get_recipient = async (req, res, next) => {
  try {
    recipient = await Recipient.findById(req.params.id)
    if (recipient == null) {
      return res.status(404).json({ message: 'Cant find recipient' })
    }
    else{
      return res.status(200).json(recipient)
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

}