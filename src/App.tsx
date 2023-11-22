import React from "react";
import { Navbar } from "./Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";

export const App: React.FC = () => { 
    const [user] = useAuthState(auth);

    return (
        <div>
            <Navbar/>
            {user ? <p>Main</p> : null}
        </div>
    );
};

export default App;
