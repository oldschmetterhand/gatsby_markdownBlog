import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import Image from "../components/image"
import SEO from "../components/seo"



const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Home</h1>
    <p>This blog template is based on Gatsby.js.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>  
  </Layout>
)

export default IndexPage
