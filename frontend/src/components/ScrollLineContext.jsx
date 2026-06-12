import React, { createContext, useContext, useState, useCallback } from "react";

const ScrollLinePointsContext = createContext();
const ScrollLineRegisterContext = createContext();

export const useScrollLinePoints = () => useContext(ScrollLinePointsContext);
export const useScrollLineRegister = () => useContext(ScrollLineRegisterContext);

export const useScrollLine = () => {
  const pointsData = useContext(ScrollLinePointsContext);
  const registerPoint = useContext(ScrollLineRegisterContext);
  return { ...pointsData, registerPoint };
};

export const ScrollLineProvider = ({ children }) => {
  const [points, setPoints] = useState({});
  const [triggerUpdate, setTriggerUpdate] = useState(0);

  const updatePoints = useCallback(() => {
    setTriggerUpdate((prev) => prev + 1);
  }, []);

  const registerPoint = useCallback((id, ref) => {
    if (ref && ref.current) {
      setPoints((prev) => {
        if (prev[id] !== ref.current) {
          return { ...prev, [id]: ref.current };
        }
        return prev;
      });
    }
  }, []);

  return (
    <ScrollLineRegisterContext.Provider value={registerPoint}>
      <ScrollLinePointsContext.Provider value={{ points, updatePoints, triggerUpdate }}>
        {children}
      </ScrollLinePointsContext.Provider>
    </ScrollLineRegisterContext.Provider>
  );
};
