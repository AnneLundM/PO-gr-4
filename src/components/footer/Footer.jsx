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
        <a href="/" onClick={() => window.scrollTo(0, 0)}>
          <img
            src="/src/assets/backgrounds/logo.png"
            alt="Gowala logo"
            className={styles.logo}
          />
        </a>
        <p>
          Gowala Farms er en dedikeret gård, der producerer friske
          mejeriprodukter og kvalitetskød med fokus på dyrevelfærd,
          håndværkstradition og autentisk smag.
        </p>
        <ul className={styles.contact}>
          <li>+88130-589-745-6987</li>
          <li>+1655-546-532</li>
          <li>
            Man - Fre 09:00 - 18:00
            <br />
            (undtagen helligdage)
          </li>
          <li>
            Mejerigade 14
            <br />
            Mejeby
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
