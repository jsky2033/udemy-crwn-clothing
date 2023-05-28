// components
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

//styles
import "./authentication.styles.scss";

const Authentication = () => {
  return (
    <div>
      <div className="authentication-container">
        <SignInForm />
        <SignUpForm />
      </div>
    </div>
  );
};

export default Authentication;
