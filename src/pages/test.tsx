import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import Helmet from "react-helmet"
import Leaflet from "../components/Leaflet"

const IndexPage: React.FC = () => {
  const [loadGapi, setLoadGapi] = useState<Boolean>(true)
  const [rows, setRows] = useState<Array<string[]>>(undefined)

  useEffect(() => {
    console.info(
      `%c Waiting for window.gapi to be defined --loading...`,
      "color:rebeccapurple"
    )
    // script is added via React Helmet need to wait until global variable is defined!
    let interval = setInterval(() => {
      if (window.gapi) {
        clearInterval(interval)
        return setLoadGapi(false)
      }
    }, 100)
  }, [])

  useEffect(() => {
    console.info(
      `%c Loading changed to "${loadGapi}" object is: ${window.gapi}`,
      "color:rebeccapurple"
    )
    if (!loadGapi) {
      //init client here then
      window.gapi.load("client:auth2", initClient)
    }
  }, [loadGapi])

  const loadTable = () => {
    console.info("Loading the table", "color:rebeccapurple")
    let spreadsheetId = "1HQL19Es4w30qruyOcAghqwot7jWthA7KrO79rkJSDdk"
    let range = "A1:E"

    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: spreadsheetId,
        range: range,
      })
      .then(response => {
        var result = response.result
        var numRows = result.values ? result.values.length : 0
        setRows(result.values)
      })
  }

  const initClient = () => {
    console.info("initializing the client", "color:rebeccapurple")
    window.gapi.client
      .init({
        apiKey: "",
        clientId: "",
        discoveryDocs: [""],
        scope: "",
      })
      .then(
        function() {
          //call load table if success
          loadTable()
        },
        function(error) {
          console.error("Can't connect to google docs...")
          //appendPre(JSON.stringify(error, null, 2));
        }
      )
  }

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
      <button className={"button"} onClick={loadTable}>
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
      <Leaflet></Leaflet>
    </Layout>
  )
}

export default IndexPage
