/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Nav from "../Nav"
import Header from "../Header"
import ScrollToTop from "react-scroll-up"
import styles from "./styles.module.scss"
import "bulma/css/bulma.css"

interface Props {
  showTeaser?: boolean
}

const Layout: React.FC<Props> = ({ children, showTeaser = false }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header
        siteTitle={data.site.siteMetadata.title}
        showTeaser={showTeaser}
      />
      <Nav />
      <div className="container">
        <main className={["section", styles.main].join(" ")}>
          <ScrollToTop showUnder={160}>
            <span>Nach Oben</span>
          </ScrollToTop>
          <main>{children}</main>
        </main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

export default Layout
