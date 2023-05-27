import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utls";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <button onClick={logGoogleUser}>Sign in with Google</button>
      <h1>Sign In Page</h1>
    </div>
  );
};

export default SignIn;
