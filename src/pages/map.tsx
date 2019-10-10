import React from "react"
import Layout from "../components/specific/Layout"
import SEO from "../components/Blog/SEO"
import MapApp from "../components/specific/MapApp"

const MapPage: React.FC = () => (
  <>
    <SEO title="Map" />
    <MapApp></MapApp>
  </>
)

export default MapPage
