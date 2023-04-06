import React, { useEffect } from "react";
import moment from "moment-timezone";
import latam from "./latam.json";
import image from './assets/msedge_B9gAMHN05M.gif'

import "./style.css";

const App = () => {
  const [hour, setHour] = React.useState(0);
  const [localZone, setLocalZone] = React.useState("America/Lima");
  const [text, setText] = React.useState();

  function convertTimeToTimezones(time, inputTimezone, countries) {
    const timeFormat = "HH:mm";

    let result = {};
    countries.forEach((country) => {
      const { name, emoji, timezones } = country;
      timezones.forEach((timezone) => {
        const convertedTime = moment
          .tz(time, timeFormat, inputTimezone)
          .tz(timezone)
          .format(timeFormat);
        if (result[convertedTime]) {
          result[convertedTime] += ` ${emoji}`;
        } else {
          result[convertedTime] = `${emoji}`;
        }
      });
    });
    result = Object.entries(result).map(([key, value]) => {
      const emojis = value.split(" ");
      const uniqueEmojis = [...new Set(emojis)];
      return { key, value: uniqueEmojis.join(" ") };
    });
    return result;
  }
  const getLocalTimezone = () => {
    const localTimezone = moment.tz.guess();
    setLocalZone(localTimezone);
  };
  useEffect(() => {
    getLocalTimezone();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const hours = e.target.hours.value;
    setHour(hours);
    const times = convertTimeToTimezones(hours, localZone, latam);
    setText(times);
  };
  return (
    <div className="container p-3">
      <h1>Convert Time</h1>
      <p>Local Timezone: {localZone}</p>
      <small>Precio el reloj</small>
      <form onSubmit={handleSubmit}>
        <input type="time" name="hours" id="hours" />
        <button type="submit">Submit</button>
      </form>

      <div className="resultado">
        {text && <h2>Result</h2>}
        {text &&
          text.map((item, index) => {
            return (
              <p key={index}>
                {item.key} - {item.value}
              </p>
            );
          })}
      </div>

      <img src={image} alt="" />
    </div>
  );
};

export default App;
