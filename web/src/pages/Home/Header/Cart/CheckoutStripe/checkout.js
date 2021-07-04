import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from './index';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51J4vDPC7VwF1036srn6kXrqU2qMkvq6WEXJap1XPDZRhy4xYUsjFMzbGSQrJPpzzI2uijjyNUb6bn3Ue1ruZNVcY00g1RXVTeP");

export default function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};