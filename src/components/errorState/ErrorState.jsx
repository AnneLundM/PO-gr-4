import { useEffect, useState } from "react";
import styles from "./errorState.module.css";

export default function ErrorState({
    title = "Noget gik galt",
    message = "Vi kunne ikke hente data. Tjek din forbindelse og prøv igen.",
    actionText = "Prøv igen",
    onRetry,
    variant = "error",
    cooldown = 0,
    maxRetries = null,
}) {
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [retryAttempts, setRetryAttempts] = useState(0);

    useEffect(() => {
        if (secondsLeft <= 0) return;
        const t = setTimeout(() => setSecondsLeft(s => s - 1), 1000);
        return () => clearTimeout(t);
    }, [secondsLeft]);

    function handleClick() {
        if (maxRetries !== null && retryAttempts >= maxRetries) return;
        onRetry();
        setRetryAttempts(a => a + 1);
        setSecondsLeft(cooldown);
    }

    const retriesExhausted = maxRetries !== null && retryAttempts >= maxRetries;

    return (
        <div
            className={`${styles.errorState} ${styles[variant] ?? ""}`}
            role="alert"
            aria-live="polite"
        >
            <div className={styles.errorIcon}>!</div>
            <div className={styles.content}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.message}>{message}</p>

                {onRetry && !retriesExhausted && (
                    <button
                        className={styles.retryButton}
                        onClick={handleClick}
                        disabled={secondsLeft > 0}
                    >
                        {secondsLeft > 0
                            ? `Prøv igen om ${secondsLeft} sek...`
                            : actionText}
                    </button>
                )}

                {retriesExhausted && (
                    <p className={styles.message}>
                        Vi kan stadig ikke hente data. Kontakt os hvis problemet fortsætter.
                    </p>
                )}
            </div>
        </div>
    );
}
