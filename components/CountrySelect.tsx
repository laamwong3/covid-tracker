import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import useSWR from "swr";
import { Country, CountryDetail } from "../pages/api/countries";
import { Global } from "@emotion/react";

export default function CountrySelect() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR<CountryDetail>("/api/countries", fetcher);

  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    if (data?.countries) {
      setCountries([
        ...data.countries,
        { name: "Global", iso2: "Global", iso3: "Global" },
      ]);
    }
  }, [data]);

  // console.log(first);

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: "60%" }}
      options={data?.countries ?? []}
      autoHighlight
      getOptionLabel={(option) => option.name ?? ""}
      renderInput={(params) => (
        <TextField {...params} label="Choose a country" />
      )}
    />
  );
}
