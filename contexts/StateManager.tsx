import React, { createContext, useContext, useState } from "react";
import { Country } from "../pages/api/countries";
import { CountryData } from "../pages/api/countries/[country]";
import { GlobalData } from "../pages/api/daily";

interface StateManagerProps {
  children: React.ReactNode;
}

interface GraphDataTypes {
  globalGraphData: GlobalData[];
  setGlobalGraphData: React.Dispatch<React.SetStateAction<GlobalData[]>>;
  countryGraphData: CountryData;
  setCountryGraphData: React.Dispatch<React.SetStateAction<CountryData>>;
}

interface StatesTypes extends GraphDataTypes {
  currentOption?: Country;
  setCurrentOption: React.Dispatch<React.SetStateAction<Country>>;
}

const StateStore = createContext({} as StatesTypes);

const StateManager = ({ children }: StateManagerProps) => {
  const [currentOption, setCurrentOption] = useState({} as Country);

  const [globalGraphData, setGlobalGraphData] = useState<GlobalData[]>([]);
  const [countryGraphData, setCountryGraphData] = useState({} as CountryData);

  return (
    <StateStore.Provider
      value={{
        currentOption,
        setCurrentOption,
        countryGraphData,
        globalGraphData,
        setCountryGraphData,
        setGlobalGraphData,
      }}
    >
      {children}
    </StateStore.Provider>
  );
};

export default StateManager;
export const useStateAPI = () => useContext(StateStore);
