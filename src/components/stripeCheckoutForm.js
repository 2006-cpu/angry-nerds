import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import {
    CardElement,
    ElementsConsumer
} from '@stripe/react-stripe-js';

import CardSection from './CreditCardSection';

import {loadStripe} from '@stripe/stripe-js';

const stripe = require('stripe')(process.env.stripe_Publishable);
const stripePromise = loadStripe(process.env.stripe_Publishable);

// const product = getProductById (productId);

stripe.charges.create(
    {
        amount: '$1000',
        currency: 'usd',
        source: 'cardtoken',
        description: `payment for 'guitar'`,
        metadta: {
            productId: 1234
        }
    },
    function (err, charge) {
        if(err) new Error("payment failed");
        else console.log("payment success");
    }
)

const handleSubmit = async (event) => {
    event.preventDefault();
    const {stripe,elements} = this.props;
    if (!stripe || !elements) {
        return;
    }
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
        console.log(result.error.message);
    } else {
        console.log(result.token);
    }
}

class CheckoutForm extends React.Component {

    render() {
        return (
            <div>
                <div class="product-info">
                        <h3 className = "product-title">'guitar'</h3>
                        <h4 className = "product-price">$1000</h4>
                    </div>
                <form onSubmit={handleSubmit}>
                    <CardSection />
                    <button disabled={!this.props.stripe} className="btn-pay">Place Order</button>
                </form>
            </div>
        )
    }


}

export default function InjectedCheckoutForm() {
    return(
        <ElementsConsumer>
            {({stripe,elements}) => (
                <CheckoutForm stripe={stripe} elements={elements} />
            )}
        </ElementsConsumer>
    )
};