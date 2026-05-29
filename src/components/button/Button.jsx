import { useNavigate } from "react-router"
import { Basket3 } from "react-bootstrap-icons"
import styles from "./button.module.css"

export default function Button({
    icon = false,
    text,
    onClick,
    path,
    type = "button",
    disabled = false,
    ariaLabel,
}) {
    const navigate = useNavigate()

    function handleClick() {
        if (path) {
            navigate(`/${path}`)
        } else if (onClick) {
            onClick()
        }
    }

    return (
        <button
            className={styles.button}
            onClick={handleClick}
            type={type}
            disabled={disabled}
            aria-label={ariaLabel}
        >
            {icon && <Basket3 size={16} />}
            <p>{text}</p>
        </button>
    )
}