const SpecialOffer = require('../models/SpecialOffer.model');

exports.offer_list = async (req, res) => {
    try {
        const offers = await SpecialOffer.find();
        res.json(offers)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

}


exports.create_offer = async (req, res) => {
    const offer = new SpecialOffer({
        offer_name: req.body.offer_name,
        fixed_percentage: req.body.fixed_percentage
    })
    try {
        const newOffer = await offer.save()
        res.status(201).json(newOffer)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.get_specialOffer = async (req, res, next) => {
    try {
        offer = await SpecialOffer.findById(req.params.id)
        if (offer == null) {
            return res.status(404).json({ message: 'Cant find Offer' })
        }else{
            return res.status(200).json(offer)

        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}



