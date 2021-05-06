export function Thumbnail({ id }) {
  const thumnailURL = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  return (
    <figure
      className="fixedratio"
      style={{
        backgroundImage: `url('${thumnailURL}')`
      }}
    ></figure>
  );
}
