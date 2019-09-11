import React, { useState } from "react"
import Image from "../image"
import styles from "./styles.module.scss"
import EntryGrid from "../Layout/EntryGrid"

interface Props {
  siteTitle: string
  showTeaser?: boolean
}

const Header: React.FC<Props> = ({ 
  siteTitle = ``,
  showTeaser = false 
}) => {

  const baseHeader = (
    <header className={styles.baseHeader}>
      <section className="hero has-text-centered">
        <div className="hero-body">
          <div className={["container", styles.heroEnd].join(" ")}>
            <h1 className="title">ZIM Blog</h1>
            <h2 className="subtitle">Based on React/Gatsby and Bulma</h2>
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
            <h2 className="subtitle has-text-white-ter">
              React/Gatsby, Bulma,{" "}
            </h2>
            <br></br>
            <div
              className={["container is-fluid"].join(" ")}
            >
            </div>
          </div>
        </div>
      </section>
      {/* <section>
        <EntryGrid></EntryGrid>
      </section> */}
    </header>
  )

  return showTeaser ? teaserHeader : baseHeader
}

export default Header
