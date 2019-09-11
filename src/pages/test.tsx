import React, { useState, useEffect } from "react"
import { useGoogleSheets } from "../hooks/useGoogleSheets"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import Helmet from "react-helmet"
import Leaflet from "../components/Leaflet"

const IndexPage: React.FC = () => {
  //const [loadGapi, setLoadGapi] = useState<Boolean>(true)
  //const [rows, setRows] = useState<Array<string[]>>(undefined)
  const [markerData, setMarkerData] = useState<Array<number[]>>(undefined)

  const {rows, refreshTable} = useGoogleSheets()

  useEffect(() => {
    if (rows) {
      let data = rows.map((row, i) => {
        if (i > 0) {
          return [parseInt(row[3]), parseInt(row[4])]
        } else {
          return [1, 2]
        }
      })
      setMarkerData(data)
    }
  }, [rows])

  return (
    <Layout>
      <Helmet>
        <script src="https://apis.google.com/js/api.js"></script>

        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossorigin=""
        />
        <script
          src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js"
          integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og=="
          crossorigin=""
        ></script>
      </Helmet>
      <h1>Test Page</h1>
      <p>For reading out google spreadsheet</p>
      <br></br>
      <button className={"button"} onClick={refreshTable}>
        Refresh Table
      </button>
      <hr></hr>
      <br></br>
      <h1>Table</h1>
      <br></br>
      {rows ? (
        rows.map((row, ind) => <p key={`row_${ind}`}> {row.toString()}</p>)
      ) : (
        <h1>Loading...</h1>
      )}
      <br></br>
      <Leaflet coordArray={markerData}></Leaflet>
    </Layout>
  )
}

export default IndexPage
