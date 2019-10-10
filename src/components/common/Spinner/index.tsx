import React from "react"
import { FaSpinner } from "react-icons/fa"
import styles from "./styles.module.scss"

interface Props {
  loadMsg?: string
}

const Spinner: React.FC<Props> = ({ loadMsg = "Loading..." }) => {
  return (
    <div>
      <FaSpinner className={styles.spinner}></FaSpinner>
      <span>{loadMsg}</span>
    </div>
  )
}

export default Spinner
