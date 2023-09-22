import React, { useState, useContext } from "react";
import Card from "../../../shared/components/UIElements/Card/Card";
import Input from "../../../shared/components/FormElements/Input/Input";
import Button from "../../../shared/components/FormElements/Button/Button";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../../shared/util/validators';
import { useForm } from "../../../shared/hooks/form-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import './Auth.css';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    }
  }, false);

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData({
        ...formState.inputs,
        name: undefined
      }, formState.inputs.email.isValid && formState.inputs.password.isValid);
    } else {
      setFormData({
        ...formState.inputs,
        name: {
          value: '',
          isValid: false
        }
      }, false);
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
  };

  return (
    <Card className="auth">
      <h2>
        {isLoginMode ? 'ShareHub Log In' : 'ShareHub Sign Up'}
      </h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
        <Input 
          id="name" 
          element="input" 
          type="text" 
          label="FullName" 
          validators={[VALIDATOR_REQUIRE()]} 
          errorText="Please enter a your name."
          onInput={inputHandler} 
          />
        )}
        <Input 
          id="email" 
          element="input" 
          type="email" 
          label="Email" 
          validators={[VALIDATOR_EMAIL()]} 
          errorText="Please enter a valid email."
          onInput={inputHandler}
        />
        <Input 
          id="password" 
          element="input" 
          type="password" 
          label="Password" 
          validators={[VALIDATOR_MINLENGTH(5)]} 
          errorText="Please enter a strong password, at least 5 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOG IN' : 'SIGN UP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        {isLoginMode ? 'CREATE ACCOUNT' : 'LOG IN'}
      </Button>
    </Card>
  );
};

export default Auth;
