import { useState } from "react";
import styles from "./newsletter.module.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STORAGE_KEY = "gowala-newsletter-emails";

function loadEmails() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Skriv venligst en gyldig emailadresse.");
      return;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setError("Skriv venligst en gyldig emailadresse.");
      return;
    }

    const emails = loadEmails();
    if (emails.includes(email.trim().toLowerCase())) {
      setError("Denne email er allerede tilmeldt nyhedsbrevet.");
      return;
    }

    emails.push(email.trim().toLowerCase());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(emails));
    setMessage("Tak for din tilmelding! Du er nu skrevet op til nyhedsbrevet.");
    setEmail("");
  }

  return (
    <section className={styles.newsletterSection}>
      <h2 className={styles.title}>Nyhedsbrev</h2>
      <h3 className={styles.subtitle}>Få nyhederne fra gården på din mail.</h3>
      <p className={styles.desc}>
        Tilmeld dig vores nyhedsbrev - så kan du altid følge med i, hvad der
        sker på farmen.
      </p>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <label htmlFor="newsletter-email" className={styles.label}>
          Din email
        </label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="Din email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && (
          <p role="alert" className={styles.errorMessage}>
            {error}
          </p>
        )}
        {message && (
          <p role="status" className={styles.successMessage}>
            {message}
          </p>
        )}
        <button type="submit" className={styles.button}>
          Tilmeld
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
