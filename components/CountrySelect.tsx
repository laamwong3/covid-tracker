import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import useSWR from "swr";
import { Country, CountryDetail } from "../pages/api/countries";
import { Global } from "@emotion/react";
import { useStateAPI } from "../contexts/StateManager";

export default function CountrySelect() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isValidating } = useSWR<CountryDetail>(
    "/api/countries",
    fetcher
  );

  const [isFetching, setIsFetching] = useState(true);
  const [countries, setCountries] = useState<Country[]>([]);
  // const [currentOption, setCurrentOption] = useState({} as Country);
  const { currentOption, setCurrentOption } = useStateAPI();

  useEffect(() => {
    if (data?.countries) {
      setCountries([
        { name: "Global", iso2: "Global", iso3: "Global" },
        ...data.countries,
      ]);
    }
  }, [data]);

  useEffect(() => {
    if (countries[0]) {
      setCurrentOption(countries[0]);
      setIsFetching(false);
    }
  }, [countries]);

  // console.log(currentOption);

  return (
    <>
      {countries && currentOption && !isFetching && (
        <Autocomplete
          sx={{ width: "70%" }}
          options={countries}
          value={currentOption}
          onChange={(event, newValue) => {
            if (newValue) {
              setCurrentOption(newValue);
            }
          }}
          autoHighlight
          getOptionLabel={(option) => option.name ?? ""}
          renderInput={(params) => (
            <TextField {...params} label="Choose a country" />
          )}
        />
      )}
    </>
  );
}
