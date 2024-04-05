import React, { useEffect, useRef, useState } from "react";
import moment from "moment-timezone";
import { FaClock, FaDiscord, FaLocationDot, FaTwitter } from "react-icons/fa6";

import latam from "./latam.json";
import { FaGithub, FaLocationArrow } from "react-icons/fa";
import { Select } from "./Components/Select";
import { MdAddBox } from "react-icons/md";
import { EmojiTime } from "./Components/EmojiTime";
import { TbWorld } from "react-icons/tb";

const findEmojiForTimezone = (timezone) => {
  for (let country of latam) {
    if (country.timezones.includes(timezone)) {
      return `${country.emoji}`;
    }
  }
  return "x";
};
const findZoneForTimezone = (timezone) => {
  for (let country of latam) {
    if (country.timezones.includes(timezone)) {
      return timezone.split("/")[timezone.split("/").length - 1];
    }
  }
  return "x";
};

const App = () => {
  const [localSys, setLocalSys] = useState("America/Lima");
  const [localZone, setLocalZone] = useState("America/Lima");
  const [toZone, settoZone] = useState("America/Lima");
  const [times, settimes] = useState({});
  const [names, setnames] = useState({});
  const [hour, setHour] = useState(0);

  const inputTime = useRef();

  const getLocalTimezone = () => {
    const localTimezone = moment.tz.guess();
    setLocalSys(localTimezone);
    setLocalZone(localTimezone);
  };

  const ConvertTime = () => {
    const convertedTime = moment
      .tz(hour, "HH:mm", localZone)
      .tz(toZone)
      .format("HH:mm");

    const emojiZone = findEmojiForTimezone(toZone);
    const nameZone = findZoneForTimezone(toZone);

    let timesEmoji = { ...times };
    if (timesEmoji[convertedTime]) timesEmoji[convertedTime].push(emojiZone);
    else timesEmoji[convertedTime] = [emojiZone];
    settimes(timesEmoji);

    let timesname = { ...names };
    if (timesname[convertedTime]) timesname[convertedTime].push(nameZone);
    else timesname[convertedTime] = [nameZone];
    setnames(timesname);

    console.log(convertedTime, nameZone, timesEmoji);
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
    <main className="max-w-5xl m-auto py-4 px-4 lg:px-0 flex flex-col gap-5">
      <header className="text-white">
        <h1 className="font-extrabold text-white text-4xl">
          Todos Juntos, Siempre a Tiempo
        </h1>
        <h2 className="font-thin text-sm" >Cuando uno vive, come y respira en internet, coordinar horarios suele ser complicado, ahora no tendras escusa</h2>
        <h3 className="font-thin text-sm">
          Tu sistema esta en hora{" "}
          <span className="text-[#6B97CA]">{localSys}</span>
        </h3>
      </header>
      <section className="flex gap-5 items-center h-10">
        <button
          onClick={() => inputTime.current.showPicker()}
          className="bg-[#14161C] px-4 py-2 rounded-md text-white flex gap-3 w-fit items-center cursor-pointer"
        >
          <FaClock />
          <input
            ref={inputTime}
            value={hour}
            onChange={(res) => setHour(res.target.value)}
            className="bg-transparent outline-none cursor-pointer"
            type="time"
            name="hours"
            id="hours"
          />
        </button>
        <Select
          value={localZone}
          latam={latam}
          setLocalZone={setLocalZone}
          Icon={FaLocationDot}
        />
        <Select
          value={toZone}
          latam={latam}
          setLocalZone={settoZone}
          Icon={FaLocationArrow}
        />
        <button
          onClick={ConvertTime}
          className="bg-[#28328A] px-4 py-2 h-10 rounded-md text-white flex items-center gap-2 justify-between"
        >
          <MdAddBox />
          <span className="w-full">Agregar horario</span>
        </button>
      </section>
      <section className="bg-[#1E2128] p-3 border border-white/20 rounded-md">
        <h1 className="text-white mb-2 font-bold">Formato en emojis</h1>
        <EmojiTime objeto={times} />
        <div className="border border-white/10 my-4"></div>
        <h1 className="text-white my-4 font-bold">Formato en nombres</h1>
        <EmojiTime objeto={names} />
      </section>
      <section className="text-white/50 flex gap-2 items-center">
        <FaTwitter className="cursor-pointer hover:text-white" onClick={() => window.location.href = "https://twitter.com/kamerrezz"}/>
        <FaGithub className="cursor-pointer hover:text-white" onClick={() => window.location.href = "https://github.com/kamerrezz"}/>
        <FaDiscord className="cursor-pointer hover:text-white" onClick={() => window.location.href = "https://zeew.space/discord"}/>
        <TbWorld className="cursor-pointer hover:text-white" onClick={() => window.location.href = "https://kamerrezz.com"}/>
      </section>
    </main>
  );
};

export default App;
