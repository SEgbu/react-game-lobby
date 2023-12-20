import {
    collection,
    deleteDoc,
    doc,
    limit,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";

import { DocumentData } from "firebase/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, firestore } from "./Firebase";
import React, { PropsWithChildren, useContext} from "react";

import { User } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";

type Lobby = DocumentData[] | undefined;

type LobbyContextProps = {
    lobby: Lobby; 
    userInLobby: DocumentData | undefined; 
    user: User | null | undefined;
    joinLobby: () => void; 
    leaveLobby: () => void;
    toggleReady: (ready: boolean) => void;
};

export const lobbyContext = React.createContext<LobbyContextProps | null>(null);

export const useLobbyContext = () => {
    const lc = useContext(lobbyContext)

    if (!lc){
        throw new Error("Lobby context is still undefined, ");
    }

    return lc
}

export const LobbyProvider : React.FC<PropsWithChildren> = ({children}) => {
   const lobbyRef = collection(firestore, "lobby");

    const q = query(lobbyRef, orderBy("signedInAt", "asc"), limit(6));

    const [lobby] = useCollectionData(q);

    const [user] = useAuthState(auth);

    const userInLobby = lobby?.find((m) => m.email === user?.email);

    const joinLobby = async () => {
        if (user != null)
            await setDoc(doc(firestore, "lobby/" + user.uid), {
                uid: user.uid,
                ready: false,
                displayName: user?.displayName,
                email: user?.email,
                signedInAt: serverTimestamp()
            });
    };

    const leaveLobby = async () => {
        if (user != null) await deleteDoc(doc(firestore, "lobby/" + user.uid));
    };

    const toggleReady = async (newReady: boolean) => {
        if (user != null)
            await setDoc(
                doc(firestore, "lobby/" + user.uid),
                { ready: newReady },
                { merge: true }
            );
    };

    return (
        <lobbyContext.Provider value={{lobby, userInLobby, user, joinLobby, leaveLobby, toggleReady}}>
            {children}
        </lobbyContext.Provider>
    )
}