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
              
              console.log(products)
              setLoading(false)
              
            } catch (error) {
                setError(error)
            }
    }

    useEffect(() => {
        fetchProducts()
    }, [])


    return (
        <h1>ProductList</h1>
    )
}