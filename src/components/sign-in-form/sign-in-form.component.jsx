import { useState } from "react";

import {
  signInWithUserEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

// components
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = ({ target: { name, value } }) => {
    setFormFields({ ...formFields, [name]: value });
  };

  const loginGoogleUser = async () => {
    try {
      await signInWithGooglePopup();
    } catch (err) {
      alert(err.code);
    }
  };

  const loginEmailUser = async (event) => {
    event.preventDefault();
    try {
      await signInWithUserEmailAndPassword(email, password);
    } catch (err) {
      switch (err.code) {
        case "auth/wrong-password":
          alert("Incorrect Password");
          break;
        case "auth/user-not-found":
          alert("No user with this email");
          break;
        default:
          alert("Unidentified Error Occurred!");
      }
    }
  };
  return (
    <div className="sign-up-container">
      <h2>Sign In</h2>
      <span>Sign into your account</span>
      <form>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="text"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="button" buttonType="inverted" onClick={loginEmailUser}>
            Sign In
          </Button>
          <Button type="button" buttonType="google" onClick={loginGoogleUser}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
