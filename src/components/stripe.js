import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('code_testing_codalorians');

const App = () => {
    return (
        <Elements stripe = {stripePromise}>
            <MyCheckoutForm />
        </Elements>
    );
}