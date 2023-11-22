import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./Firebase";

export const SignIn = () => {
    return (
        <button onClick={async() => {
            await signInWithPopup(auth, new GoogleAuthProvider);
        }}>Sign In With Google</button>
    );
}