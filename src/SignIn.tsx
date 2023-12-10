import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./Firebase";

export const SignIn = () => {
    return (
        <button onClick={async() => {
            await signInWithPopup(auth, new GoogleAuthProvider); // use google popup to sign in
        }}>Sign In With Google</button>
    );
}