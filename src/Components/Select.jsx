import React from "react";

export const Select = ({
  setLocalZone,
  latam,
  Icon,
  value = "America/Lima",
}) => {
  return (
    <div className="relative bg-[#14161C] rounded-md text-white flex gap-3 w-fit items-center cursor-pointer overflow-hidden">
      <Icon className="absolute left-2" />
      <select
        value={value}
        name="localzone"
        id="localzone"
        className="appearance-none bg-[#14161C] border-none outline-none cursor-pointer w-full pr-4 pl-8 py-2 text-white"
        onChange={(r) => setLocalZone(r.target.value)}
      >
        {latam.map((localnames, indexlocal) => {
          return (
            <optgroup
              key={indexlocal}
              label={`${localnames.name} ${localnames.emoji}`}
              className="bg-transparent text-white"
            >
              {localnames.timezones.map((timezones, indexzones) => {
                return (
                  <option
                    className="bg-transparent font-thin text-white/50"
                    key={indexzones}
                  >
                    {timezones}
                  </option>
                );
              })}
            </optgroup>
          );
        })}
      </select>
    </div>
  );
};
