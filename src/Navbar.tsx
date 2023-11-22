import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { SignOut } from "./SignOut";
import { SignIn } from "./SignIn";

export const Navbar = () => {
    const [user] = useAuthState(auth);

    return (
        <nav style={{display: "flex", justifyContent: "space-between"}}>
            <div>Fire Lobby </div>
            {user ? <SignOut/> : <SignIn/>}
        </nav>
    );
}