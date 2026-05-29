import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./checkout.module.css";
import pageHeader from "../assets/backgrounds/page_header_01.jpg";
import { useCart } from "../hooks/useCart";

export default function Checkout() {
    const { cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart, cartTotal } = useCart();
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (!email) return;
        clearCart();
        setSubmitted(true);
    }

    if (submitted) return (
        <div className={styles.wrapper}>
            <div className={styles.pageHeader}>
                <h2>Gowala shopping</h2>
                <p>Færdiggør din bestilling</p>
            </div>
            <div className={styles.confirmation}>
                <h2>Tak for din bestilling!</h2>
                <p>Vi sender en bekræftelse til <strong>{email}</strong>.</p>
            </div>
        </div>
    );

    if (cartItems.length === 0) return (
        <div className={styles.wrapper}>
            <div className={styles.pageHeader}>
                <h2>Gowala shopping</h2>
                <p>Færdiggør din bestilling</p>
            </div>
            <img className={styles.heroImg} src={pageHeader} alt="Gowala Farms landskab" />
            <div className={styles.emptyCart}>
                <p className={styles.emptyIcon}>🛒</p>
                <h3>Din kurv er tom</h3>
                <p>Du har ikke tilføjet nogen produkter endnu.</p>
                <button
                    type="button"
                    className={styles.submitBtn}
                    onClick={() => navigate("/products")}
                >
                    Gå til shop
                </button>
            </div>
        </div>
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.pageHeader}>
                <h2>Gowala shopping</h2>
                <p>Færdiggør din bestilling</p>
            </div>

            <img className={styles.heroImg} src={pageHeader} alt="Gowala Farms landskab" />

            <div className={styles.formSection}>
                <h3>Bestil</h3>
                <p className={styles.subtitle}>Udfyld venligst formularen herunder</p>

                <form className={styles.orderForm} onSubmit={handleSubmit}>
                    {cartItems.map(item => (
                        <div key={item._id} className={styles.orderItem}>
                            <img src={item.image} alt={item.title} className={styles.itemImg} />
                            <div className={styles.itemInfo}>
                                <p className={styles.itemTitle}>{item.title}</p>
                                <p className={styles.itemPrice}>{item.price},-</p>
                                <div className={styles.qtyControls}>
                                    <button
                                        type="button"
                                        onClick={() => decreaseQuantity(item._id)}
                                        aria-label="Færre"
                                    >−</button>
                                    <span>{item.quantity}</span>
                                    <button
                                        type="button"
                                        onClick={() => addToCart(item)}
                                        aria-label="Flere"
                                    >+</button>
                                </div>
                            </div>
                            <button
                                type="button"
                                className={styles.removeBtn}
                                onClick={() => removeFromCart(item._id)}
                                aria-label="Fjern"
                            >×</button>
                        </div>
                    ))}

                    <div className={styles.totals}>
                        <div className={styles.totalRow}>
                            <span>Total</span>
                            <span>{cartTotal},-</span>
                        </div>
                        <div className={styles.totalRow}>
                            <span>I alt</span>
                            <strong>{cartTotal}.00,-</strong>
                        </div>
                    </div>

                    <input
                        className={styles.emailInput}
                        type="email"
                        placeholder="Din email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />

                    <button type="submit" className={styles.submitBtn}>Afgiv ordre</button>
                </form>
            </div>
        </div>
    );
}
