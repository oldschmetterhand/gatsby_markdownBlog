import React from "react"
import { Link } from "gatsby"
import styles from "./styles.module.scss"
import Image from "../image"

const Nav: React.FC = () => {
  return (
    <nav className={["navbar", "is-fixed-top", styles.navFixed].join(" ")} role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
        {/* <Image/> */}
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
        <div className={["navbar-end", styles.navBorder].join(" ")}>
          <Link activeStyle={{textDecoration:"underline"}} to="/" className="navbar-item">Home</Link>
          <Link activeStyle={{textDecoration:"underline"}} to="/blog" className="navbar-item">Blog</Link>
          <Link activeStyle={{textDecoration:"underline"}} to="/about" className="navbar-item">About</Link>
        </div>
        <div className="navbar-end">
          <div className={["navbar-item has-text-left"].join(" ")} style={{marginRight:"1.5em"}}>
            <Image/>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
