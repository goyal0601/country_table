import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

import CountryFilters from "./CountryFilters";
import CountryTable from "./CountryTable";

import { useDebounce } from "../hooks/useDebounce";

import "../styles/Country.css";

const Country = () => {
  const [name, setName] = useState("");
  const [population, setPopulation] = useState(0);
  const [tableData, setData] = useState([]);
  const [dataCalled, setDataCalled] = useState(false); // I think data should get called once they land on the page instead of calling it after a click

  useEffect(() => {
    if (dataCalled) {
      axios
        .get("https://api.sampleapis.com/countries/countries")
        .then(({ data }) => {
          console.log(data);
          setData(data || []);
        })
        .catch((error) => {
          console.error(error.message);
          throw new Error(error.message);
          // Since there's an ErrorBoundary on top of this component, we don't need to handle the error explicitly here.
          // The ErrorBoundary will catch and handle the error.
        });
    }
  }, [dataCalled]);
  // }, [dataCalled, population, name]

  // If i could pass name and population in API, I would have used these values in the useEffect dependencies.

  const onClear = () => {
    setName("");
    setPopulation(0);
  };

  const debouncedCountryName = useDebounce(name, 500);

  const filteredTable = useMemo(() => {
    return tableData.filter(
      (country) =>
        country.name
          .toLowerCase()
          .includes(debouncedCountryName.toLowerCase()) &&
        (population > 0 ? country.population < population : true)
    );
  }, [tableData, debouncedCountryName, population]);

  return (
    <div>
      <b className="countries-info">Countries Info</b>
      <div className="countries-filters">
        <div>
          <CountryFilters
            coutryName={name}
            population={population}
            onNameChange={setName}
            onPopulationChange={setPopulation}
            onClear={onClear}
          />
        </div>

        <button
          disabled={dataCalled}
          className={
            dataCalled ? "show-all-countries-disabled" : "show-all-countries"
          }
          onClick={() => setDataCalled(true)}
        >
          Show all Countries
        </button>
      </div>
      {dataCalled && tableData.length === 0 && (
        <div className="loader-container">
          <div className="loading-line"></div>
        </div>
      )}
      <div>
        <CountryTable data={filteredTable} />
      </div>
    </div>
  );
};

export default Country;
