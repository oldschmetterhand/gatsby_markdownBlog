import React from "react"
import { FaArrowCircleLeft } from "react-icons/fa"
import styles from "./styles.module.scss"
const BackButton = () => {

    const goBack = (window) => {
        window.history.back();
    }

    return <FaArrowCircleLeft className={styles.backButton} onClick={()=>goBack(window)}/>
}

export default BackButton;