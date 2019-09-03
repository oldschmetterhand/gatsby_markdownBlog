
import React from "react";
import { Link } from "gatsby"
import styles from "./styles.module.scss";

const Nav: React.FC = () => {

    return (<nav className={styles.nav}>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/about">About</Link></li>
        </ul>
    </nav>)
}

export default Nav;