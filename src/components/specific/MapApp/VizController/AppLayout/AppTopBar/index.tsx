import React from "react";
import styles from "./styles.module.scss"


const AppTopBar = () => {

    return <div className={["columns is-gapless", styles.appTopBar].join(" ")}>
      <div className={["column is-3", styles.is3].join(" ")}>
        <h1 className="is-size-5">
            ProsopograAPhI |Viz
        </h1>
      </div>
      <div className={["column", styles.column].join(" ")}></div>
    </div>
  

}

export default AppTopBar;