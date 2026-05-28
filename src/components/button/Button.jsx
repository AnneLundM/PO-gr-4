import styles from "./button.module.css"
import { Cart } from "react-bootstrap-icons"

export default function Button({icon, text, onClick}) {

    return(
        <button onClick={onClick}>
            {icon && <Cart />}
            <p>{text}</p>
        </button>
    )

}