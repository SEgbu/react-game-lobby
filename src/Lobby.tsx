import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, firestore } from "./Firebase";
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
import { useAuthState } from "react-firebase-hooks/auth";

export const Lobby: React.FC = () => {
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
        <div>
            {lobby?.map((m) => {
                return (
                    <article key={m.uid}>
                        <p>
                            {m.displayName} - {m.ready ? "Ready" : "Not Ready"}
                        </p>
                    </article>
                );
            })}
            <div>
                <div>
                    {userInLobby && (
                        <button onClick={() => toggleReady(!userInLobby.ready)}>
                            {userInLobby.ready ? "Ready" : "Not Ready"}
                        </button>
                    )}
                </div>
                <div>
                    {userInLobby ? (
                        <button onClick={() => leaveLobby()}>Leave</button>
                    ) : (
                        <button onClick={() => joinLobby()}>Join</button>
                    )}
                </div>
            </div>
        </div>
    );
};
