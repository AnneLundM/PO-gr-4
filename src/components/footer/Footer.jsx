import styles from "./Footer.module.css";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.certRow}>
      <img src="/src/assets/sponsors/01.png" alt="Certifikat 1" />
      <img src="/src/assets/sponsors/02.png" alt="Certifikat 2" />
      <img src="/src/assets/sponsors/03.png" alt="Certifikat 3" />
      <img src="/src/assets/sponsors/04.png" alt="Certifikat 4" />
      <img src="/src/assets/sponsors/05.png" alt="Certifikat 5" />
    </div>
    <div className={styles.top}>
      <div className={styles.about}>
        <img
          src="/src/assets/backgrounds/logo.png"
          alt="Grovila logo"
          className={styles.logo}
        />
        <p>
          Grovila Farms er en dedikeret gård, der producerer friske
          mejeriprodukter og kvalitetskød med fokus på dyrevelfærd,
          håndværkstradition og autentisk smag.
        </p>
        <ul className={styles.contact}>
          <li>+45(0) 289-745-6987</li>
          <li>+456-546-532</li>
          <li>
            Man - Fre 09:00 - 18:00
            <br />
            (undtagen helligdage)
          </li>
          <li>
            Mejerivej 14
            <br />
            Mølleby
          </li>
        </ul>
      </div>
      {/* Sponsor-logoer fjernet fra bunden */}
    </div>
    <div className={styles.bottom}>
      <div className={styles.cows} />
      <p className={styles.copyright}>
        © 2024 <span className={styles.brand}>Grovila</span>. All rights
        Reserved By
        <br />
        Løbehjulsteam & Viborg Media College
      </p>
    </div>
  </footer>
);

export default Footer;
