import { Link } from "gatsby"
import React from "react"
import styles from "./styles.module.scss"

interface Props {
  siteTitle: string
}

const Header: React.FC<Props> = ({ siteTitle = `` }) => (
  <header>
    <section className="hero is-medium is-primary is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">NAMPI</h1>
          <h2 className="subtitle">Nuns and Monks Prosopographical Interfaces</h2>
        </div>
      </div>
    </section>
  </header>
)

export default Header
