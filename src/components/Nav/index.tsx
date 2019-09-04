import React from "react"
import { Link } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import styles from "./styles.module.scss"
import Image from "../image"

const Nav: React.FC = () => {
  return (
    <nav className={["navbar", "is-fixed-top", styles.navFixed].join(" ")} role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
        <Image/>
        </a>
        

        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <AniLink fade duration={1} to="/" className="navbar-item">Home</AniLink>
          <AniLink fade duration={1} to="/blog" className="navbar-item">Blog</AniLink>
          <AniLink fade duration={1} to="/about" className="navbar-item">About</AniLink>
        </div>
        {/* <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light">Log in</a>
            </div>
          </div>
          <div className="navbar-item has-text-left">
            <Image/>
          </div>
        </div> */}
      </div>
    </nav>
  )
}

export default Nav
