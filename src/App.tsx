import React from "react";

import { Navbar } from "./Navbar";
import { Lobby } from "./Lobby";

import { LobbyButtons } from "./LobbyButtons";
import { LobbyProvider } from "./LobbyProvider";
import { UserSuspense } from "./UserSupense";

export const App: React.FC = () => {
    return (
        <React.Suspense fallback={<p>Loading</p>}>
            <div>
                <Navbar />
                <LobbyProvider>
                        <UserSuspense fallback={<p>Not Logged In...</p>}>
                            <Lobby />
                            <LobbyButtons />
                        </UserSuspense>
                </LobbyProvider>
            </div>
        </React.Suspense>
    );
};

export default App;
