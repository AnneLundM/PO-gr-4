import s from "./services.module.css";
import cards from "./cards.json";

export default function Services() {
  return (
    <section>
      <h1>Den førende mælkeproducent</h1>
      <h1>Sund og nærende mælk siden 1975</h1>
      <ul>
        {cards.map((card, index) => (
          <li key={index}>
            <img src={"./src/assets/cards/" + card.img} />
            <h2>{card.titl}</h2>
            <p>{card.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
