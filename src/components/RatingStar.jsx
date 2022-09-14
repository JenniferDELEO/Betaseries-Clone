/* eslint-disable react/no-array-index-key */
export default function RatingStar({ rate }) {
  const yellowStar = new Array(rate).fill("");
  const greyStar = new Array(5 - rate).fill("");

  console.log(yellowStar, greyStar);

  return (
    <div className="stars">
      {yellowStar.map((_, i) => (
        <p key={i} style={{ color: "orange" }}>
          ★
        </p>
      ))}
      {greyStar.map((_, i) => (
        <p key={i} style={{ color: "slategray" }}>
          ★
        </p>
      ))}
    </div>
  );
}
