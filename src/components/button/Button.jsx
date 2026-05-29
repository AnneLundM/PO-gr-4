import { Link, Links, useNavigate } from "react-router"
import styles from "./button.module.css"
import { Cart } from "react-bootstrap-icons"

export default function Button({icon, text, onClick, path}) {

    let navigate = useNavigate()

    return(
            <button onClick={path ? () => navigate(`/${path}`) : onClick}>
                {icon && <Cart />}
                <p>{text}</p>
            </button>
    )

}