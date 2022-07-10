const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);
const { v4: uuidv4 } = require('uuid');

router.post("/payment", async (req, res) => {

    // const { tokenId, amount } = req.body
    // // console.log(product);
    // // console.log(product.price);

    // const idempotencyKey = uuidv4()

    // return stripe.customers.create({
    //     source: tokenId,
    // }).then(customer => {
    //     stripe.charges.create({
    //         amount: amount * 100,
    //         currency: "inr",
    //         customer: customer.id
    //     }, { idempotencyKey })
    // }).then(result => {
    //     res.status(200).json(result)
    // }).catch(err => res.status(500).json({ msg: err.message }))








    await stripe.paymentIntents.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "inr",
        },
        { confirm: true },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.status(500).json(stripeErr);
            } else {
                res.status(200).json(stripeRes);
            }
        }
    );



});

module.exports = router;