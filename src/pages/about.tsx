import React from "react"
import Layout from "../components/specific/Layout"
import SEO from "../components/Blog/SEO"

const SecondPage: React.FC = () => (
  <Layout>
    <SEO title="about" />
    <h1>About</h1>
    <p>Short Description here --- about Project / Documentatione etc.</p>
  </Layout>
)

export default SecondPage
