const express = require('express');
const app = express();
require('dotenv').config('./.env');
const stripe = require('stripe')(process.env.stripe_Publishable);
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
                        images: 'imageURL',
                    },
                    unit_amount: '$XXXX',
                },
                quantity: '1',
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/thankyou.html',
        cancel_url: 'https://codalorians.com/cancel',
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
            cvc: '870',
        }
    });

})




//     const handleClick = async (event) => {
//         try{
//             event.preventDefault();
//             const stripe = await stripePromise;
//             const response = await axios.post ('/orders/cart/checkout');
//             const session = await response.json();
//             const result = await stripe.redirectToCheckout({
//                 sessionId: session.id,
//             })
//         } catch (error) {
//             console.error(error)
//         }
//         return (
//             <div>
//             <button onClick={handleClick} type="checkout-button">Add to cart</button>

//             </div>
//         )
//         }

// const Card_Element = {
    
    
//     style: {
//         base: {
//             color: '#32325d',
//             fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//             fontSmoothing: 'antialiased',
//             fontSize: '16px',
//             '::placeholder': {
//               color: '#aab7c4'
//         }
//     },
//     invalid: {
//         color: '#fa755a',
//         iconColor: '#fa755a'
//         }
//     }
// };
// console.log('card_elements', Card_Element)
// }

app.listen(5000, () => console.log(`Listening on port ${5000}!`));
module.exports = appRouter;

// app.listen(3000, () => console.log(`Listening on port ${3000}!`));