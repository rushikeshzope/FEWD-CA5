// Form.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Form.css';
import BookList from './BookList';

function Form() {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [showBookList, setShowBookList] = useState(false);
  const [isElementVisible, setElementVisibility] = useState(true);

  const onSubmit = (values) => {
    console.log(values);
    setIsSuccess(true);
    sessionStorage.setItem("registrationSuccess", "true");
  };

  const handleGoBack = () => {
    setShowBookList(true); 
    setElementVisibility(!isElementVisible);
  };

  return (
    <div className="app">
      {isSuccess ? (
       <div className={isElementVisible ? 'success-message visible' : 'success-message invisible'}>
          <p>Successfully signed up!</p>
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      ) : (
        <form className='form-container' onSubmit={handleSubmit(onSubmit)}>
          <label className='form-label'>First Name:</label>
          <input className='form-input' type="text" {...register("firstName", { required: 'First name is Required!', minLength: { value: 3, message: "Name should be more than 2 characters" }, maxLength: { value: 30, message: "Name should be less than 30 characters" } })} />
          {errors.firstName && <p className='error-text'>{errors.firstName.message}</p>}

          <label className='form-label'>Email:</label>
          <input className='form-input' type="email" {...register("email", { required: 'Email is Required!', pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })} />
          {errors.email && <p className='error-text'>{errors.email.message}</p>}

          <label className='form-label'>Password:</label>
          <input className='form-input' type="password" {...register("password", { required: 'Password is Required!', pattern: { value: /.*[\W]+.*/i, message: "Password must contain at least one special character" }, minLength: { value: 10, message: "Password must have at least 10 characters" } })} />
          {errors.password && <p className='error-text'>{errors.password.message}</p>}

          <label className='form-label'>Confirm Password:</label>
          <input className='form-input' type='password' {...register('confirm', { required: 'Confirm Your Password', validate: (value) => value === watch('password') || "Passwords don't match" })} />
          {errors.confirm && <p className='error-text'>{errors.confirm.message}</p>}

          <input type="submit" value="Sign Up" className='formbutton' disabled={!!Object.keys(errors).length} />
        </form>
      )}
      {showBookList ? <BookList /> : null}
    </div>
  );
}

export default Form;
