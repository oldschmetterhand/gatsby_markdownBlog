import React from "react"
import Image from "../image"
import styles from "./styles.module.scss"

interface Props {
  siteTitle: string
}

const Header: React.FC<Props> = ({ siteTitle = `` }) => (
  <header>
    <section className="hero is-medium is-primary is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">{siteTitle}</h1>
          <h2 className="subtitle">React/Gatsby, Bulma, </h2>
          <br></br>
          <div className={["container is-fluid", styles.imageHolder].join(" ")}>
            <Image></Image>
          </div>
        </div>
        
      </div>
    </section>
  </header>
)

export default Header
