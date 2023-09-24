import React, { useState, useContext } from "react";
import Card from "../../../shared/components/UIElements/Card/Card";
import Input from "../../../shared/components/FormElements/Input/Input";
import Button from "../../../shared/components/FormElements/Button/Button";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../../shared/util/validators';
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hooks";
import { AuthContext } from "../../../shared/context/auth-context";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpin/LoadingSpinner";
import './Auth.css';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

  const authSubmitHandler = async event => {
    event.preventDefault();
    
    if (isLoginMode) {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/users/login', 'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        ); 
        auth.login(responseData.user.id);
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/users/signup', 'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        
        auth.login(responseData.user.id);
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="auth">
        {isLoading && <LoadingSpinner asOverlay />}
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
    </React.Fragment>
  );
};

export default Auth;
