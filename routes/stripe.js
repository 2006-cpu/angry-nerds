const express = require('express');
const app = express();

const stripe = require('stripe')('pk_test_51Husm9IEsmL7CmEu27mWMP2XxUgTeWW1rZzlVw4XykcEoHUFGkc66iYkdadeL2j2zebv9n8w5hVqptTivC9DeTng00tZSDJ0VX');

app.post('/orders/cart/checkout', async (req, res) => {
    const {name, id, price, quantity} = req.body,

    const session = await stripe.checkout.sessions.create ({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name:{name},
                        productId: {id} 
                    },
                    unit_amount: {price}
                },
                quantity: {quantity}
            },
        ],
        mode: 'payment',
        success_url: 'https://codalorians.com/thankyou',
        cancel_url: 'https://codalorians.com/cancel'
    });
    res.json ({id: session.id});
})

app.listen(3000, () => console.log(`Listening on port ${3000}!`));