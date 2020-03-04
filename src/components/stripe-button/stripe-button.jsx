import React from 'react';
import StripeCheckout from "react-stripe-checkout";
import CustomButton from "../custom-button/custom-button";
import { withRouter } from "react-router-dom";
const StripeCheckoutButton = ({ price, history }) => {
    // stripe wants the price in cents
    const priceForStripe = price*100;
    const publishableKey = 'pk_test_4dW3m442pRZzttOxqHsaznQb00BcTF1jip';
 
    //token track the success of the transsaction 
    const onToken = token => {
        //console.log(token);
        alert('Payment Successful');
        if (token) {
            history.push('/');
        }
    }
   

    return (
        <StripeCheckout
        label='Pay Now'
        name='CROWN Clothing Ltd.'
        billingAddress
        shippingAddress
        image='https://sendeyo.com/up/d/f3eb2117da'
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
        >
           <CustomButton>Pay Now</CustomButton>
        </StripeCheckout>
    );
};

export default withRouter(StripeCheckoutButton);