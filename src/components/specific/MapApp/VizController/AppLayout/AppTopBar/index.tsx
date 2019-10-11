import React from "react";
import styles from "./styles.module.scss"


const AppTopBar = () => {

    return <section className="hero is-small">
    <div className={["hero-body", styles.appTopBar].join(" ")}>
      <div className="container">
        <h1 className="title">
          Prosop |Viz
        </h1>
        <h2 className="subtitle">
            Based on the Factoid Model
        </h2>
      </div>
    </div>
  </section>

}

export default AppTopBar;