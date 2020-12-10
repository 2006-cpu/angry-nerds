import React from 'react';

const thankYou = (props) => {
    console.log('thankyou', thankYou)
    const {order} = props;

    return (
        <html>
            <head>
                <title>
                    Thank you for your order!
                </title>
            </head>
            <body>
                <section>
                    <p>
                        Your order number is {order && order.id}
                        If you have any questions, please email
                        <a href="mailto:orders@codalorians.com">orders@codalorians.com</a>.
                    </p>
                </section>
            </body>
        </html>
        )
}

export default thankYou;