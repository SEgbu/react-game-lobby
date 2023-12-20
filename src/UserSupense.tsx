import { ReactNode } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";

type UserSuspenseProps = {
    children : ReactNode; 
    fallback : ReactNode; 
};

export const UserSuspense : React.FC<UserSuspenseProps> = (props) => {
    // checks for user and gets attributes
    const [user] = useAuthState(auth);

    return (
        <div>
            {user ? props.children : props.fallback}
        </div>
    );
}