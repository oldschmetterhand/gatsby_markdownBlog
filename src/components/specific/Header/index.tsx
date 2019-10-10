import React, { useState } from "react"
import styles from "./styles.module.scss"

interface Props {
  siteTitle: string,
  subTitle: string,
  showTeaser?: boolean
}

const Header: React.FC<Props> = ({ 
  siteTitle = ``,
  subTitle = ``,
  showTeaser = false 
}) => {

  const TITLE = siteTitle;
  const SUB_TITLE = subTitle; 

  const baseHeader = (
    <header className={styles.baseHeader}>
      <section className="hero has-text-centered">
        <div className="hero-body">
          <div className={["container", styles.heroEnd].join(" ")}>
            <h1 className="title">{TITLE}</h1>
            <h2 className="subtitle">{SUB_TITLE}</h2>
          </div>
        </div>
      </section>
    </header>
  )

  const teaserHeader = (
    <header>
      <section
        className={["hero is-medium is-bold", styles.header].join(
          " "
        )}
      >
        <div className="hero-body">
          <div className="container">
            <h1 className="title has-text-black">{siteTitle}</h1>
            <h2 className="subtitle">
              {SUB_TITLE}
            </h2>
            <br></br>
            <div
              className={["container is-fluid"].join(" ")}
            >
            </div>
          </div>
        </div>
      </section>
    </header>
  )

  return showTeaser ? teaserHeader : baseHeader
}

export default Header
