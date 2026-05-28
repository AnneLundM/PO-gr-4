import styles from "./newsletter.module.css";

const Newsletter = () => (
  <section className={styles.newsletterSection}>
    <h2 className={styles.title}>Nyhedsbrev</h2>
    <h3 className={styles.subtitle}>Få nyhederne fra gården på din mail.</h3>
    <p className={styles.desc}>
      Tilmeld dig vores nyhedsbrev - så kan du altid følge med i, hvad der sker
      på farmen.
    </p>
    <form className={styles.form}>
      <input type="email" placeholder="Din email" className={styles.input} />
      <button type="submit" className={styles.button}>
        Tilmeld
      </button>
    </form>
  </section>
);

export default Newsletter;
