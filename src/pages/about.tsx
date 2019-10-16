import React from "react"
import Layout from "../components/specific/Layout"
import SEO from "../components/Blog/SEO"
import OlMap from "../components/specific/MapApp/VizController/OlMap"

const SecondPage: React.FC = () => (
  <Layout showHeader={false}>
    <SEO title="about" />
    <OlMap></OlMap>
  </Layout>
)

export default SecondPage
