import styles from "./productList.module.css"
import { useEffect, useState } from "react";

export default function ProductList() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchProducts() {

          try {
              setLoading(true)
              
              const res = await fetch("https://gowala-t3pes.ondigitalocean.app/products");
              
              const resJSON = await res.json()
              
              const data = resJSON.data

              setProducts(data)
              
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    console.log(products[0])

    return (
        <div className={styles.wrapper}>
            <h2>Vores Produkter</h2>
            <h3>Vi har udvalgt de bedste produkter</h3>
            <p>Her finder du et udvalg af friske mejeriprodukter og kvalitetskød fra Gowala Farms - direkte fra gården til dit bord.</p>
            <div className={styles.productsWrapper}>
                <div className={styles.productsGrid}>

                </div>
                <div className={styles.productsCarousel}>
                    <p></p>
                </div>
            </div>
        </div>
    )
}