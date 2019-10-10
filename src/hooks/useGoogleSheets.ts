import { useEffect, useState } from "react"

/**
 * @param rows: JSON Array Representation of the table data.
 * @param refreshTable: Function to reload specified table data (will reuathenticate but no reload of the gapi script) 
 * @param loadStatus: Status of loading. 0: Intializing google-api, 1: Authorize and load Table, 2: Success, -1: Error. 
 */
interface gLoadData {
  rows: string[][],
  refreshTable: () => void,
  loadStatus: number,
}

/**
 * Hook for handling google spreadsheet api --> only via api authorization. No OAuth!
 * GoogleApiKey must be generated beforehand AND spreadsheet published (so that data
 * can be read out)
 * Hook Triggers everytime when given gApiKey was changed and is not undefined!
 * Then you can use returned values.
 * @param sheetId id of the google spreadsheet (usually stated in url)
 * @param tableRange range of the table to be read e.g. "A1:T" defines upper left and lower-right edge of rectangle.
 * @param gApiKey apiKey of google account.
 */
export const useGoogleSheets = (sheetId: string, tableRange: string, gApiKey: string | undefined = undefined ): gLoadData => {
  const [apiKey, setApiKey] = useState<string | undefined>(gApiKey)
  const [loadGapi, setLoadGapi] = useState<Boolean>(true)
  const [rows, setRows] = useState<Array<string[]>>(undefined)
  const [loadStatus, setLoadStatus] = useState<number>(0); // 0=do nothing, 1=pending, 2=success, -1=failed.
  useEffect(() => {
    // useEffect tries to connect when given gApiKey param is 
    // not undefined and has changed! 
    console.info(
      `%cKey changed to: ${gApiKey}. Trigger useEffect.`,
      "color:rebeccapurple"
    )
    if(!gApiKey)return console.info(`%cNo required google-api key provided for the useGoogleSheets hook. Aborting operation...`, 'color:rebeccapurple')  
    if(!sheetId)return console.info(`%cNo required sheetId provided for the useGoogleSheets hook. Aborting operation...`, 'color:rebeccapurple')
    if(!tableRange)return console.info(`%cNo required tableRange provided for the useGoogleSheets hook. Aborting operation...`, 'color:rebeccapurple')  

    // assures that these values are on start state
    setLoadStatus(0); 
    setLoadGapi(true);

    if(gApiKey){
      setApiKey(gApiKey)  // intern state synced with given param

    // script might be added via ajax etc. -> gapi script defines
    //global variable window.gapi when ready.
    let interval = setInterval(() => {
      if (window.gapi) {
        clearInterval(interval)
        return setLoadGapi(false)
      }
    }, 100)
  }
  }, [gApiKey]) //when given param changes connect!

  useEffect(() => {
    console.info(
      `%cInitiaing the google - api global object provided by the script tag object is: ${window.gapi}.`,
      "color:rebeccapurple"
    )
    if (!loadGapi) {
      //init client here then
      setLoadStatus(1)
      console.info(`Loading now with api key: ${apiKey}`)
      window.gapi.load("client:auth2", initClient)
    }
  }, [loadGapi])

  const loadTable = () => {
    console.info("Loading the table", "color:rebeccapurple")
    setLoadStatus(1)  //assure load status at 1.
    let spreadsheetId = sheetId
    let range = tableRange

    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: spreadsheetId,
        range: range,
      })
      .then(response => {
        var result = response.result
        var numRows = result.values ? result.values.length : 0
        setRows(result.values);
        setLoadStatus(2)
      })
      .catch(error => {
        console.error(`Connection to spreadsheet failed. Did you forget to provide at least read access to the spreadsheet?`)
        console.error(error);
        setLoadStatus(-1)
      })
  }

  const initClient = () => {
    console.info("%c initializing the client", "color:rebeccapurple")
    window.gapi.client
      .init({
        apiKey: apiKey,
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"]
      })
      .then(
        function() {
          //call load table if success
          loadTable()
        },
        function(error) {
          console.error("Failed to load table data from google sheets")
          //appendPre(JSON.stringify(error, null, 2));
          console.log(error)
          setLoadStatus(-1)
          console.log(`Load status set to -1`)
        }
      )
  }

  return {rows,refreshTable:loadTable, loadStatus}
}
