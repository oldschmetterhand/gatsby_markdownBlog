import { useEffect, useState } from "react"

export const useGoogleSheets = () => {
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
        setRows(result.values);
        
        /* let data = result.values.map((row,i)=>{
          if(i>0){
            return [parseInt(row[3]),parseInt(row[4])];
          } else {
            return [1,2]
          }
        }); */
        //setMarkerData(data);
        //console.log(data);
      })
  }

  const initClient = () => {
    console.info("initializing the client", "color:rebeccapurple")
    window.gapi.client
      .init({
        apiKey: "AIzaSyCY7enosFaJopqF2qru-0EeKYssIRAZrkQ",
        clientId: "383473142454-c3t14qm9v17jsm7omdmpucnfiklrbp41.apps.googleusercontent.com",
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
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
}
