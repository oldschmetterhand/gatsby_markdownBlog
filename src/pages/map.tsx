import React from "react"
import Layout from "../components/specific/Layout"
import SEO from "../components/Blog/SEO"

const MapPage: React.FC = () => (
  <Layout showTeaser={false}>
    <SEO title="Map" />
    <h1>Prosopography Map</h1>
    <p>This blog template is based on Gatsby.js.</p>
    <p>Now go build something great.</p> 
  </Layout>
)

export default MapPage
