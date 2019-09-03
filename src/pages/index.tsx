import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/seo"

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Home</h1>
    <p>This blog template is based on Gatsby.js.</p>
    <p>Now go build something great.</p> 
  </Layout>
)

export default IndexPage
