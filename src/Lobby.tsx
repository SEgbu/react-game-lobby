import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore"
import { firestore } from "./Firebase";
import { collection, limit, orderBy, query } from "firebase/firestore";


export const Lobby : React.FC = () => {
    const lobbyRef = collection(firestore, "lobby");

    const q = query(lobbyRef, orderBy("signedInAt", "asc"), limit(6));

    const [lobby] = useCollectionData(q);
    
    return (
        <div>
            <p>max 6 players: </p>
            {
                lobby?.map(m => {
                    return (
                        <article key={m.uid}>
                            <p>
                                {m.displayName} - {m.ready ? "Ready" : "Not Ready"}
                            </p>
                        </article>
                    );
                })
            }
        </div>
    );
};
