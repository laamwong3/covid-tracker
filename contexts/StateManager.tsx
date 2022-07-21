import React, { createContext, useContext, useState } from "react";
import { Country } from "../pages/api/countries";

interface StateManagerProps {
  children: React.ReactNode;
}

interface StatesTypes {
  currentOption?: Country;
  setCurrentOption: React.Dispatch<React.SetStateAction<Country>>;
}

const StateStore = createContext({} as StatesTypes);

const StateManager = ({ children }: StateManagerProps) => {
  const [currentOption, setCurrentOption] = useState({} as Country);

  return (
    <StateStore.Provider
      value={{
        currentOption,
        setCurrentOption,
      }}
    >
      {children}
    </StateStore.Provider>
  );
};

export default StateManager;
export const useStateAPI = () => useContext(StateStore);
