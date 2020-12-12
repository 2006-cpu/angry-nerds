const express = require('express');
const app = express();
require('dotenv').config('./.env');
const stripe = require('stripe')('pk_test_51Husm9IEsmL7CmEu27mWMP2XxUgTeWW1rZzlVw4XykcEoHUFGkc66iYkdadeL2j2zebv9n8w5hVqptTivC9DeTng00tZSDJ0VX');
appRouter.use(express.static('.'));



app.post('/create-checkout-session', async (req, res) => {
    const {name,productId, price, quantity, imageURL} = req.body,

    const session = await stripe.checkout.session.create ({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'guitar',
                        Id: 'xxxx',
                        // images: 'imageURL',
                    },
                    unit_amount: '$XXXX',
                },
                quantity: '1',
            },
        ],
        mode: 'payment',
        success_url: 'https://fathomless-retreat-94739.herokuapp.com/thank_you.html',
        cancel_url: 'https://fathomless-retreat-94739.herokuapp.com/cancel.html',
    });
    res.json({id: session.id});
})

///==> set token Id at checkout
app.post('/charge', async (req,res) => {

    const token = await stripe.tokens.create ({
        card: {
            number: '6767676767676767',
            exp_month: 10,
            exp_year: 2030,
            cvc: '000',
        }
    });

})


app.listen(5000, () => console.log(`Listening on port ${5000}!`));
module.exports = appRouter;
