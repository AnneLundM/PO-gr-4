import Button from "../button/Button";
import styles from "./productList.module.css"
import { useEffect, useState } from "react";

export default function ProductList() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [carouselIndex, setCarouselIndex] = useState(0)

    async function fetchProducts() {

          try {
              setLoading(true)
              
              const res = await fetch("https://gowala-t3pes.ondigitalocean.app/products");
              
              const resJSON = await res.json()
              
              const data = resJSON.data

              setProducts(data.slice(0, 4))
              
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    function carousel() {
        setCarouselIndex((carouselIndex) => (carouselIndex + 1) % products.length)
    }

    useEffect(() => {
        if (products.length === 0) return
        
        const interval = setInterval(() => {
            carousel()
        }, 2500);

        return () => clearInterval(interval)

    }, [products])

    if (loading) return <h1>Loader...</h1>


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
            {products.map((product) => {
              return (
                <div key={product.id} className={styles.pCard}>
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
            <div className={styles.dots}>
              <div
                className={`${styles.dot} ${carouselIndex === 0 && styles.active}`}
              ></div>
              <div
                className={`${styles.dot} ${carouselIndex === 1 && styles.active}`}
              ></div>
              <div
                className={`${styles.dot} ${carouselIndex === 2 && styles.active}`}
              ></div>
              <div
                className={`${styles.dot} ${carouselIndex === 3 && styles.active}`}
              ></div>
            </div>
          </div>
        </div>
        <div className={styles.btnWrapper}>
            <Button path="products" text="Se alle produkter"/>
        </div>
      </div>
    );
}