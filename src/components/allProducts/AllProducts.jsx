import styles from "./allProducts.module.css"
import { Filter } from "react-bootstrap-icons";
import Button from "../button/Button";
import { useState, useEffect } from "react";

export default function AllProducts() {

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

    return (
      <div className={styles.wrapper}>
        <div className={styles.headerWrapper}>
          <h2>Alle vores produkter</h2>
          <h3>Alt på et sted</h3>
          <p>
            Her på siden finder du alle vores friske mejeriprodukter og
            kvalitetskød fra Gowala Farms – direkte fra gården til dit bord.
          </p>
        </div>
        <div className={styles.productsWrapper}>
          <div className={styles.pHeader}>
            <Filter size={30} color="#5E9A13" />
          </div>
          <div className={styles.pGrid}>
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
        </div>
      </div>
    );

}