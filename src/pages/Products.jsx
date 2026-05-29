// TODO (#15 / #12): when this page fetches from the API, use ErrorState like this:
// import ErrorState from "../components/errorState/ErrorState";
// if (error) return <ErrorState title="..." message="..." actionText="Prøv igen" onRetry={fetchProducts} />;

import { useEffect, useState } from "react";
import ErrorState from "../components/errorState/ErrorState";
import Button from "../components/button/Button";
import { fetchJson } from "../utils/api";
import styles from "./products.module.css";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    function handleRetry() { setRetryCount(c => c + 1); }

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                setError(null);
                const resJSON = await fetchJson("/products");
                const data = resJSON.data ?? resJSON;
                if (!Array.isArray(data)) throw new Error("Uventet svar fra serveren.");
                setProducts(data);
            } catch (err) {
                console.error("Fetch failed:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [retryCount]);

    if (loading) return <h1>Loader...</h1>;

    if (error) return (
        <ErrorState
            variant="error"
            title="Kunne ikke hente produkter"
            message={error.message}
            actionText="Prøv igen"
            onRetry={handleRetry}
            cooldown={10}
            maxRetries={5}
        />
    );

    if (products.length === 0) return (
        <ErrorState
            variant="empty"
            title="Ingen produkter fundet"
            message="Der er ingen produkter at vise lige nu. Prøv igen om lidt."
            actionText="Prøv igen"
            onRetry={handleRetry}
        />
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.headerWrapper}>
                <h2>Alle vores produkter</h2>
                <h3>Alt på ét sted</h3>
                <p>
                    Her på siden finder du alle vores friske mejeriprodukter og kvalitetskød fra
                    Gowala Farms - direkte fra gården til dit bord.
                </p>
            </div>
            <div className={styles.productsGrid}>
                {products.map((product, index) => (
                    <div key={product._id ?? index} className={styles.pCard}>
                        {product.discount > 5 && (
                            <p className={styles.pDiscount}>{product.discount}%</p>
                        )}
                        <img
                            className={styles.pImg}
                            src={product.image}
                            alt={product.title}
                        />
                        <h3 className={styles.pTitle}>{product.title}</h3>
                        <p className={styles.pPrice}>{product.price},-</p>
                        <Button icon={true} text="Tilføj til kurv" />
                    </div>
                ))}
            </div>
        </div>
    );
}