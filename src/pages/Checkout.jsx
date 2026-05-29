import { useState } from "react";
import styles from "./checkout.module.css";
import pageHeader from "../assets/backgrounds/page_header_01.jpg";

// Mock cart item — replace with real cart state when basket feature is built
const MOCK_ITEM = { title: "Gowala Parmasan", price: 89, image: "https://gowala-t3pes.ondigitalocean.app//products/parmasan.jpg" };

export default function Checkout() {
    const [quantity, setQuantity] = useState(1);
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const total = MOCK_ITEM.price * quantity;

    function handleSubmit(e) {
        e.preventDefault();
        if (!email) return;
        setSubmitted(true);
    }

    if (submitted) return (
        <div className={styles.wrapper}>
            <div className={styles.confirmation}>
                <h2>Tak for din bestilling!</h2>
                <p>Vi sender en bekræftelse til <strong>{email}</strong>.</p>
            </div>
        </div>
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.pageHeader}>
                <h2>Gowala shopping</h2>
                <p>Færdiggor din bestilling</p>
            </div>

            <img className={styles.heroImg} src={pageHeader} alt="Gowala Farms landskab" />

            <div className={styles.formSection}>
                <h3>Bestil</h3>
                <p className={styles.subtitle}>Udfyld venligst formularen herunder</p>

                <form className={styles.orderForm} onSubmit={handleSubmit}>
                    <div className={styles.orderItem}>
                        <img src={MOCK_ITEM.image} alt={MOCK_ITEM.title} className={styles.itemImg} />
                        <div className={styles.itemInfo}>
                            <p className={styles.itemTitle}>{MOCK_ITEM.title}</p>
                            <p className={styles.itemPrice}>{MOCK_ITEM.price},-</p>
                            <div className={styles.qtyControls}>
                                <button
                                    type="button"
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    aria-label="Færre"
                                >−</button>
                                <span>{quantity}</span>
                                <button
                                    type="button"
                                    onClick={() => setQuantity(q => q + 1)}
                                    aria-label="Flere"
                                >+</button>
                            </div>
                        </div>
                        <button
                            type="button"
                            className={styles.removeBtn}
                            onClick={() => setQuantity(1)}
                            aria-label="Fjern"
                        >×</button>
                    </div>

                    <div className={styles.totals}>
                        <div className={styles.totalRow}>
                            <span>Total</span>
                            <span>{total},-</span>
                        </div>
                        <div className={styles.totalRow}>
                            <span>I alt</span>
                            <strong>{total}.00,-</strong>
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
