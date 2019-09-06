import React, { useState } from "react"
import { Link } from "gatsby"
import styles from "./styles.module.scss"
import Image from "../image"

const Nav: React.FC = () => {

  const [isActive, setIsActive] = useState<Boolean>(false);

  const toggleNav = () => {
    setIsActive(!isActive);
  }

  return (
    <nav className={["navbar", "is-fixed-top", styles.navFixed].join(" ")} role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
        {/* <Image/> */}
        </a>
        

        <a
          role="button"
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={toggleNav}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
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
