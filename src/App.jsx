import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import latam from "./latam.json";
import image from "./assets/msedge_B9gAMHN05M.gif";

const CountrySelector = ({ countries, onSelect, onSelects }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    onSelect(selectedCountry);
  };

  return (
    <select
      className="bg-portage-900 border border-portage-300 text-white px-2 py-1 rounded-md w-full lg:w-fit outline-none"
      id="country"
      onChange={handleCountryChange}
      value={selectedCountry}
    >
      {countries.map((country, index) => (
        <option key={index} value={country.country_code}>
          {country.name} {country.emoji}
        </option>
      ))}
    </select>
  );
};

const CountryTime = ({ timezone, hour, localZone }) => {
  let getCountry = latam.find((item) => item.country_code == timezone);
  const timeFormat = "HH:mm";
  let country = {};

  getCountry.timezones.forEach((item) => {
    const convertedTime = moment
      .tz(hour, timeFormat, localZone)
      .tz(item)
      .format(timeFormat);

    country[item] = {
      country: item.split("/")[1],
      hours: convertedTime,
      emoji: getCountry.emoji,
    };
  });

  country = Object.entries(country).map(([key, value]) => {
    return `${value.hours} ${value.emoji} ${value.country}`;
  });

  if (!getCountry) return <></>;

  return (
    <div className="bg-portage-950/50 border border-portage-300 rounded-md mt-3 p-3">
      <p className="text-barley-corn-200 text-xl font-bold py-2">
        {getCountry.name}
      </p>
      <ul>
        {country.map((item, index) => {
          return (
            <li key={index} className="text-portage-300">
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const App = () => {
  const [hour, setHour] = React.useState(0);
  const [localZone, setLocalZone] = React.useState("America/Lima");
  const [Select, onSelect] = useState("ES");
  const [Selects, onSelects] = useState([]);

  const addTime = () => {
    onSelects((prevSelects) => {
      const newSelects = [...prevSelects, Select];
      return newSelects;
    });
  };

  const getLocalTimezone = () => {
    const localTimezone = moment.tz.guess();
    setLocalZone(localTimezone);
  };

  useEffect(() => {
    setHour(
      `${new Date().getHours().toString().padStart(2, "0")}:${new Date()
        .getMinutes()
        .toString()
        .padStart(2, "0")}`
    );
    getLocalTimezone();
  }, []);

  return (
    <div className="container m-auto p-10">
      <div>
        <h1 className="text-6xl font-montserrat font-extrabold text-portage-200">
          Todos Juntos, Siempre a Tiempo
        </h1>
        <p className="text-barley-corn-400 mt-2">
          Tu sistema esta en hora{" "}
          <span className="font-semibold">{localZone}</span>
        </p>
      </div>
      <div className="mt-5 ">
        <input
          value={hour}
          onChange={(res) => setHour(res.target.value)}
          className="bg-portage-950/50 border text-xl border-portage-300 rounded-md py-1 px-3 text-white w-full"
          type="time"
          name="hours"
          id="hours"
        />
      </div>
      <div className="rounded-md w-full flex flex-col md:flex-row  items-center gap-3 mt-5 bg-portage-950/50 border border-portage-300 p-3">
        <label className="text-white w-64" htmlFor="localzone">
          Mi origen{" "}
        </label>
        <select
          className="bg-portage-900 border border-portage-300 text-white px-2 py-1 rounded-md w-full  outline-none"
          value={localZone}
          onChange={(r) => setLocalZone(r.target.value)}
          name="localzone"
          id="localzone"
        >
          {latam.map((localnames, indexlocal) => {
            return (
              <optgroup
                key={indexlocal}
                label={`${localnames.name} ${localnames.emoji}`}
              >
                {localnames.timezones.map((timezones, indexzones) => {
                  return <option key={indexzones}>{timezones}</option>;
                })}
              </optgroup>
            );
          })}
        </select>
      </div>

      <div className="rounded-md flex flex-col md:flex-row justify-between items-center gap-3 mt-5 bg-portage-950/50 border border-portage-300 p-3">
        <label className="text-white w-fit" htmlFor="country">
          Donde quiero{" "}
        </label>
        <CountrySelector
          countries={latam}
          onSelect={onSelect}
          onSelects={onSelects}
        />
        <button
          onClick={addTime}
          className="w-full lg:w-fit rounded-md px-2 py-2 bg-portage-900 border border-portage-300 text-portage-300"
        >
          agregar
        </button>
      </div>
      <div>
        {Selects.map((item, index) => {
          return (
            <CountryTime
              key={index}
              hour={hour}
              localZone={localZone}
              timezone={item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
