import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const stripeKey = require('stripe')('pk_test_51Husm9IEsmL7CmEu27mWMP2XxUgTeWW1rZzlVw4XykcEoHUFGkc66iYkdadeL2j2zebv9n8w5hVqptTivC9DeTng00tZSDJ0VX');


const stripeCheckout = async () => {
    
    const onToken = (token) => {
    fetch('/save-stripe-token', {
        method: 'POST',
        body: JSON.stringify(token),
      }).then(response => {
        response.json().then(data => {
          alert(`We are in business, ${data.email}`);
        });
      });
    }

    // render()

    {
        return (
            <StripeCheckout
                stripeKey='pk_test_51Husm9IEsmL7CmEu27mWMP2XxUgTeWW1rZzlVw4XykcEoHUFGkc66iYkdadeL2j2zebv9n8w5hVqptTivC9DeTng00tZSDJ0VX'
                token={this.onToken}
                panelLabel='Place Order'
                amount={10000}
                currency='USD'
                billingAddress = {false}
                shippingAddress = {false}
                zipeCode = {false}
                locale='auto'
                email='info@codalorians.com'
                allowRememberMe = {true}
                opened={this.onOpened}
                colosed={this.onClosed}
                triggerEvent = 'onTouchTap'
            >
            </StripeCheckout>
        )
    }
}

export default stripeCheckout;

