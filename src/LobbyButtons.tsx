import { useLobbyContext } from "./LobbyProvider"

export const LobbyButtons : React.FC = () => {   
    const {userInLobby, toggleReady, leaveLobby, joinLobby} = useLobbyContext();

    return (
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
    )
}