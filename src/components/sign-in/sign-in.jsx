import React, { useState } from "react";
import { connect } from "react-redux";

import { googleSignInStart, emailSignInStart } from "../../redux/user/user.action";

import "./sign-in.scss";

import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";

const SignIn = ({emailSignInStart, googleSignInStart}) => {
    const [userCredentials, setCredentials] = useState({ 
        email:'',
        password:''
     });
     
    const {email, password} = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInStart(email, password);
    };

    const handleChange = event => {
        const {value, name} = event.target;
        setCredentials({...userCredentials, [name] : value });
    }
    

        return (
            <div className="sign-in">
                <h2 className="title">I already have an account</h2>
                <span>Sign in with you email and password</span>
                <form onSubmit={handleSubmit}>
                    <FormInput 
                      type="email" 
                      name="email"
                      label="email"
                      value={email}
                      handleChange={handleChange}
                      required
                    />
                    <FormInput 
                      type="password"
                      name="password"
                      label="password"
                      value={password}
                      handleChange={handleChange} 
                      required 
                    />
                    <div className="buttons">
                        <CustomButton type="submit">Sign in</CustomButton>
                        <CustomButton
                          type='button'
                          onClick={ googleSignInStart } 
                          isGoogleSignIn
                        >
                            Sign in with Google
                        </CustomButton>
                    </div>
                    
                </form>
            </div>
        );
    
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => 
    dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn);

