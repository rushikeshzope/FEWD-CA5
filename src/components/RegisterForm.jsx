import React, { useState } from "react";
import './RegisterForm.css'

function UniqueRegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = () => {
    // Validation logic
    const isNameValid = formData.name.length >= 3 && formData.name.length <= 30;
    const isEmailValid = /\S+@\S+\.\S+/.test(formData.email);
    const isPasswordValid =
      formData.password.length >= 10 &&
      /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
    const isRepeatPasswordValid = formData.password === formData.repeatPassword;

    setIsValid(isNameValid && isEmailValid && isPasswordValid && isRepeatPasswordValid);

    // If all constraints are met, you can perform the registration logic here
    if (isValid) {
      // Perform registration or API call
      console.log("Registration successful!");
    } else {
      console.log("Invalid form data. Please check the fields.");
    }
  };

  return (
    <div className="unique-form-div">
      <h2 className="unique-register-header">Registration Form</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        Repeat Password:
        <input
          type="password"
          name="repeatPassword"
          value={formData.repeatPassword}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <button onClick={handleRegister} disabled={!isValid}>
        Sign up
      </button>
    </div>
  );
}

export default UniqueRegistrationForm;
