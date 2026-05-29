import s from "./services.module.css";
import cards from "./cards.json";

export default function Services() {
  return (
    <section className={s.main}>
      <div className={s.header}>
        <h1 className={s.titl_1}>Den førende mælkeproducent</h1>
        <h1 className={s.titl_2}>Sund og nærende mælk siden 1975</h1>
      </div>
      <ul>
        {cards.map((card, index) => (
          <li className={s.item} key={index}>
            <img src={"./src/assets/cards/" + card.img} />
            <h2>{card.titl}</h2>
            <p>{card.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
