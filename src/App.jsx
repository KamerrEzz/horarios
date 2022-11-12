import TimeZone from "./utils/timezone.json";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // TimeZone is an array of objects
  // {
  // 	"label":"Asia/Dili (GMT+09:00)",
  // 	"tzCode":"Asia/Dili",
  // 	"name":"(GMT+09:00) Dili, Maliana, Suai, Likisá, Aileu",
  // 	"utc":"+09:00"
  // }

  // default
  const zonesDefault = [
    "Europe/Madrid",
    "America/Mexico_City",
    "America/Bogota",
    "America/Costa_Rica",
    "America/Santiago",
    "America/Lima",
  ];

  // get filter zones default
  const zones = TimeZone.filter((zone) => zonesDefault.includes(zone.tzCode));

  // time now
  const [time, setTime] = useState();

  // time now format 12 hours
  const [time12, setTime12] = useState();

  // time zone
  const [tz, setTz] = useState(TimeZone[0]);

  // time zone list filter
  const [tzListFilter, setTzListFilter] = useState([]);

  // filter time zone list
  const handleFilterTz = (e) => {
    const filter = toLowerCase(e.target.value);
    if (filter === "") {
      setTzListFilter([]);
    } else {
      const tzList = TimeZone.filter((tz) =>
        tz.label.toLowerCase().includes(toLowerCase(filter))
      );
      setTzListFilter(tzList);
    }
  };

  // toLowerCase
  const toLowerCase = (str) => {
    return str.toLowerCase();
  };

  // componentes default time zone
  const ComponentSelectZoneDefaulsButton = () => {
    return (
      <div className="flex-col-center">
        {zones.map((zone) => (
          <button
            key={zone.tzCode}
            onClick={() => setTz(zone)}
            className="select-zone-defaults__button"
          >
            {zone.label}
          </button>
        ))}
      </div>
    );
  };

  // get time
  const getTime = () => {

    // obtener la hora actual de la zona horaria seleccionada o por defecto, solo la hora
    const time = new Date().toLocaleTimeString("en-US", {
      timeZone: tz.tzCode,
      hour12: false,
    });
    
    // obtener la hora actual de la zona horaria seleccionada o por defecto, solo la hora en formato 12 horas
    const time12 = new Date().toLocaleTimeString("en-US", {
      timeZone: tz.tzCode,
      hour12: true,
    });

    // set time
    setTime(time);

    // set time 12 hours
    setTime12(time12);
  };

  // set interval
  useEffect(() => {
    const interval = setInterval(() => {
      getTime();
    }, 1000);
    return () => clearInterval(interval);
  }, [tz]);

  return (
    <div className="container">
      <div className="flex-container">
        <div className="time">
          <h1>{time} - {time12}</h1>
          <h2>{tz.name}</h2>
          <p>{tz.tzCode}</p>
        </div>
        {/*  */}
        <div className="search">
          <input className="input" type="text" onChange={handleFilterTz} />
          <p>Escribe tu zona horaria</p>
          <ul>
            {tzListFilter.map((tz) => (
              <li key={tz.tzCode}>
                <button onClick={() => {
                  setTz(tz);
                  setTzListFilter([]);
                }}>{tz.label}</button>
              </li>
            ))}
          </ul>
        </div>
        {/*  */}
        <ComponentSelectZoneDefaulsButton />
      </div>
    </div>
  );
}

export default App;
