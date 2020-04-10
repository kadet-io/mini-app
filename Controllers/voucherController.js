const VoucherData = require('../models/vouchercode.model');
const randomstring = require("randomstring");
const Recipient = require('../models/recipients.model');
const SpecialOffer = require('../models/SpecialOffer.model');
const VoucherCode = require('../models/vouchercode.model');

exports.get_voucher = async (req, res) => {
    try {
        const voucherData = await VoucherData.find();
        res.json(voucherData)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}


exports.create_voucherdata = async (req, res) => {
    //validation 
    const special_offer = req.body.special_offer;
    const expiration_date = req.body.expiration_date;
    if (!special_offer || !expiration_date) {
        res.json({
            success: false,
            message: 'Invalid Parameter'
        })
    }

    const offer = await SpecialOffer.findById(special_offer);
    if (!offer) {

        res.json({
            success: false,
            message: 'Offer does not exist'
        })
    } else {
        try {
            const allrecipients = await Recipient.find();
            console.log(allrecipients)
            allrecipients.forEach(async recipient => {
                console.log(recipient._id)
                let RanString = randomstring.generate({
                    length: 8,
                    charset: 'alphanumeric',
                });

                const voucherdata = new VoucherData({
                    voucher_code: RanString,
                    recipient: recipient._id,
                    special_offer: req.body.special_offer,
                    expiration_date: req.body.expiration_date
                })
                await voucherdata.save()
            });
            res.json({
                success: true,
                message: 'Voucher Created'
            })

        } catch (err) {
            res.json({
                success: false,
                message: 'Error creating Voucher'
            })

        }


    }

}


exports.percentageDiscount = async (req, res) => {
    if (!req.body.email && !req.body.voucher_code) {
        res.json({
            success: false,
            message: 'Invalid Parameter'
        })
    } else {
        const findbyemail = await Recipient.findOne({ email: req.body.email }).exec();
        if (!findbyemail) {
            res.json({
                success: false,
                message: 'Email does not exist'
            })
        } else {
            recipientid = findbyemail._id
            console.log(recipientid, req.body.voucher_code);
            const findDiscount = await VoucherCode.findOne({ voucher_code: req.body.voucher_code, recipient: recipientid }).exec()
            if (!findDiscount) {
                res.json({
                    success: false,
                    message: "Invalid Parameters"
                })
            } else {
                if (findDiscount.used === true) {
                    res.json({
                        success: false,
                        message: "Voucher has been used"
                    })
                }
                else {
                    const dateofusage = await VoucherCode.findByIdAndUpdate({ _id: findDiscount._id }, { $set: { used: "true", dateof_usage: Date.now() } }).exec()

                    console.log(dateofusage)
                    const percentagediscount = await SpecialOffer.findById(findDiscount.special_offer);

                    res.json({
                        success: true,
                        message: percentagediscount.fixed_percentage + "%"
                    })

                }
            }
        }

    }
}


exports.allValidVoucherAndName = async (req, res) => {
    if (!req.body.email) {
        res.json({
            success: false,
            message: 'Invalid Parameter'
        })
    } else {
        const findemail = await Recipient.findOne({ email: req.body.email }).exec();
        if (!findemail) {
            res.json({
                success: false,
                message: 'Email does not exist'
            })
        } else {
            findids = findemail._id
            const findvalidity = await VoucherCode.find({ recipient: findids, used: false }).exec();
            findvalidity.forEach(async validemail => {
                const offername = await SpecialOffer.findById(validemail.special_offer);

                console.log(validemail.voucher_code)
                console.log(offername)
                res.json({
                    validvoucher: validemail.voucher_code,
                    offernames: offername.offer_name
                })

            })
            
        }


    }
}





