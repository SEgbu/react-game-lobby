import React from "react";
import { useLobbyContext } from "./LobbyProvider";

export const Lobby: React.FC = () => {
    const {lobby} = useLobbyContext();

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
        </div>
    );
};
