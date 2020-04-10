const express = require('express')
const router = express.Router();
const voucherdata_controller = require ('../Controllers/voucherController');


router.get('/voucherdata', voucherdata_controller.get_voucher)

router.post('/createvoucherdata', voucherdata_controller.create_voucherdata)

router.get('/percentagediscount', voucherdata_controller.percentageDiscount)

router.get('/allvalidvoucherandname', voucherdata_controller.allValidVoucherAndName)

module.exports = router
