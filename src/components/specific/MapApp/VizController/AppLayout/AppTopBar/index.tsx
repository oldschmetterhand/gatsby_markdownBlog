import React from "react";
import styles from "./styles.module.scss"


const AppTopBar = () => {

    return <section className="hero is-small">
    <div className={["hero-body", styles.appTopBar].join(" ")}>
      <div className="container">
        <h1 className="is-size-5">
            Prosop |Viz
        </h1>
      </div>
    </div>
  </section>

}

export default AppTopBar;