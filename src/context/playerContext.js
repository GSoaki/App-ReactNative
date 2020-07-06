import React, { createContext, useState, useContext } from "react";

const PlayerContext = createContext();

export default function PlayerProvider({ children }) {
  const [player, setPlayer] = useState([]);

  return (
    <PlayerContext.Provider
      value={{
        player,setPlayer
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  const { player,setPlayer } = context;
  return { player,setPlayer };
}