// import React, {useState} from 'react';
// import axios from 'axios';
// import StripeCheckout from 'react-stripe-checkout';

// import {
//     CardElement,
//     Elements,
//     useElements,
//     useStripe,
//     // StripeCheckout
// } from '@stripe/react-stripe-js';

// import {loadStripe} from '@stripe/stripe-js';

// const requiredStripe = require('stripe')(process.env.stripe_Publishable);
// const stripePromise = loadStripe(process.env.stripe_Publishable);



// const stripeTokenHandler = (token) => {
//     fetch('/stripe-token', {
//         method: 'POST',
//         body: JSON.stringify(token),
//     }).then(response => {
//         response.json().then(data => {
//             alert ('checkout complete');
//         })
//     })

// }

// const stripe = useStripe(stripePromise);
// const elements = useElements();

// // const stripeTokenHandler()

// const checkout = () => {
//     console.log('checkout: ', checkout)
//     const [error, setError] = useState(null);

//     const handleChange = (event) => {
//         if (event.error) {
//             setError(error.message);
//         } else {
//             setError(null);
//         }
//     }

// ///handle form submission
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const card = elements.getElement(CardElement);
//         const result = await stripe.createToken(card);
//         if (result.error) {
//             setError(error.message);
//         }else {
//             setError(null);
//             stripeTokenHandler(result.token);
//         }
   

//     return (
//         <form onSubmit={handleSubmit}>
//             <div className = "form">
//                 <label for="card-element">
//                     Credit or debit card
//                 </label>
//                 <CardElement
//                     id="card-element"
//                     options={CardElement}
//                     onChange={handleChange}
//                     />
//                     <div className = "card-errors" role="alert">{error}</div>
//             </div>
//             <button type="submit">Submit Payment</button>
//         </form>
//     )
// }
// }

// export default checkout;