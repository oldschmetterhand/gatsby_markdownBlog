import React from "react"
import AppTopBar from "./AppTopBar"
import styles from "./styles.module.scss"

interface Props {
  topBar?: any,
  leftCol?: any,
  middleCol?: any,
  rightCol?: any,
  botLeftCol?: any,
  botRightCol?: any
}

const MAppLayout: React.FC<Props> = ({
  leftCol = undefined,
  middleCol = undefined,
  rightCol = undefined,
  topBar = undefined,
  botLeftCol = undefined,
  botRightCol = undefined
}) => {
  return (
    <section className={styles.appContainer}>
      <div>
        <AppTopBar></AppTopBar>
      </div>
      <div className="columns is-gapless">
        <div className="column is-3">{leftCol}</div>
        <div className={["column",styles.middleCol].join(" ")}>{middleCol}</div>
        <div className="column is-2">{rightCol}</div>
      </div>
      {/* <div className="columns is-gapless">
        <div className="column is-5">{botLeftCol}</div>
        <div className="column is-7">{botRightCol}</div>
      </div> */}
    </section>
  )
}

export default MAppLayout
