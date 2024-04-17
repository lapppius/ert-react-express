import { useEffect, useState } from "react";

export default function AdminRadioLocation() {
  const [countriesList, setCountriesList] = useState(null);

  //   const fetchCountries = async () => {
  //     const response = await fetch(
  //       "https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json"
  //     );
  //     const countries = await response.json();
  //     return countries;
  //   };

  useEffect(() => {
    // fetchCountries().then((countries) => {
    //   setCountriesList(countries);
    // });
    // console.log(typeof countriesList, countriesList);
  }, []);
  return (
    <>
      {
        <select name="cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
          {countriesList != null
            ? countriesList.map((country) => {
                <option value={country.Name}>{country.Name}</option>;
              })
            : undefined}
        </select>
      }
    </>
  );
}
