const express = require('express')
const router = express.Router();
const specialoffer_controller = require('../Controllers/specialOfferController');


router.get('/', specialoffer_controller.offer_list)

router.post('/', specialoffer_controller.create_offer)

router.get('/:id', specialoffer_controller.get_specialOffer, (req, res) => {
    res.offer = offer
    res.json(res.offer)
})  




module.exports = router
