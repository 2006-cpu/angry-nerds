const stripe = require('stripe')(process.env.stripe_Publishable);
const express = require('express');
const app = express();
stripeRouter.use(express.static('.'));



stripeRouter.post('/cart/checkout', async (req, res) => {
    const {name, id, price, quantity} = req.body,

    const session = await stripe.checkout.sessions.create ({
        payment_method_types: ['card','wallet'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'product name',
                        images: ['https://icon-library.com/images/no-image-available-icon/no-image-available-icon-8.jpg'],
                    },
                    unit_amount: 2000,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'https://codalorians.com/thankyou',
        cancel_url: 'https://codalorians.com/cancel',
    });
    res.json ({id: session.id});
})

///==> set token Id at checkout
    stripeRouter.post('/charge', async (req,res) => {

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

module.exports = stripeRouter;

// app.listen(3000, () => console.log(`Listening on port ${3000}!`));