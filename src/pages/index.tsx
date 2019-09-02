import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"



const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Welcome</h1>
    <p>This blog template is based on Gatsby.js.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>  
  </Layout>
)

export default IndexPage
