export const EmojiTime = ({ objeto }) => {
    Object.entries(objeto).map(r => {
        console.log({r});
    })

  const lineas = Object.entries(objeto).map(
    ([hora, emojis]) => `${hora}: ${emojis.join(" - ")}`
  );

  return (
    <div className="text-white/50 font-thin">
      {lineas.map((linea, index) => (
        <div key={index}>{linea}</div>
      ))}
    </div>
  );
};
