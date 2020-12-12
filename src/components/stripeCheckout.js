import React from 'react';

import StripeCheckout from 'react-stripe-checkout'; 

class Checkout extends React.Component{

    render()
    {
        return (
            <StripeCheckout
                stripeKey='pk_test_51Husm9IEsmL7CmEu27mWMP2XxUgTeWW1rZzlVw4XykcEoHUFGkc66iYkdadeL2j2zebv9n8w5hVqptTivC9DeTng00tZSDJ0VX'
                email='info@codalorians.co'
                panelLabel="Place Order"
                amount="10000"
                currency='USD'
                billingAddress={false}
                shippingAddress
                zipCode={false}
                locale='auto'
                allowRememberMe={false}
                opened={this.onOpened}
                closed={this.onClosed}
                triggerEvent = 'onTouchTap'
                label="Pay with 💳"
                token={this.onToken}
            >
                </StripeCheckout>
            
        )
        
    }
}

export default Checkout;

