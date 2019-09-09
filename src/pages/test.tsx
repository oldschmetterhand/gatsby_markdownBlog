import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import Helmet from "react-helmet"

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
        clientId:
          "",
        discoveryDocs: [
          "",
        ],
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
    </Layout>
  )
}

export default IndexPage
