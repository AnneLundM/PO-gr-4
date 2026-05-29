import Button from "../button/Button";
import ErrorState from "../errorState/ErrorState"; // #15 — ny import
import styles from "./productList.module.css"
import { useEffect, useState } from "react";
import { fetchJson } from "../../utils/api"; // #15 — ny import (delt fetch-helper)

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [retryCount, setRetryCount] = useState(0); // #15 — ny state til retry-logik

    function handleRetry() { setRetryCount(c => c + 1); } // #15 — ny funktion

    // #15 — fetchProducts er flyttet ind i useEffect (fix af lint-fejl)
    // #15 — tilføjet setError(null), fetchJson i stedet for fetch(), array-guard og console.error
    // #15 — [retryCount] som dependency så retry virker
    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                setError(null); // #15

                const resJSON = await fetchJson("/products"); // #15 — var: fetch() direkte
                const data = resJSON.data ?? resJSON;

                if (!Array.isArray(data)) { // #15 — ny guard
                    throw new Error("Uventet svar fra serveren.");
                }

                setProducts(data.slice(0, 4));
            } catch (err) {
                console.error("Fetch failed:", err); // #15
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [retryCount]) // #15 — var: []

    // #15 — carousel-logik er flyttet ind i setCarouselIndex (fjernede separat carousel()-funktion pga. lint)
    useEffect(() => {
        if (products.length === 0) return;

        const interval = setInterval(() => {
            setCarouselIndex(i => (i + 1) % products.length); // #15 — var: carousel() kald
        }, 2500);

        return () => clearInterval(interval);
    }, [products])

    if (loading) return <h1>Loader...</h1>

    // #15 — ny fejlvisning med retry og cooldown
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
    )

    // #15 — ny tom-liste visning
    if (products.length === 0) return (
        <ErrorState
            variant="empty"
            title="Ingen produkter fundet"
            message="Der er ingen produkter at vise lige nu. Prøv igen om lidt."
            actionText="Prøv igen"
            onRetry={handleRetry}
        />
    )


    return (
      <div className={styles.wrapper}>
        <div className={styles.headerWrapper}>
          <h2>Vores Produkter</h2>
          <h3>Vi har udvalgt de bedste produkter</h3>
          <p>
            Her finder du et udvalg af friske mejeriprodukter og kvalitetskød
            fra Gowala Farms - direkte fra gården til dit bord.
          </p>
        </div>
        <div className={styles.productsWrapper}>
          <div className={styles.productsGrid}>
            {/* #15 — key ændret fra product.id til product._id (API bruger _id) */}
            {products.slice(0, 4).map((product, index) => {
              return (
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
              );
            })}
          </div>
          <div className={styles.productsCarousel}>
            <div className={styles.carouselInfo}>
              {products[carouselIndex]?.discount > 5 && (
                <p className={styles.pDiscount}>
                  {products[carouselIndex]?.discount}%
                </p>
              )}
              <img
                className={styles.pImg}
                src={products[carouselIndex]?.image}
                alt={products[carouselIndex]?.title}
              />
              <h3 className={styles.pTitle}>
                {products[carouselIndex]?.title}
              </h3>
              <p className={styles.pPrice}>
                {products[carouselIndex]?.price},-
              </p>
            </div>
            {/* #15 — dots er nu dynamiske (.map) i stedet for 4 hardkodede divs */}
            <div className={styles.dots}>
              {products.map((_, index) => (
                <div
                  key={index}
                  className={`${styles.dot} ${carouselIndex === index ? styles.active : ""}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.btnWrapper}>
            <Button path="products" text="Se alle produkter"/>
        </div>
      </div>
    );
}