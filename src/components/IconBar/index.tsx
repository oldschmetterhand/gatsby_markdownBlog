import React from "react"
import styles from "./styles.module.scss"
import { FaFacebook, FaTwitterSquare } from "react-icons/fa"

const IconBar: React.FC = () => {
  return (
    <div className={styles.iconBar}>
      <div>
        <span className={styles.iconHolder}>
          <FaFacebook size="1.25em"/>
        </span>
        <span className={styles.iconHolder}>
          <FaTwitterSquare size="1.25em"/>
        </span>
      </div>
    </div>
  )
}

export default IconBar
