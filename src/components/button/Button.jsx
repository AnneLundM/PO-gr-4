// eslint-disable-next-line no-unused-vars
import { Link, Links, useNavigate } from "react-router"
// eslint-disable-next-line no-unused-vars
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