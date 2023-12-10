import React from "react";

import { Navbar } from "./Navbar";
import { Lobby } from "./Lobby";
import { auth } from "./Firebase";

import { useAuthState } from "react-firebase-hooks/auth";

export const App: React.FC = () => { 
    // checks for user and gets attributes
    const [user] = useAuthState(auth); 

    return (
        <React.Suspense fallback={
            <p>Loading</p>
        }>
            <div>
                <Navbar/>
                {user ? <Lobby/> : <p>Not Logged In...</p>}                  
            </div>
        </React.Suspense>
    );
};

export default App;
